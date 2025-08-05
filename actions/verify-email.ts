"use server";

import { prisma } from "@/shared/lib";

import { getUserByEmail, getVerificationTokenByToken } from "@/data";

export const verifyEmailAction = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Ссылка для подтверждения недействительна" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Срок действия ссылки истёк. Запросите новую" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Пользователь с указанным email не найден" };
  }

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Ваша почта успешно подтверждена" };
  } catch {
    return { error: "Ошибка при верификации" };
  }
};

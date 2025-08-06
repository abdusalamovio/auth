"use server";

import { ResetPasswordSchema } from "./reset-password.schema";

import {
  sendResetPasswordEmail,
  generatePasswordResetToken,
  prisma,
} from "@/shared/lib";

import { ResetPasswordSchemaType } from "./reset-password.types";

export const resetPasswordAction = async (values: ResetPasswordSchemaType) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Некорректный email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    return { error: "Пользователь с таким email не найден" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Письмо для сброса пароля отправлено!" };
};

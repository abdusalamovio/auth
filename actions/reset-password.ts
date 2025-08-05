"use server";

import { ResetPasswordSchema } from "@/shared/model";

import { getUserByEmail } from "@/data";
import { generatePasswordResetToken, sendResetPasswordEmail } from "@/lib";

import z from "zod";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Некорректный email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

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

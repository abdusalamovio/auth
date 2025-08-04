"use server";

import z from "zod";
import { LoginSchema } from "@/shared/model";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken, sendVerificationEmail } from "@/lib";
import { getUserByEmail } from "@/data";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ошибка при заполнении формы" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Пользователь с такой почтой не найден!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Письмо с подтверждением отправлено!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Неверные учетные данные" };
        default:
          return { error: "Что-то пошло не так!" };
      }
    }

    throw error;
  }

  return { success: "Вход выполнен успешно!" };
};

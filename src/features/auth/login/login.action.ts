"use server";

import { LoginSchemaType } from "./login.types";
import { LoginSchema } from "./login.schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import {
  generateVerificationToken,
  sendVerifiEmail,
  prisma,
} from "@/shared/lib";

export const loginAction = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Ошибка при заполнении формы" };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Пользователь с такой почтой не найден!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerifiEmail(verificationToken.email, verificationToken.token);

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

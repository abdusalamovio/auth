"use server";

import { RegisterSchema } from "./register.schema";
import { RegisterSchemaType } from "./register.types";
import bcryptjs from "bcryptjs";

import {
  generateVerificationToken,
  prisma,
  sendVerifiEmail,
} from "@/shared/lib";

export const registerAction = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ошибка при заполнении формы" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Эта почта уже используется" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerifiEmail(verificationToken.email, verificationToken.token);

  return { success: "Письмо с подтверждением отправлено!" };
};

"use server";

import { type RegisterSchemaType, RegisterSchema } from "./schema";
import bcryptjs from "bcryptjs";

import {
  generateVerificationToken,
  prisma,
  sendVerificationEmail,
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

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Письмо с подтверждением отправлено!" };
};

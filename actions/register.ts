"use server";

import z from "zod";
import { RegisterSchema } from "@/schemas";
import bcryptjs from "bcryptjs";
import { prisma } from "@/shared/lib";
import { generateVerificationToken, sendVerificationEmail } from "@/lib";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
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

  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token,
  );

  return { success: "Письмо с подтверждением отправлено!" };
};

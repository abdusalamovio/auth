"use server";

import { getPasswordResetTokenByToken, getUserByEmail } from "@/data";
import { NewPasswordSchema } from "@/shared/model";

import z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return { error: "Токен не предоставлен" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpires = new Date(existingToken.expires) < new Date();

  if (hasExpires) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};

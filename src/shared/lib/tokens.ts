import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/shared/lib";

export async function generateVerificationToken(email: string) {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  return await prisma.verificationToken.create({
    data: { email, token, expires },
  });
}

export async function generateResetPasswordToken(email: string) {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await prisma.resetPasswordToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  return await prisma.resetPasswordToken.create({
    data: { email, token, expires },
  });
}

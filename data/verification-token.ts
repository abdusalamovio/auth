import { prisma } from "@/shared/lib";

export const getVerificationTokenByIdentifier = async (identifier: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { identifier },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

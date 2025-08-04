import { prisma } from "@/shared/lib";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error("Ошибка при поиске токена по email:", error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const result = await prisma.verificationToken.findUnique({
      where: { token },
    });
    
    if (!result) {
      console.log("Токен не найден:", token);
    }
    
    return result;
  } catch (error) {
    console.error("Ошибка при поиске токена:", error);
    return null;
  }
};

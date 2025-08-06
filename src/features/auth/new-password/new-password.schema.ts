import z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(1, "Введите пароль").min(6, "Минимум 6 символов"),
});

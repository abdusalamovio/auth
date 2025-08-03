import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Введите вашу почту")
    .email("Введите корректную почту"),
  password: z.string().min(1, "Введите пароль").min(6, "Минимум 6 символов"),
});

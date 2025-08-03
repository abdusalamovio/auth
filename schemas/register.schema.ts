import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Введите ваше имя").min(2, "Минимум 2 символа"),
  email: z
    .string()
    .min(1, "Введите вашу почту")
    .email("Введите корректную почту"),
  password: z.string().min(1, "Введите пароль").min(6, "Минимум 6 символов"),
});

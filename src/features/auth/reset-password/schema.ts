import z from "zod";

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Введите вашу почту")
    .email("Введите корректную почту"),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

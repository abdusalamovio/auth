import z from "zod";
import { ResetPasswordSchema } from "./reset-password.schema";

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

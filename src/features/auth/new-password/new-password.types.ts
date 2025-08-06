import z from "zod";
import { NewPasswordSchema } from "./new-password.schema";

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

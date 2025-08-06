import z from "zod";
import { LoginSchema } from "./login.schema";

export type LoginSchemaType = z.infer<typeof LoginSchema>;

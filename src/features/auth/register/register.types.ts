import z from "zod";
import { RegisterSchema } from "./register.schema";

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

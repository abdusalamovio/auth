import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Создать аккаунт",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

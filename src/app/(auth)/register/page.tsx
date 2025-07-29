import type { Metadata } from "next";
import { RegisterForm } from "@/components/ui";

export const metadata: Metadata = {
  title: "Создать аккаунт",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

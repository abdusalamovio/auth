import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Войти в аккаунт",
};

export default function LoginPage() {
  return <LoginForm />;
}

import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Войти в аккаунт",
};

export default function LoginPage() {
  return <LoginForm />;
}

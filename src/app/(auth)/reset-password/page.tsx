import type { Metadata } from "next";
import { ResetPasswordForm } from "@/features/auth/reset-password";

export const metadata: Metadata = {
  title: "Сброс пароля",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

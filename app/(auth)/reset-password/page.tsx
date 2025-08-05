import type { Metadata } from "next";
import { ResetPasswordForm } from "@/features/auth/";

export const metadata: Metadata = {
  title: "Сброс пароля",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

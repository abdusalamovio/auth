import type { Metadata } from "next";
import { NewPasswordForm } from "@/features/auth/";

export const metadata: Metadata = {
  title: "Новый пароль",
};

export default function NewPasswordPage() {
  return <NewPasswordForm />;
}

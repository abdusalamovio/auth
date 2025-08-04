import type { Metadata } from "next";
import { NewVerificationForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

export default function LoginPage() {
  return <NewVerificationForm />;
}

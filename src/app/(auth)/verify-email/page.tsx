import type { Metadata } from "next";
import { VerifyEmail } from "@/features/auth/verify-email";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}

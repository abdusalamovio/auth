import type { Metadata } from "next";
import { VerifyEmail } from "@/features/auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<h1>Загрузка...</h1>}>
      <VerifyEmail />
    </Suspense>
  );
}

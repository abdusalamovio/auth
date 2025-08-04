import type { Metadata } from "next";
import { NewVerificationForm } from "@/features/auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<h1>Загрузка...</h1>}>
      <NewVerificationForm />
    </Suspense>
  );
}

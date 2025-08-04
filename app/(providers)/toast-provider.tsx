"use client";

import { Toaster } from "@/shared/ui";

export function ToastProvider() {
  return <Toaster position="top-center" duration={6000} />;
}

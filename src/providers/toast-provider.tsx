"use client";

import { Toaster } from "@/components/shared";

export function ToastProvider() {
  return <Toaster position="bottom-right" duration={6000} />;
}

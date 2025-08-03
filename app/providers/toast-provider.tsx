"use client";

import { Toaster } from "@/shared/ui";

export function ToastProvider() {
  return <Toaster position="bottom-right" duration={6000} />;
}

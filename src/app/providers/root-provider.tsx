"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

export function RootProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider />
      {children}
    </ThemeProvider>
  );
}

"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

export function RootProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

import React from "react";
import { ThemeProvider } from "@CS/web/src/components/Providers/components/ThemeProvider";
import { AuthProvider } from "@CS/web/src/components/Providers/components/AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

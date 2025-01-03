"use server";

import React from "react";
import { ThemeProvider } from "@CS/web/components/Providers/components/ThemeProvider";
import { AuthProvider } from "@CS/web/components/Providers/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@CS/web/utils/auth";

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <ThemeProvider>
      <AuthProvider session={session}>{children}</AuthProvider>
    </ThemeProvider>
  );
}

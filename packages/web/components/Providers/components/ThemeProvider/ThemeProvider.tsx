"use client";

import React from "react";
import { cssVariableResolver, theme } from "@CS/web/theme";
import { DEFAULT_COLOR_SCHEME } from "@CS/web/theme/theme.constants";
import { MantineProvider } from "@mantine/core";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme={DEFAULT_COLOR_SCHEME} cssVariablesResolver={cssVariableResolver}>
      {children}
    </MantineProvider>
  );
}

"use client";

import { CSSVariablesResolver } from "@mantine/core";

export const cssVariableResolver: CSSVariablesResolver = theme => ({
  variables: {},
  light: {
    "--mantine-color-body": theme.white,
    "--paper-background-color": theme.white
  },
  dark: {
    "--mantine-color-body": theme.colors.dark[6],
    "--paper-background-color": theme.colors.dark[8]
  }
});

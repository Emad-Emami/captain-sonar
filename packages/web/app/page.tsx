import React from "react";
import { Welcome } from "@CS/web/components/Welcome/Welcome";
import { ColorSchemeToggle } from "@CS/web/components/ColorSchemeToggle/ColorSchemeToggle";

export default function RootPage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}

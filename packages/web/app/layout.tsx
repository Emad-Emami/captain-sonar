import { ColorSchemeScript } from "@mantine/core";
import { Metadata } from "next";
import { AppShell } from "@CS/web/components/AppShell/AppShell";
import "@mantine/core/styles.css";
import { Providers } from "@CS/web/components/Providers";

export const metadata: Metadata = {
  title: "Captain Sonar",
  description: "Online version of the board game Captain Sonar"
};

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;

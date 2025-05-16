"use client";

import React from "react";
import { AppShellProps } from "@CS/web/src/components/AppShell/AppShell.types";
import {
  AppShell as MantineAppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  Group,
  Skeleton,
  Container,
  ThemeIcon
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSubmarine } from "@tabler/icons-react";
import { UserPopover } from "@CS/web/src/components/UserPopover";

export function AppShell({ children }: AppShellProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding="md"
    >
      <AppShellHeader>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <ThemeIcon color="indigo.9" size={36} radius="xl">
              <IconSubmarine size={28} stroke={1} />
            </ThemeIcon>
            Captain Sonar
          </Group>
          <Group>
            <UserPopover />
          </Group>
        </Group>
      </AppShellHeader>
      <AppShellNavbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShellNavbar>
      <AppShellMain>
        <Container py="xl" size="md">
          {children}
        </Container>
      </AppShellMain>
    </MantineAppShell>
  );
}

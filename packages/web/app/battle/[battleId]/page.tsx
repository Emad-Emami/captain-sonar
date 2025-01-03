"use server";

import {
  Card,
  CardSection,
  Text,
  Badge,
  Button,
  Image,
  Group,
  Container,
  List,
  ListItem,
  ThemeIcon,
  Divider,
  Indicator,
  rem
} from "@mantine/core";
import NextImage from "next/image";
import NextLink from "next/link";
import { createCaller } from "@CS/server/modules";
import { IconCalendarCheck, IconId, IconUser } from "@tabler/icons-react";

export default async function BattlePage({ params: { battleId } }: { params: { battleId: string } }) {
  const caller = createCaller({});
  const battle = await caller.getBattle({ id: battleId });
  return (
    <Container py="xl" size="xs">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <CardSection>
          <Image
            component={NextImage}
            src="/images/battle-card-1.webp"
            height={240}
            priority={true}
            width={500}
            alt="Battle"
            style={{ width: "auto", height: "auto" }}
          />
        </CardSection>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Battle</Text>
          <Badge color="indigo.9">{battle?.status}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui eget dolor ultricies lacinia. Donec nec urna nec
        </Text>

        <Divider mt="md" mb="lg" />

        <List spacing="xs" size="sm">
          <ListItem
            icon={
              <ThemeIcon color="indigo.9" size={24} radius="xl">
                <IconId style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            Battle ID: {battle?.id}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon color="indigo.9" size={24} radius="xl">
                <IconCalendarCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            Created at: {battle?.createdAt.toLocaleDateString()}{" "}
            <Text component="span" size="xs">
              (updated at {battle?.createdAt.toLocaleDateString()})
            </Text>
          </ListItem>
          <ListItem
            icon={
              <Indicator label={battle?.players.length} size="sm" color="dark.4">
                <ThemeIcon color="indigo.9" size={24} radius="xl">
                  <IconUser style={{ width: rem(16), height: rem(16) }} />
                </ThemeIcon>
              </Indicator>
            }
          >
            Players: {battle?.players.map(player => player.name).join(", ")}
          </ListItem>
        </List>

        <Button color="indigo.9" fullWidth mt="md" radius="md" component={NextLink} href={`/battle/${battleId}/settings`}>
          Edit
        </Button>
      </Card>
    </Container>
  );
}

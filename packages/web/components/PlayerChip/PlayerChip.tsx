import React from "react";
import { Avatar, Paper, Text } from "@mantine/core";
import { PlayerChipProps } from "@CS/web/components/PlayerChip/PlayerChip.types";
import classes from "@CS/web/components/PlayerChip/PlayerChip.module.css";

export function PlayerChip({ name }: PlayerChipProps) {
  return (
    <Paper withBorder className={classes.root} shadow="xs" p="xs" radius="xl">
      <Avatar size="sm" name={name} color="initials" />
      <Text truncate>{name}</Text>
    </Paper>
  );
}

"use client";

import { PlayerChip } from "@CS/web/components/PlayerChip";
import { trpc } from "@CS/web/trpc";
import { Card, Divider, Fieldset, Group, Select, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CrewMemberRole } from "@prisma/client";
import { useEffect, useMemo } from "react";

export function BattleSettingPage({ params: { battleId } }: { params: { battleId: string } }) {
  const { data: battle } = trpc.getBattle.useQuery({ id: battleId });
  const { mutate } = trpc.setBattleSubmarinesCrew.useMutation();
  const utils = trpc.useUtils();
  trpc.observeBattlePreparation.useSubscription(
    { id: battleId },
    {
      onData: data => utils.getBattle.setData({ id: battleId }, data),
      onError: error => console.error("useSubscription-onError", error),
      onStarted: () => console.log("started")
    }
  );
  const values = useMemo(
    () =>
      battle?.battleSubmarines.reduce(
        (values, { crew, id }) => {
          values[id] = crew.reduce((roles, { playerId, role }) => ({ ...roles, [role]: playerId }), {} as Record<CrewMemberRole, string>);
          return values;
        },
        {} as Record<string, Record<CrewMemberRole, string>>
      ),
    [battle]
  );
  const form = useForm({
    enhanceGetInputProps: ({ form, field, inputProps }) => {
      return {
        onChange: (value: string) => {
          const values = form.getValues();
          // find if the player is already set as a crew member
          if (value) {
            for (const battleSubmarineId in values) {
              for (const role in values[battleSubmarineId]) {
                if (values[battleSubmarineId][role] === value) {
                  form.setFieldValue(`${battleSubmarineId}.${role}`, null);
                }
              }
            }
          }
          form.setFieldValue(field, value);
          const battleSubmarinesCrew: { battleSubmarineId: string; crew: { playerId: string; role: CrewMemberRole }[] }[] = [];
          const newValues = form.getValues();
          Object.keys(newValues).forEach(battleSubmarineId => {
            battleSubmarinesCrew.push({
              battleSubmarineId: battleSubmarineId,
              crew: Object.entries(newValues[battleSubmarineId])
                .map(([role, playerId]) => ({
                  playerId: playerId as string,
                  role: role as CrewMemberRole
                }))
                .filter(({ playerId }) => playerId) // remove empty values
            });
          });
          mutate(battleSubmarinesCrew);
        },
        value: inputProps.value || null
      };
    }
  });
  const setInitialValues = form.setInitialValues;
  const reset = form.reset;

  useEffect(() => {
    if (values) {
      setInitialValues(values);
      reset();
    }
  }, [values]);

  const items = battle?.players.map(player => ({ value: player.id, label: player.name })) || [];
  return (
    <div>
      <Fieldset mb="md" legend="Players">
        <Group>{battle?.players.map(player => <PlayerChip key={player.id} {...player} />)}</Group>
      </Fieldset>
      <Group justify="space-between">
        {battle?.battleSubmarines.map(({ id, submarine }) => (
          <Card mb="xl" flex={1} key={id}>
            <Title order={2}>{submarine.name}</Title>
            <Stack>
              <Select
                label="Captain"
                placeholder="Select captain"
                data={items}
                clearable
                {...form.getInputProps(`${id}.${CrewMemberRole.CAPTAIN}`)}
              />
              <Divider orientation="vertical" />
              <Select
                label="First mate"
                placeholder="Select first mate"
                data={items}
                clearable
                {...form.getInputProps(`${id}.${CrewMemberRole.FIRST_MATE}`)}
              />
              <Divider orientation="vertical" />
              <Select
                label="Engineer"
                placeholder="Select engineer"
                data={items}
                clearable
                {...form.getInputProps(`${id}.${CrewMemberRole.ENGINEER}`)}
              />
              <Divider orientation="vertical" />
              <Select
                label="Radio Operator"
                placeholder="Select radio operator"
                data={items}
                clearable
                {...form.getInputProps(`${id}.${CrewMemberRole.RADIO_OPERATOR}`)}
              />
              <Divider orientation="vertical" />
            </Stack>
          </Card>
        ))}
      </Group>
    </div>
  );
}

export default trpc.withTRPC(BattleSettingPage);

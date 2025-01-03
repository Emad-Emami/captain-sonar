import { prisma } from "@CS/server/system/prisma";
import { CrewMember } from "@prisma/client";
import { DifferentBattleIdsError } from "@CS/server/modules/crewMember/crewMember.errors";
import { BattleSubmarineNotAllFoundError } from "@CS/server/modules/battleSubmarine/battleSubmarine.errors";

/**
 * Set BattleSubmarine crew
 * @param battleSubmarinesCrew { battleSubmarineId: string, crew: { playerId: string, role: CrewMemberRole }[] }[]
 * @returns Battle
 */
export const setBattleSubmarinesCrew = async (
  battleSubmarinesCrew: { battleSubmarineId: string; crew: Pick<CrewMember, "playerId" | "role">[] }[]
) => {
  const battleSubmarines = await prisma.battleSubmarine.findMany({
    where: { id: { in: battleSubmarinesCrew.map(({ battleSubmarineId }) => battleSubmarineId) } }
  });
  if (battleSubmarines.length !== battleSubmarinesCrew.length) throw new BattleSubmarineNotAllFoundError();
  if (battleSubmarines[0].battleId !== battleSubmarines[1].battleId) throw new DifferentBattleIdsError();

  await prisma.$transaction([
    prisma.crewMember.deleteMany({ where: { OR: battleSubmarinesCrew.map(({ battleSubmarineId }) => ({ battleSubmarineId })) } }),
    prisma.crewMember.createManyAndReturn({
      data: battleSubmarinesCrew.flatMap(({ battleSubmarineId, crew }) =>
        crew.map(({ playerId, role }) => ({ playerId, role, battleSubmarineId }))
      )
    })
  ]);

  const battle = await prisma.battle.findUnique({ where: { id: battleSubmarines[0].battleId } });
  return battle;
};

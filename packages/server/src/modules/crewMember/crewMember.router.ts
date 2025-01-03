import { z } from "zod";
import { publicProcedure, router } from "@CS/server/system/trpc";
import { CrewMemberRole } from "@prisma/client";
import { setBattleSubmarinesCrew } from "@CS/server/modules/crewMember/crewMember.service";
import { battleChannel } from "@CS/server/modules/battle/battle.channel";
import { BATTLE_CHANNEL_UPDATE_EVENT } from "@CS/server/modules/battle/battle.constants";

export const crewMemberRouter = router({
  /**
   * Create a crewMember
   * @param input.playerId - Player id
   * @param input.battleSubmarineId - Battle submarine id
   * @param input.role - crewMember role
   * @returns CrewMember
   */
  setBattleSubmarinesCrew: publicProcedure
    .input(
      z
        .object({
          battleSubmarineId: z.string(),
          crew: z.object({ playerId: z.string(), role: z.nativeEnum(CrewMemberRole) }).array()
        })
        .array()
        .length(2)
    )
    .mutation(async ({ input: battleSubmarinesCrew }) => {
      const battle = await setBattleSubmarinesCrew(battleSubmarinesCrew);
      await battleChannel(battle?.id).publish(BATTLE_CHANNEL_UPDATE_EVENT);
      return battle;
    })
});

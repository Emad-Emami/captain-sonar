import { z } from "zod";
import { publicProcedure, router } from "@CS/server/system/trpc";
import { getBattleById } from "@CS/server/modules/battle/battle.service";
import { observable } from "@trpc/server/observable";
import { battleChannel } from "@CS/server/modules/battle/battle.channel";
import { BATTLE_CHANNEL_UPDATE_EVENT } from "@CS/server/modules/battle/battle.constants";
import { GetBattleByIdReturn } from "@CS/server/modules/battle/battle.types";

export const battleRouter = router({
  /**
   * Get a battle by id
   * @param input.id - Battle id
   * @returns Battle
   */
  getBattle: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input: { id } }) => {
    const battle = await getBattleById(id);
    return battle;
  }),
  /**
   * Observe battle preparation
   * @returns Battle
   */
  observeBattlePreparation: publicProcedure.input(z.object({ id: z.string() })).subscription(async ({ input: { id } }) => {
    // Return an observable that emits the battle when the battle channel updates
    return observable<GetBattleByIdReturn>(emit => {
      const observerCallback = async (message: string) => {
        // If the message is the battle channel update event, emit the battle
        if (message === BATTLE_CHANNEL_UPDATE_EVENT) {
          emit.next(await getBattleById(id));
        }
      };

      // Subscribe to the battle channel
      battleChannel(id).subscribe(observerCallback);

      // Return an unsubscribe function
      return async () => {
        // Unsubscribe from the battle channel
        await battleChannel(id).unsubscribe(observerCallback);
      };
    });
  })
});

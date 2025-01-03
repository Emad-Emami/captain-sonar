import { TRPCError } from "@trpc/server";

export class DifferentBattleIdsError extends TRPCError {
  constructor() {
    super({
      code: "BAD_REQUEST",
      message: "BattleSubmarines must belong to the same battle"
    });
  }
}

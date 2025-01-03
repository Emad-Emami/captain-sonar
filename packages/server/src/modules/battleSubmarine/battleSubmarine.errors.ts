import { TRPCError } from "@trpc/server";

export class BattleSubmarineNotAllFoundError extends TRPCError {
  constructor() {
    super({
      code: "NOT_FOUND",
      message: "Not all BattleSubmarines found"
    });
  }
}

export class DifferentBattleIdsError extends TRPCError {
  constructor() {
    super({
      code: "BAD_REQUEST",
      message: "BattleSubmarines must belong to the same battle"
    });
  }
}

import { ServerError, HttpErrorCode } from "@CS/server/system/error";

export class BattleSubmarineNotAllFoundError extends ServerError {
  constructor() {
    super({
      code: HttpErrorCode.NotFound,
      message: "Not all BattleSubmarines found"
    });
  }
}

export class DifferentBattleIdsError extends ServerError {
  constructor() {
    super({
      code: HttpErrorCode.BadRequest,
      message: "BattleSubmarines must belong to the same battle"
    });
  }
}

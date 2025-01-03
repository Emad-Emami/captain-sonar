import { Prisma } from "@prisma/client";

export type GetBattleByIdReturn = Prisma.BattleGetPayload<{
  select: {
    createdAt: true;
    updatedAt: true;
    id: true;
    map: true;
    status: true;
    battleSubmarines: {
      select: {
        id: true;
        submarine: {
          select: {
            id: true;
            name: true;
          };
        };
        battleSubmarinePath: true;
        battleSubmarinePositionPoint: true;
        crew: {
          select: {
            role: true;
            playerId: true;
          };
        };
      };
    };
    players: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}> | null;

import { GetBattleByIdReturn } from "@CS/server/modules/battle/battle.types";
import { prisma } from "@CS/server/system/prisma";

/**
 * Get a battle by id
 * @param id
 * @returns Battle
 */
export const getBattleById = async (id: string) => {
  const battle: GetBattleByIdReturn = await prisma.battle.findUnique({
    where: {
      id
    },
    select: {
      createdAt: true,
      updatedAt: true,
      id: true,
      map: true,
      status: true,
      battleSubmarines: {
        select: {
          id: true,
          submarine: {
            select: {
              id: true,
              name: true
            }
          },
          battleSubmarinePath: true,
          battleSubmarinePositionPoint: true,
          crew: {
            select: {
              role: true,
              playerId: true
            }
          }
        }
      },
      players: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  return battle;
};

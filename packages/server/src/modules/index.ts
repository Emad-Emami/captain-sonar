import { battleRouter } from "@CS/server/modules/battle/battle.router";
import { playerRouter } from "@CS/server/modules/player/player.router";
import { crewMemberRouter } from "@CS/server/modules/crewMember/crewMember.router";
import { createCallerFactory, mergeRouters } from "@CS/server/system/trpc";

export const appRouter = mergeRouters(playerRouter, battleRouter, crewMemberRouter);

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;

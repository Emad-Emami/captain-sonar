import { z } from "zod";
import { publicProcedure, router } from "@CS/server/system/trpc";
import { prisma } from "@CS/server/system/prisma";

export const playerRouter = router({
  createPlayer: publicProcedure.input(z.object({ name: z.string() })).mutation(async opts => {
    const {
      input: { name }
    } = opts;
    const player = await prisma.player.create({
      data: {
        name
      }
    });
    return player;
  })
});

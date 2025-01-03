-- AlterTable
ALTER TABLE "players" RENAME CONSTRAINT "users_pkey" TO "players_pkey";

-- RenameIndex
ALTER INDEX "_battleUsers_AB_unique" RENAME TO "_battlePlayers_AB_unique";

-- RenameIndex
ALTER INDEX "_battleUsers_B_index" RENAME TO "_battlePlayers_B_index";

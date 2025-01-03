/*
  Warnings:

  - Renaming tables might result in data loss. Please review the generated SQL
    and adjust it if necessary before running it on your database.

*/
-- DropForeignKey
ALTER TABLE "_battleUsers" RENAME CONSTRAINT "_battleUsers_A_fkey" TO "_battlePlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_battleUsers" RENAME CONSTRAINT "_battleUsers_B_fkey" TO "_battlePlayers_B_fkey";

-- DropForeignKey
ALTER TABLE "submariners" RENAME CONSTRAINT "submariners_userId_fkey" TO "submariners_playerId_fkey";

-- AlterTable
ALTER TABLE "submariners" RENAME COLUMN "userId" TO "playerId";

-- DropTable
ALTER TABLE "_battleUsers" RENAME TO "_battlePlayers";

-- DropTable
ALTER TABLE "users" RENAME TO "players";

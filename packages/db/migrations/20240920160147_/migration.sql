/*
  Warnings:

  - You are about to drop the `submariners` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum

ALTER TABLE "submariners" RENAME CONSTRAINT "submariners_battleSubmarineId_fkey" TO "crewMembers_battleSubmarineId_fkey";

ALTER TABLE "submariners" RENAME CONSTRAINT "submariners_playerId_fkey" TO "crewMembers_playerId_fkey";

ALTER TABLE "submariners" RENAME TO "crewMembers";

ALTER TYPE "SubmarinerRole" RENAME TO "CrewMemberRole";

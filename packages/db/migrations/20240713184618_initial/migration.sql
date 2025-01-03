-- CreateEnum
CREATE TYPE "BattleStatus" AS ENUM ('PREPARING', 'READY', 'ONGOING', 'CANCELLED', 'DONE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BattleSubmarinStatus" AS ENUM ('UNCOMISSIONED', 'ABANDON', 'IDLE', 'NAVIGATING', 'SURFACED', 'VICTORY', 'SUNK');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('NAVIGATE', 'LOAD_OPERATIVE_SYSTEM', 'SET_BREAKDOWN', 'REACT', 'DIVE', 'SURFACE', 'ACTIVATE_OPERATIVE_SYSTEM', 'TARGET_LOCKED');

-- CreateEnum
CREATE TYPE "OutstandingActionTypes" AS ENUM ('LOAD_OPERATIVE_SYSTEM', 'SET_BREAKDOWN');

-- CreateEnum
CREATE TYPE "SubmarinerRole" AS ENUM ('CAPTAIN', 'FIRST_MATE', 'ENGINEER', 'RADIO_OPERATOR');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('NORTH', 'SOUTH', 'EAST', 'WEST');

-- CreateEnum
CREATE TYPE "CircuitWire" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "SystemCategoryType" AS ENUM ('WEAPON', 'DETECTION', 'SPECIAL', 'POWER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('REPORT', 'ACTION');

-- CreateEnum
CREATE TYPE "SystemType" AS ENUM ('TORPEDO', 'MINE', 'SONAR', 'DRONE', 'SILENT', 'SCENARIO', 'REACTOR');

-- CreateEnum
CREATE TYPE "WeaponSystemType" AS ENUM ('TORPEDO', 'MINE');

-- CreateEnum
CREATE TYPE "DetectionSystemType" AS ENUM ('SONAR', 'DRONE');

-- CreateEnum
CREATE TYPE "SpecialSystemType" AS ENUM ('SILENT', 'SCENARIO');

-- CreateEnum
CREATE TYPE "PowerSystem" AS ENUM ('REACTOR');

-- CreateEnum
CREATE TYPE "OperativeSystemType" AS ENUM ('TORPEDO', 'MINE', 'SONAR', 'DRONE', 'SILENT', 'SCENARIO');

-- CreateEnum
CREATE TYPE "ActionEventType" AS ENUM ('NAVIGATE', 'LOAD_OPERATIVE_SYSTEM', 'SET_BREAKDOWN', 'DIVE', 'SURFACE', 'ACTIVATE_OPERATIVE_SYSTEM', 'TARGET_LOCKED');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('EXPLOSION', 'DETECTION', 'NAVIGATION_BREAKDOWN', 'SUBMARINE_QUIT', 'CONNECTION_ISSUE');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(16) NOT NULL DEFAULT nanoid(16),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battles" (
    "id" VARCHAR(16) NOT NULL DEFAULT nanoid(16),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "BattleStatus" NOT NULL DEFAULT 'PREPARING',
    "mapId" TEXT NOT NULL,

    CONSTRAINT "battles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submarines" (
    "id" VARCHAR(16) NOT NULL DEFAULT nanoid(16),
    "name" TEXT NOT NULL,
    "battles" TEXT[],
    "breakdownPlanId" TEXT NOT NULL,

    CONSTRAINT "submarines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battleSubmarines" (
    "id" VARCHAR(16) NOT NULL DEFAULT nanoid(16),
    "battleId" TEXT NOT NULL,
    "submarineId" TEXT NOT NULL,
    "battleSubmarinePathId" TEXT,
    "status" "BattleSubmarinStatus" NOT NULL DEFAULT 'UNCOMISSIONED',
    "outstandingActions" "OutstandingActionTypes"[],
    "hitPoints" INTEGER NOT NULL DEFAULT 4,
    "permissions" JSONB,

    CONSTRAINT "battleSubmarines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battleSubmarinePositionPoints" (
    "id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "battleSubmarinId" TEXT NOT NULL,
    "battleSubmarinePathId" TEXT NOT NULL,

    CONSTRAINT "battleSubmarinePositionPoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "battleSubmarinePaths" (
    "id" TEXT NOT NULL,

    CONSTRAINT "battleSubmarinePaths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submariners" (
    "userId" TEXT NOT NULL,
    "battleSubmarineId" TEXT NOT NULL,
    "role" "SubmarinerRole" NOT NULL,

    CONSTRAINT "submariners_pkey" PRIMARY KEY ("userId","battleSubmarineId")
);

-- CreateTable
CREATE TABLE "breakpointPlans" (
    "id" TEXT NOT NULL,

    CONSTRAINT "breakpointPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "breakdownPoints" (
    "id" TEXT NOT NULL,
    "navigationSection" "Course" NOT NULL,
    "wire" "CircuitWire",
    "systemType" "SystemCategoryType" NOT NULL,
    "number" INTEGER NOT NULL,
    "breakdownPlanId" TEXT NOT NULL,

    CONSTRAINT "breakdownPoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maps" (
    "id" VARCHAR(16) NOT NULL DEFAULT nanoid(16),
    "name" VARCHAR(200) NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 15,
    "height" INTEGER NOT NULL DEFAULT 15,

    CONSTRAINT "maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapGridCells" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "navigable" BOOLEAN NOT NULL,
    "coursesNavigability" JSONB NOT NULL,

    CONSTRAINT "mapGridCells_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "EventType" NOT NULL,
    "battleId" TEXT NOT NULL,
    "battleSubmarineId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actionEvents" (
    "eventId" TEXT NOT NULL,
    "type" "ActionEventType" NOT NULL,
    "course" "Course",
    "from" TEXT,
    "to" TEXT,
    "system" "OperativeSystemType",
    "breakdownPointId" TEXT,
    "battleSubmarinePathId" TEXT
);

-- CreateTable
CREATE TABLE "reportEvents" (
    "eventId" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "weaponSystem" "WeaponSystemType",
    "detectionSystem" "DetectionSystemType",
    "course" "Course"
);

-- CreateTable
CREATE TABLE "_battleUsers" (
    "A" VARCHAR(16) NOT NULL,
    "B" VARCHAR(16) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "battles_createdAt_key" ON "battles"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "submarines_name_key" ON "submarines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "events_createdAt_key" ON "events"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "actionEvents_eventId_key" ON "actionEvents"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "reportEvents_eventId_key" ON "reportEvents"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_battleUsers_AB_unique" ON "_battleUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_battleUsers_B_index" ON "_battleUsers"("B");

-- AddForeignKey
ALTER TABLE "battles" ADD CONSTRAINT "battles_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submarines" ADD CONSTRAINT "submarines_breakdownPlanId_fkey" FOREIGN KEY ("breakdownPlanId") REFERENCES "breakpointPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battleSubmarines" ADD CONSTRAINT "battleSubmarines_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "battles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battleSubmarines" ADD CONSTRAINT "battleSubmarines_submarineId_fkey" FOREIGN KEY ("submarineId") REFERENCES "submarines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battleSubmarines" ADD CONSTRAINT "battleSubmarines_battleSubmarinePathId_fkey" FOREIGN KEY ("battleSubmarinePathId") REFERENCES "battleSubmarinePaths"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battleSubmarinePositionPoints" ADD CONSTRAINT "battleSubmarinePositionPoints_battleSubmarinId_fkey" FOREIGN KEY ("battleSubmarinId") REFERENCES "battleSubmarines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "battleSubmarinePositionPoints" ADD CONSTRAINT "battleSubmarinePositionPoints_battleSubmarinePathId_fkey" FOREIGN KEY ("battleSubmarinePathId") REFERENCES "battleSubmarinePaths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submariners" ADD CONSTRAINT "submariners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submariners" ADD CONSTRAINT "submariners_battleSubmarineId_fkey" FOREIGN KEY ("battleSubmarineId") REFERENCES "battleSubmarines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "breakdownPoints" ADD CONSTRAINT "breakdownPoints_breakdownPlanId_fkey" FOREIGN KEY ("breakdownPlanId") REFERENCES "breakpointPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mapGridCells" ADD CONSTRAINT "mapGridCells_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "maps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "battles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_battleSubmarineId_fkey" FOREIGN KEY ("battleSubmarineId") REFERENCES "battleSubmarines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionEvents" ADD CONSTRAINT "actionEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionEvents" ADD CONSTRAINT "actionEvents_from_fkey" FOREIGN KEY ("from") REFERENCES "battleSubmarinePositionPoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionEvents" ADD CONSTRAINT "actionEvents_to_fkey" FOREIGN KEY ("to") REFERENCES "battleSubmarinePositionPoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionEvents" ADD CONSTRAINT "actionEvents_breakdownPointId_fkey" FOREIGN KEY ("breakdownPointId") REFERENCES "breakdownPoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actionEvents" ADD CONSTRAINT "actionEvents_battleSubmarinePathId_fkey" FOREIGN KEY ("battleSubmarinePathId") REFERENCES "battleSubmarinePaths"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportEvents" ADD CONSTRAINT "reportEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_battleUsers" ADD CONSTRAINT "_battleUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "battles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_battleUsers" ADD CONSTRAINT "_battleUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

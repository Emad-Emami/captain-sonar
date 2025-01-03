import { createMapGridCells } from "@CS/server/modules/map/map.service";
import { Prisma, PrismaClient, Submarine } from "@prisma/client";

const prisma = new PrismaClient();

const defaultSubmarines = [{ name: "Wolf" }, { name: "Fox" }] as Submarine[];

const defaultBreakdownPoints: Array<Prisma.BreakdownPointCreateWithoutBreakdownPlanInput> = [
  { number: 0, navigationSection: "WEST", systemType: "DETECTION", wire: null },
  { number: 1, navigationSection: "WEST", systemType: "POWER", wire: null },
  { number: 2, navigationSection: "WEST", systemType: "POWER", wire: null },
  { number: 0, navigationSection: "WEST", systemType: "DETECTION", wire: "A" },
  { number: 1, navigationSection: "WEST", systemType: "SPECIAL", wire: "A" },
  { number: 2, navigationSection: "WEST", systemType: "WEAPON", wire: "A" },
  { number: 3, navigationSection: "EAST", systemType: "WEAPON", wire: "A" },
  { number: 0, navigationSection: "NORTH", systemType: "DETECTION", wire: null },
  { number: 1, navigationSection: "NORTH", systemType: "WEAPON", wire: null },
  { number: 2, navigationSection: "NORTH", systemType: "POWER", wire: null },
  { number: 0, navigationSection: "NORTH", systemType: "SPECIAL", wire: "B" },
  { number: 1, navigationSection: "NORTH", systemType: "WEAPON", wire: "B" },
  { number: 2, navigationSection: "NORTH", systemType: "SPECIAL", wire: "B" },
  { number: 3, navigationSection: "EAST", systemType: "DETECTION", wire: "B" },
  { number: 0, navigationSection: "SOUTH", systemType: "WEAPON", wire: null },
  { number: 1, navigationSection: "SOUTH", systemType: "POWER", wire: null },
  { number: 2, navigationSection: "SOUTH", systemType: "SPECIAL", wire: null },
  { number: 0, navigationSection: "SOUTH", systemType: "DETECTION", wire: "C" },
  { number: 1, navigationSection: "SOUTH", systemType: "SPECIAL", wire: "C" },
  { number: 2, navigationSection: "SOUTH", systemType: "WEAPON", wire: "C" },
  { number: 3, navigationSection: "EAST", systemType: "SPECIAL", wire: "C" },
  { number: 0, navigationSection: "EAST", systemType: "POWER", wire: null },
  { number: 1, navigationSection: "EAST", systemType: "DETECTION", wire: null },
  { number: 2, navigationSection: "EAST", systemType: "POWER", wire: null }
];

const map: Prisma.MapCreateInput = { name: "Alpha", width: 15, height: 15 };
const mapGridCells = createMapGridCells({
  width: 15,
  height: 15,
  innavigableCells: [
    [2, 1],
    [6, 1],
    [12, 1],
    [13, 1],
    [2, 2],
    [8, 2],
    [12, 2],
    [8, 3],
    [1, 6],
    [3, 6],
    [6, 6],
    [8, 6],
    [1, 7],
    [3, 7],
    [6, 7],
    [3, 8],
    [7, 8],
    [11, 8],
    [12, 8],
    [13, 8],
    [3, 10],
    [2, 11],
    [7, 11],
    [11, 11],
    [12, 12],
    [2, 13],
    [6, 13],
    [8, 13],
    [13, 13],
    [3, 14]
  ]
});

async function main() {
  // Admin Player
  const admin = await prisma.player.create({ data: { name: "admin" } });

  // Default breakdown plans
  const breakdownPlan = await prisma.breakdownPlan.create({ data: {} });

  // Default submarines
  const submarines = await prisma.$transaction(
    defaultSubmarines.map(submarine =>
      prisma.submarine.create({
        data: { ...submarine, breakdownPlanId: breakdownPlan.id }
      })
    )
  );

  // Default breakdownPoints
  const breakdownPoints = await prisma.$transaction(
    defaultBreakdownPoints.map(breakdownPoint =>
      prisma.breakdownPoint.create({
        data: {
          ...breakdownPoint,
          breakdownPlanId: breakdownPlan.id
        }
      })
    )
  );

  // Default map
  const { id: mapId } = await prisma.map.create({
    data: {
      ...map,
      grids: {
        create: mapGridCells
      }
    }
  });

  // First Battle
  const battle = await prisma.battle.create({
    data: { mapId, createdBy: admin.id, players: { connect: { id: admin.id } } }
  });

  // Initial BattleSubmarines
  const battleSubmarine = await prisma.battleSubmarine.createMany({
    data: submarines.map(submarine => ({ battleId: battle.id, submarineId: submarine.id }))
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

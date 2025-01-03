import { innavigableCells } from "@CS/server/modules/map/map.types";
import { Course } from "@prisma/client";

export function createMapGridCells({
  width,
  height,
  innavigableCells
}: {
  width: number;
  height: number;
  innavigableCells: innavigableCells;
}) {
  const mapGrids = [];
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      const navigable = isNavigable({ x, y, innavigableCells, width, height });
      const coursesNavigability = getAllCoursesNavigability({ x, y, width, height, innavigableCells });
      mapGrids.push({
        x,
        y,
        coursesNavigability,
        navigable
      });
    }
  }
  return mapGrids;
}

export function getAllCoursesNavigability(params: {
  x: number;
  y: number;
  width: number;
  height: number;
  innavigableCells: innavigableCells;
}) {
  return {
    [Course.WEST]: getCourseNavigability({ ...params, course: Course.WEST }),
    [Course.NORTH]: getCourseNavigability({ ...params, course: Course.NORTH }),
    [Course.EAST]: getCourseNavigability({ ...params, course: Course.EAST }),
    [Course.SOUTH]: getCourseNavigability({ ...params, course: Course.SOUTH })
  };
}

export function getCourseNavigability({
  x,
  y,
  width,
  height,
  course,
  innavigableCells
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  course: Course;
  innavigableCells: innavigableCells;
}) {
  switch (course) {
    case Course.WEST:
      if (!isNavigable({ x: x - 1, y, innavigableCells, width, height })) return false;
      break;

    case Course.NORTH:
      if (!isNavigable({ x, y: y - 1, innavigableCells, width, height })) return false;
      break;

    case Course.EAST:
      if (!isNavigable({ x: x + 1, y, innavigableCells, width, height })) return false;
      break;

    case Course.SOUTH:
      if (!isNavigable({ x, y: y + 1, innavigableCells, width, height })) return false;
      break;

    default:
      return false;
  }
  return true;
}

export function isNavigable({
  x,
  y,
  width,
  height,
  innavigableCells
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  innavigableCells: innavigableCells;
}): boolean {
  if (x < 0 || x >= width || y < 0 || y >= height) return false; // check if it's outside of the map grid
  return !innavigableCells.some(cell => cell[0] === x && cell[1] === y); // check if it's innavigable cell
}

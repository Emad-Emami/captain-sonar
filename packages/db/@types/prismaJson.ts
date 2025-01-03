declare global {
  namespace PrismaJson {
    enum Course {
      NORTH = "NORTH",
      SOUTH = "SOUTH",
      WEST = "WEST",
      EAST = "EAST"
    }

    type MapGridCellCoursesNavigability = {
      [key in keyof typeof Course]: boolean;
    };

    enum ActionType {
      NAVIGATE = "NAVIGATE",
      LOAD_OPERATIVE_SYSTEM = "LOAD_OPERATIVE_SYSTEM",
      SET_BREAKDOWN = "SET_BREAKDOWN",
      REACT = "REACT",
      DIVE = "DIVE",
      SURFACE = "SURFACE",
      ACTIVATE_OPERATIVE_SYSTEM = "ACTIVATE_OPERATIVE_SYSTEM",
      TARGET_LOCKED = "TARGET_LOCKED"
    }

    type BattleSubmarinesPermissions = {
      [key in keyof typeof ActionType]: boolean;
    };
  }
}

export {};

export const EMPTY = 'empty'
export const WALL = 'wall'
export const TARGET = 'TARGET'
export const BOX = 'box'
export const PLAYER = 'player'

export type CellType =
  | typeof EMPTY
  | typeof WALL
  | typeof TARGET
  | typeof BOX
  | typeof PLAYER

export interface LevelDataSource {
  layout: CellType[][]
  targets: [number, number][]
}

export const firstLevelDataSource: LevelDataSource = {
  layout: [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, PLAYER, EMPTY, EMPTY, WALL, WALL, WALL, WALL, WALL],
    [WALL, EMPTY, BOX, BOX, WALL, WALL, WALL, WALL, WALL],
    [WALL, EMPTY, BOX, EMPTY, WALL, WALL, WALL, EMPTY, WALL],
    [WALL, WALL, WALL, EMPTY, WALL, WALL, WALL, EMPTY, WALL],
    [WALL, WALL, WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
    [WALL, WALL, EMPTY, EMPTY, EMPTY, WALL, EMPTY, EMPTY, WALL],
    [WALL, WALL, EMPTY, EMPTY, EMPTY, WALL, WALL, WALL, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ],
  targets: [
    [3, 7],
    [4, 7],
    [5, 7]
  ]
}

export const secondLevelDataSource: LevelDataSource = {
  layout: [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, WALL, WALL, WALL, EMPTY, EMPTY, EMPTY, WALL, WALL],
    [WALL, WALL, EMPTY, PLAYER, BOX, EMPTY, EMPTY, WALL, WALL],
    [WALL, WALL, WALL, WALL, EMPTY, BOX, EMPTY, WALL, WALL],
    [WALL, WALL, EMPTY, WALL, WALL, BOX, EMPTY, WALL, WALL],
    [WALL, WALL, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL, WALL],
    [WALL, WALL, BOX, EMPTY, BOX, BOX, BOX, EMPTY, WALL],
    [WALL, WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ],
  targets: [
    [2, 2],
    [3, 6],
    [4, 2],
    [5, 5],
    [6, 4],
    [6, 7],
    [7, 5]
  ]
}

export const thirdLevelDataSource: LevelDataSource = {
  layout: [
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL, WALL],
    [WALL, EMPTY, EMPTY, BOX, EMPTY, BOX, EMPTY, EMPTY, WALL],
    [WALL, EMPTY, BOX, WALL, EMPTY, WALL, BOX, EMPTY, WALL],
    [WALL, WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
    [WALL, EMPTY, BOX, WALL, EMPTY, WALL, BOX, EMPTY, WALL],
    [WALL, EMPTY, EMPTY, BOX, EMPTY, BOX, EMPTY, EMPTY, WALL],
    [WALL, EMPTY, EMPTY, EMPTY, WALL, EMPTY, EMPTY, WALL, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ],
  targets: [
    [2, 4],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 5],
    [4, 6],
    [5, 4],
    [6, 4]
  ]
}

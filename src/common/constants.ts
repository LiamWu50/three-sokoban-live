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

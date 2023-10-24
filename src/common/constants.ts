export const EMPTY = 'empty'
export const WALL = 'wall'
export const TARGET = 'TARGET'
export const BOX = 'box'
export const MATCH_BOX = 'match_box'
export const PLAYER = 'player'

export type CellType =
  | typeof EMPTY
  | typeof WALL
  | typeof TARGET
  | typeof BOX
  // | typeof MATCH_BOX
  | typeof PLAYER

export interface LevelDataSource {
  layout: CellType[][]
  targets: [number, number][]
}

export const colors = {
  wall: '#34495e',
  box: '#3498db',
  coincide: '#2ecc71',
  target: '#e74c3c',
  player: '#e67e22'
}

export const firstLevelDataSource: LevelDataSource = {
  layout: [
    [EMPTY, EMPTY, WALL, WALL, WALL, WALL, WALL, EMPTY],
    [WALL, WALL, WALL, EMPTY, EMPTY, EMPTY, WALL, EMPTY],
    [WALL, EMPTY, PLAYER, BOX, EMPTY, EMPTY, WALL, EMPTY],
    [WALL, WALL, WALL, EMPTY, BOX, EMPTY, WALL, EMPTY],
    [WALL, EMPTY, WALL, WALL, BOX, EMPTY, WALL, EMPTY],
    [WALL, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL, WALL],
    [WALL, BOX, EMPTY, BOX, BOX, BOX, EMPTY, WALL],
    [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
    [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
  ],
  targets: [
    [2, 1],
    [3, 5],
    [4, 1],
    [5, 4],
    [6, 3],
    [6, 6],
    [7, 4]
  ]
}

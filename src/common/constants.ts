export const EMPTY = 'empty'
export const WALL = 'wall'
export const MATCH = 'MATCH'
export const BLOCK = 'block'
export const MATCH_BLOCK = 'match_block'
export const PLAYER = 'player'

export type CellType =
  | typeof EMPTY
  | typeof WALL
  | typeof MATCH
  | typeof BLOCK
  | typeof MATCH_BLOCK
  | typeof PLAYER

export const colors = {
  wall: { fill: '#34495e' },
  block: { fill: '#3498db' },
  matchBlock: { fill: '#2ecc71' },
  match: { fill: '#e74c3c' },
  player: { fill: '#e67e22' }
}

export const levelOneMap: readonly CellType[][] = Object.freeze([
  [EMPTY, EMPTY, WALL, WALL, WALL, WALL, WALL, EMPTY],
  [WALL, WALL, WALL, EMPTY, EMPTY, EMPTY, WALL, EMPTY],
  [WALL, MATCH, PLAYER, BLOCK, EMPTY, EMPTY, WALL, EMPTY],
  [WALL, WALL, WALL, EMPTY, BLOCK, MATCH, WALL, EMPTY],
  [WALL, MATCH, WALL, WALL, BLOCK, EMPTY, WALL, EMPTY],
  [WALL, EMPTY, WALL, EMPTY, MATCH, EMPTY, WALL, WALL],
  [WALL, BLOCK, EMPTY, MATCH_BLOCK, BLOCK, BLOCK, MATCH, WALL],
  [WALL, EMPTY, EMPTY, EMPTY, MATCH, EMPTY, EMPTY, WALL],
  [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
])

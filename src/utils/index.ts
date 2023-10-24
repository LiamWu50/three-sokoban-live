import { Object3D, Scene, Vector3 } from 'three'

import {
  BOX,
  CellType,
  EMPTY,
  MATCH_BOX,
  PLAYER,
  TARGET,
  WALL
} from '@/common/constants'

export const isBlock = (cell: CellType) => [BOX, MATCH_BOX].includes(cell)
export const isPlayer = (cell: CellType) => [PLAYER].includes(cell)
export const isTraversable = (cell: CellType) => [EMPTY, TARGET].includes(cell)
export const isWall = (cell: CellType) => [WALL].includes(cell)
export const isVoid = (cell: CellType) => [TARGET, MATCH_BOX].includes(cell)
export const isMatchBlock = (cell: CellType) => [MATCH_BOX].includes(cell)

/**
 * 根据坐标获取网格类型
 */
export function findNodePosition(matrix: string[][], target: CellType) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === target) {
        return new Vector3(col, 0, row)
      }
    }
  }
}

/**
 * 根据方向获取网格类型
 */
export function getNodeTypeByPosition(
  matrix: readonly CellType[][],
  pos: Vector3
) {
  return matrix[pos.z][pos.x]
}

/**
 * 根据坐标获取网格
 */
export function getMeshByPosition(scene: Scene, position: Vector3) {
  const { x, z } = position
  const mesh = scene.children.find(
    (mesh: Object3D) => mesh.position.x === x && mesh.position.z === z
  )
  return mesh
}

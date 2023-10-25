import { Object3D, Scene, Vector3 } from 'three'

import { CellType } from '@/common/constants'

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

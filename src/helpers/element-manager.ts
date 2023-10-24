import { Color, Mesh, MeshStandardMaterial, Scene, Vector3 } from 'three'

import {
  BOX,
  CellType,
  colors,
  EMPTY,
  LevelDataSource,
  PLAYER
} from '@/common/constants'
import { findNodePosition } from '@/utils'

export default class ElementManager {
  private scene: Scene
  private levelDataSource: LevelDataSource
  public playerPos: Vector3

  constructor(scene: Scene, levelDataSource: LevelDataSource) {
    this.scene = scene
    this.levelDataSource = levelDataSource
    this.playerPos = findNodePosition(levelDataSource.layout, PLAYER) as Vector3
  }

  get layout() {
    return this.levelDataSource.layout
  }

  get targets() {
    return this.levelDataSource.targets
  }

  /**
   * 移动玩家
   */
  public movePlayer(position: Vector3) {
    this.updateEntityPosotion(this.playerPos, position)
    this.replace(position, PLAYER)
    this.replace(this.playerPos, EMPTY)
    this.playerPos = position
  }

  /**
   * 移动箱子
   */
  public moveBox(curPos: Vector3, nextPos: Vector3) {
    this.updateEntityPosotion(curPos, nextPos)
    this.replace(nextPos, BOX)
    this.replace(curPos, EMPTY)
  }

  /**
   * 替换网格类型
   */
  private replace(position: Vector3, type: CellType) {
    this.layout[position.z][position.x] = type
  }

  /**
   * 判断是否是目标位置
   */
  public isTargetPosition(x: number, y: number) {
    return this.targets.some((target) => target[0] === y && target[1] === x)
  }

  /**
   * 更新实体位置
   */
  private updateEntityPosotion(curPos: Vector3, nextPos: Vector3) {
    const entity = this.scene.children.find(
      (mesh) => mesh.position.x === curPos.x && mesh.position.z === curPos.z
    ) as Mesh
    if (entity) entity.position.copy(nextPos)
    // 如果实体是箱子，需要判断是否是目标位置
    if (entity?.name === BOX) this.updateBoxMaterial(nextPos, entity)
  }

  /**
   * 更新箱子材质
   */
  private updateBoxMaterial(potision: Vector3, entity: Mesh) {
    const isTarget = this.isTargetPosition(potision.x, potision.z)
    const material = entity.material as MeshStandardMaterial
    material.color = new Color(isTarget ? colors.coincide : colors.box)
  }

  /**
   * 判断游戏是否结束
   */
  public isGameOver() {
    // 第一部找出所有箱子的位置，然后判断箱子的位置是否全部在目标点上
    const boxPositions: Vector3[] = []
    this.layout.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === BOX) boxPositions.push(new Vector3(x, 0, y))
      })
    })
    return boxPositions.every((position) =>
      this.isTargetPosition(position.x, position.z)
    )
  }
}

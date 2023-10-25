import { Scene } from 'three'

import { BOX, CellType, colors, PLAYER, WALL } from '@/common/constants'
import { treeLayoutData } from '@/common/environment'

import ElementManager from '../element-manager'
import {
  BoxGraphic,
  PlayerGraphic,
  TargetGraphic,
  TreeGraphic,
  WallGraphic
} from '../entity'

export default class SceneRenderManager {
  private scene: Scene
  private elementManager: ElementManager

  constructor(scene: Scene, elementManager: ElementManager) {
    this.scene = scene
    this.elementManager = elementManager
  }

  public render() {
    this.elementManager.layout.forEach((row, y) => {
      row.forEach((cell, x) => this.createTypeMesh(cell, x, y))
    })
    this.elementManager.targets.forEach(([y, x]) => {
      this.createTargetMesh(x, y)
    })
    this.createEnvironment()
  }

  /**
   * 创建类型网格
   */
  private createTypeMesh(cell: CellType, x: number, y: number) {
    if (cell === WALL) {
      this.createWallMesh(x, y)
    } else if (cell === BOX) {
      this.createBoxMesh(x, y)
    } else if (cell === PLAYER) {
      this.createPlayerMesh(x, y)
    }
  }

  /**
   * 创建墙体
   */
  private createWallMesh(x: number, y: number) {
    const wallGraphic = new WallGraphic()
    wallGraphic.mesh.position.x = x
    wallGraphic.mesh.position.z = y
    this.scene.add(wallGraphic.mesh)
  }

  /**
   * 创建目标位置
   */
  private createTargetMesh(x: number, y: number) {
    const targetGraphic = new TargetGraphic()
    targetGraphic.mesh.position.x = x
    targetGraphic.mesh.position.z = y
    this.scene.add(targetGraphic.mesh)
  }

  /**
   * 创建箱子
   */
  private createBoxMesh(x: number, y: number) {
    const isTarget = this.elementManager.isTargetPosition(x, y)
    const color = isTarget ? colors.coincide : colors.box
    const boxGraphic = new BoxGraphic(color)
    boxGraphic.mesh.position.x = x
    boxGraphic.mesh.position.z = y
    this.scene.add(boxGraphic.mesh)
  }

  /**
   * 创建玩家
   */
  private async createPlayerMesh(x: number, y: number) {
    const playerGraphic = new PlayerGraphic()
    await playerGraphic.init()
    playerGraphic.mesh.position.x = x
    playerGraphic.mesh.position.z = y
    this.scene.add(playerGraphic.mesh)
  }

  /**
   * 创建环境
   */
  private createEnvironment() {
    const treeGraphic = new TreeGraphic()

    treeLayoutData.forEach(({ x, y, z, w }) => {
      const clone = treeGraphic.mesh.clone()
      clone.position.set(x, y, z)
      clone.scale.setScalar(w)
      this.scene.add(clone)
    })

    // const rockData = [
    //   [new Vector3(-7, -0.5, 2), new Vector4(2, 8, 3, 2.8)],
    //   [new Vector3(-3, -0.5, -10), new Vector4(3, 2, 2.5, 1.5)],
    //   [new Vector3(-5, -0.5, 3), new Vector4(1, 1.5, 2, 0.8)],
    //   [new Vector3(resX + 5, -0.5, 3), new Vector4(4, 1, 3, 1)],
    //   [new Vector3(resX + 4, -0.5, 2), new Vector4(2, 2, 1, 1)],
    //   [new Vector3(resX + 8, -0.5, 16), new Vector4(6, 2, 4, 4)],
    //   [new Vector3(resX + 6, -0.5, 13), new Vector4(3, 2, 2.5, 3.2)],
    //   [new Vector3(resX + 5, -0.5, -8), new Vector4(1, 1, 1, 0)],
    //   [new Vector3(resX + 6, -0.5, -7), new Vector4(2, 4, 1.5, 0.5)],
    //   [new Vector3(-5, -0.5, 14), new Vector4(1, 3, 2, 0)],
    //   [new Vector3(-4, -0.5, 15), new Vector4(0.8, 0.6, 0.7, 0)],
    //   [new Vector3(resX / 2 + 5, -0.5, 25), new Vector4(2.5, 0.8, 4, 2)],
    //   [new Vector3(resX / 2 + 9, -0.5, 22), new Vector4(1.2, 2, 1.2, 1)],
    //   [new Vector3(resX / 2 + 8, -0.5, 21.5), new Vector4(0.8, 1, 0.8, 2)]
    // ]

    // rockData.forEach(([position, vector4]) => {
    //   const { x, y, z, w } = vector4 as Vector4
    //   const clone = new Rock(this.gridSize).mesh
    //   clone.position.copy(position as Vector3)
    //   clone.scale.set(x, y, z)
    //   clone.rotation.y = w
    //   this.scene.add(clone)
    // })
  }
}

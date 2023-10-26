import { Mesh, Scene, Vector2, Vector3, Vector4 } from 'three'

import { BOX, CellType, colors, PLAYER, WALL } from '@/common/constants'
import { getRockLayoutData, treeLayoutData } from '@/common/environment'

import ElementManager from '../element-manager'
import {
  BoxGraphic,
  PlayerGraphic,
  StoneGraphic,
  TargetGraphic,
  TreeGraphic,
  WallGraphic
} from '../entity'

export default class SceneRenderManager {
  private scene: Scene
  private gridSize: Vector2
  private elementManager: ElementManager
  public playerMesh!: Mesh

  constructor(scene: Scene, gridSize: Vector2, elementManager: ElementManager) {
    this.scene = scene
    this.gridSize = gridSize
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
    const mesh = playerGraphic.mesh
    mesh.position.x = x
    mesh.position.z = y

    this.playerMesh = mesh
    this.scene.add(mesh)
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

    const resX = this.gridSize.x
    const rockLayoutData = getRockLayoutData(resX)

    rockLayoutData.forEach(([position, vector4]) => {
      const { x, y, z, w } = vector4 as Vector4
      const clone = new StoneGraphic().mesh
      clone.position.copy(position as Vector3)
      clone.scale.set(x, y, z)
      clone.rotation.y = w
      this.scene.add(clone)
    })
  }
}

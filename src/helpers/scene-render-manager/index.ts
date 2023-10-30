import gsap from 'gsap'
import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
  Vector4
} from 'three'

import wasdImg from '@/assets/images/arrows.png'
import {
  BOX,
  CellType,
  LevelDataSource,
  PLAYER,
  WALL
} from '@/common/constants'
import { getRockLayoutData, treeLayoutData } from '@/common/environment'
import theme from '@/common/theme'

import ElementManager from '../element-manager'
import {
  BoxGraphic,
  Graphic,
  PlayerGraphic,
  StoneGraphic,
  TargetGraphic,
  TextGraphic,
  TreeGraphic,
  WallGraphic
} from '../entity'

export default class SceneRenderManager {
  private scene: Scene
  private gridSize: Vector2
  private elementManager: ElementManager
  public playerMesh!: Mesh
  private level: number
  private entities: Graphic[] = []

  constructor(
    scene: Scene,
    level: number,
    gridSize: Vector2,
    elementManager: ElementManager
  ) {
    this.scene = scene
    this.level = level
    this.gridSize = gridSize
    this.elementManager = elementManager
  }

  public render() {
    this.generateEntities()
    this.createEnvironment()
    this.createLevelText()
    this.createKeyboardHelper()
  }

  private generateEntities() {
    this.elementManager.layout.forEach((row, y) => {
      row.forEach((cell, x) => this.createTypeMesh(cell, x, y))
    })
    this.elementManager.targets.forEach(([y, x]) => {
      this.createTargetMesh(x, y)
    })

    this.entities.sort((a, b) => {
      const c = new Vector3(
        this.gridSize.x / 2 - 0.5,
        0,
        this.gridSize.y / 2 - 0.5
      )

      const distanceA = a.position.clone().sub(c).length()
      const distanceB = b.position.clone().sub(c).length()

      return distanceA - distanceB
    })

    gsap.from(
      this.entities.map((entity) => entity.mesh.scale),
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'elastic.out(1.5, 0.5)',
        stagger: {
          grid: [10, 10],
          amount: 1.2
        }
      }
    )
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
    this.entities.push(wallGraphic)
    this.scene.add(wallGraphic.mesh)
  }

  /**
   * 创建目标位置
   */
  private createTargetMesh(x: number, y: number) {
    const targetGraphic = new TargetGraphic()
    targetGraphic.mesh.position.x = x
    targetGraphic.mesh.position.z = y
    this.entities.push(targetGraphic)
    this.scene.add(targetGraphic.mesh)
  }

  /**
   * 创建箱子
   */
  private createBoxMesh(x: number, y: number) {
    const isTarget = this.elementManager.isTargetPosition(x, y)
    const color = isTarget ? theme.coincide : theme.box
    const boxGraphic = new BoxGraphic(color)
    boxGraphic.mesh.position.x = x
    boxGraphic.mesh.position.z = y
    this.entities.push(boxGraphic)
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
    this.entities.push(playerGraphic)
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

  /**
   * 创建关卡文本
   */
  private createLevelText() {
    const textGraphic = new TextGraphic(this.level)
    textGraphic.mesh.position.x = this.gridSize.x / 2 + 0.5
    textGraphic.mesh.position.z = -2
    textGraphic.mesh.position.y = 0.6
    textGraphic.mesh.castShadow = true
    this.entities.push(textGraphic)
    this.scene.add(textGraphic.mesh)

    gsap.from(textGraphic.mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: 'elastic.out(1.5, 0.5)',
      stagger: {
        amount: 1.2
      }
    })
  }

  /**
   * 创建键盘按钮辅助
   */
  private createKeyboardHelper() {
    const textureLoader = new TextureLoader()
    const wasd = textureLoader.load(wasdImg)
    const wasdGeometry = new PlaneGeometry(2, 1.1)
    wasdGeometry.rotateX(-Math.PI * 0.5)

    const planeWasd = new Mesh(
      wasdGeometry,
      new MeshStandardMaterial({
        transparent: true,
        map: wasd,
        opacity: 0.5
      })
    )

    planeWasd.position.set(10, -0.4, 8)

    this.scene.add(planeWasd)
  }

  public updateLevel(level: number, levelDataSource: LevelDataSource) {
    gsap.to(
      this.entities.map((entity) => entity.mesh.scale),
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'elastic.out(1.5, 0.5)',
        stagger: {
          grid: [10, 10],
          amount: 1.2
        },
        onComplete: () => {
          this.level = level
          this.entities.forEach((entity) => {
            this.scene.remove(entity.mesh)
          })
          this.entities = []
          this.elementManager.updateLevelDataSource(levelDataSource)
          this.generateEntities()
          this.createLevelText()
        }
      }
    )
  }
}

import {
  GridHelper,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  Vector2,
  Vector3,
  Vector4
} from 'three'

import { BOX, EMPTY, firstLevelDataSource, WALL } from '@/common/constants'
import theme from '@/common/theme'

import ElementManager from './element-manager'
import EntityManager from './entity-manager'

const UP = new Vector3(0, 0, -1)
const DOWN = new Vector3(0, 0, 1)
const LEFT = new Vector3(-1, 0, 0)
const RIGHT = new Vector3(1, 0, 0)

export default class GameSceneCreator {
  private scene: THREE.Scene
  private gridSize: Vector2
  private elementManager: ElementManager
  private entityManager: EntityManager

  constructor(scene: Scene, gridSize: Vector2) {
    this.scene = scene
    this.gridSize = gridSize
    this.elementManager = new ElementManager(scene, firstLevelDataSource)
    this.entityManager = new EntityManager(scene, this.elementManager)
  }

  public render() {
    this.createScenePlane()
    this.createGridHelper()
    this.createEnvironment()
    this.entityManager.render()
    this.bindKeyboardEvent()
  }

  /**
   * 创建场景平面
   */
  private createScenePlane() {
    const { x, y } = this.gridSize
    const planeGeometry = new PlaneGeometry(x * 50, y * 50)
    planeGeometry.rotateX(-Math.PI * 0.5)
    const planMaterial = new MeshStandardMaterial({ color: theme.groundColor })
    const plane = new Mesh(planeGeometry, planMaterial)
    plane.position.x = x / 2 - 0.5
    plane.position.z = y / 2 - 0.5
    plane.position.y = -0.5
    plane.receiveShadow = true
    this.scene.add(plane)
  }

  /**
   * 创建网格辅助
   */
  private createGridHelper() {
    const gridHelper = new GridHelper(
      this.gridSize.x,
      this.gridSize.y,
      0xffffff,
      0xffffff
    )
    gridHelper.position.set(
      this.gridSize.x / 2 - 0.5,
      -0.49,
      this.gridSize.y / 2 - 0.5
    )
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.3
    this.scene.add(gridHelper)
  }

  private createEnvironment() {
    const treeData = [
      new Vector4(-4, 0, 5, 1),
      new Vector4(-3, 0, 4, 1.2),
      new Vector4(-2, 0, 0, 0.8),
      new Vector4(-5, 0, -3, 1.3),
      new Vector4(-5, 0, -5, 2),
      new Vector4(-4, 0, -4, 1.5),
      new Vector4(-2, 0, -5, 1),
      new Vector4(0, 0, -2, 1.2),
      new Vector4(2, 0, -3, 1.2),
      new Vector4(4, 0, -5, 1.2),
      new Vector4(6, 0, -6, 1.3),
      new Vector4(5, 0, -5.5, 1),
      new Vector4(10, 0, -3, 1.8),
      new Vector4(12, 0, 0, 1.1),
      new Vector4(11, 0, 0, 1.3),
      new Vector4(11.5, 0, 1, 1.1),
      new Vector4(12, 0, 5, 1.5),
      new Vector4(11, 0, 6, 1.3),
      new Vector4(10.5, 0, 5.5, 1.1),
      new Vector4(11, 0, 10, 1.6),
      new Vector4(7, 0, 10, 1.1),
      new Vector4(18, 0, 2, 0.6)
    ]
    const TREE_GEOMETRY = new IcosahedronGeometry(0.3)
    TREE_GEOMETRY.rotateX(Math.random() * Math.PI * 2)
    TREE_GEOMETRY.scale(0.6, 2.6, 0.6)
    const TREE_MATERIAL = new MeshStandardMaterial({
      flatShading: true,
      color: '#A3CB38'
    })
    const mesh = new Mesh(TREE_GEOMETRY, TREE_MATERIAL)
    mesh.scale.setScalar(0.6 + Math.random() * 0.6)
    mesh.rotation.y = Math.random() * Math.PI * 2
    mesh.castShadow = true
    mesh.receiveShadow = true

    treeData.forEach(({ x, y, z, w }) => {
      const clone = mesh.clone()
      clone.position.set(x, y, z)
      clone.scale.setScalar(w)
      this.scene.add(clone)
    })

    // const resX = this.gridSize.x

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

  /**
   * 绑定键盘事件
   */
  private bindKeyboardEvent() {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const keyCode = e.code
      const playerPos = this.elementManager.playerPos

      const nextPos = this.getNextPositon(playerPos, keyCode) as Vector3
      const nextTwoPos = this.getNextPositon(nextPos, keyCode) as Vector3
      const nextElement = this.elementManager.layout[nextPos.z][nextPos.x]

      const nextTwoElement =
        this.elementManager.layout[nextTwoPos.z][nextTwoPos.x]

      if (nextElement === EMPTY) {
        this.elementManager.movePlayer(nextPos)
      } else if (nextElement === BOX) {
        if (nextTwoElement === WALL || nextTwoElement === BOX) return
        this.elementManager.moveBox(nextPos, nextTwoPos)
        this.elementManager.movePlayer(nextPos)
      }

      // 如果每一个箱子都在目标点上，那么游戏结束
      if (this.elementManager.isGameOver()) {
        alert('游戏结束')
      }
    })
  }

  /**
   *  根据方向和位置获取下一个位置
   */
  private getNextPositon(position: Vector3, keyCode: string) {
    let newDirection

    switch (keyCode) {
      case 'ArrowUp':
      case 'KeyW':
        newDirection = UP
        break
      case 'ArrowDown':
      case 'KeyS':
        newDirection = DOWN
        break
      case 'ArrowLeft':
      case 'KeyA':
        newDirection = LEFT
        break
      case 'ArrowRight':
      case 'KeyD':
        newDirection = RIGHT
        break
      default:
        return
    }

    if (newDirection) {
      return position.clone().add(newDirection)
    }
  }
}

import { cloneDeep } from 'lodash'
import {
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  Vector2,
  Vector3
} from 'three'

import {
  BOX,
  EMPTY,
  firstLevelDataSource,
  secondLevelDataSource,
  thirdLevelDataSource,
  WALL
} from '@/common/constants'
import theme from '@/common/theme'

import ElementManager from '../element-manager'
import SceneRenderManager from '../scene-render-manager'
import ThreeConfettiMulticolored from '../three-confetti-multicolored'

const UP = new Vector3(0, 0, -1)
const DOWN = new Vector3(0, 0, 1)
const LEFT = new Vector3(-1, 0, 0)
const RIGHT = new Vector3(1, 0, 0)

export default class GameSceneCreator {
  private scene: THREE.Scene
  private gridSize: Vector2
  private level: number
  private isPlaying: boolean
  private elementManager: ElementManager
  private sceneRenderManager: SceneRenderManager

  constructor(scene: Scene, gridSize: Vector2) {
    this.scene = scene
    this.gridSize = gridSize
    this.level = 1
    this.isPlaying = true
    this.elementManager = new ElementManager(
      scene,
      cloneDeep(firstLevelDataSource)
    )
    this.sceneRenderManager = new SceneRenderManager(
      scene,
      this.level,
      this.gridSize,
      this.elementManager
    )
    this.bindRefreshEvent()
  }

  public render() {
    this.createScenePlane()
    this.createGridHelper()
    this.sceneRenderManager.render()
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

  /**
   * 绑定键盘事件
   */
  private bindKeyboardEvent() {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (!this.isPlaying) return

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
        this.isPlaying = false
        setTimeout(() => this.playFireworks(), 200)
        setTimeout(() => this.updateLevel(), 3800)
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
      const mesh = this.sceneRenderManager.playerMesh
      mesh.lookAt(mesh.position.clone().add(newDirection))

      return position.clone().add(newDirection)
    }
  }

  private playFireworks() {
    const threeConfettiMulticolored = new ThreeConfettiMulticolored(this.scene)

    for (let i = 0; i < 8; i++) {
      const position = new Vector3(
        Math.random() * this.gridSize.x,
        Math.random() * 6,
        Math.random() * this.gridSize.y
      )
      setTimeout(() => {
        threeConfettiMulticolored.animate(position)
      }, i * 400)
    }
  }

  private updateLevel() {
    const nextLevel = this.level === 1 ? 2 : this.level === 2 ? 3 : 1
    this.level = nextLevel
    const levelDataSource =
      nextLevel === 1
        ? firstLevelDataSource
        : nextLevel === 2
        ? secondLevelDataSource
        : thirdLevelDataSource
    this.sceneRenderManager.updateLevel(this.level, cloneDeep(levelDataSource))
    this.isPlaying = true
  }

  private bindRefreshEvent() {
    const refreshBtn = document.getElementById('refresh')
    refreshBtn?.addEventListener('click', () => {
      const levelDataSource =
        this.level === 1
          ? firstLevelDataSource
          : this.level === 2
          ? secondLevelDataSource
          : thirdLevelDataSource
      this.sceneRenderManager.updateLevel(
        this.level,
        cloneDeep(levelDataSource)
      )
    })
  }
}

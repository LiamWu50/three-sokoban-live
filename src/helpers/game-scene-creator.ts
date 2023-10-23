import {
  AxesHelper,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector2,
  Vector3
} from 'three'

import {
  BLOCK,
  CellType,
  EMPTY,
  levelOneMap,
  MATCH,
  MATCH_BLOCK,
  PLAYER,
  WALL
} from '@/common/constants'
import {
  getMeshByPosition,
  getNodeTypeByPosition,
  isBlock,
  isMatchBlock,
  isTraversable,
  isVoid
} from '@/utils'

import entityConstructor from './entity'

const UP = new Vector3(0, 0, -1)
const DOWN = new Vector3(0, 0, 1)
const LEFT = new Vector3(-1, 0, 0)
const RIGHT = new Vector3(1, 0, 0)

export default class GameSceneCreator {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private gridSize: Vector2
  private scenePlane!: Mesh
  private playerPos!: Vector3
  private levelMap!: readonly CellType[][]

  constructor(scene: Scene, camera: PerspectiveCamera, gridSize: Vector2) {
    this.scene = scene
    this.camera = camera
    this.gridSize = gridSize
    this.levelMap = levelOneMap

    this.createScenePlane()
    this.render()
    this.bindKeyboardEvent()
  }

  /**
   * 创建场景平面
   */
  private createScenePlane() {
    const gridSize = this.gridSize
    const planeGeometry = new PlaneGeometry(
      gridSize.x,
      gridSize.y,
      gridSize.x,
      gridSize.y
    )
    planeGeometry.rotateX(-Math.PI * 0.5)
    const planMaterial = new MeshNormalMaterial({ wireframe: true })
    const plane = new Mesh(planeGeometry, planMaterial)
    plane.position.x = gridSize.x / 2 - 0.5
    plane.position.z = gridSize.y / 2 - 0.5
    plane.position.y = -0.5
    plane.receiveShadow = true
    this.scenePlane = plane
    this.scene.add(plane)

    const axesHelper = new AxesHelper(3)
    axesHelper.position.x = -this.gridSize.x / 2
    axesHelper.position.z = -this.gridSize.y / 2

    this.scenePlane.add(axesHelper)
  }

  private render() {
    this.levelMap.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === PLAYER) this.playerPos = new Vector3(x, 0, y)
        this.drawCellMesh(cell, x, y)
      })
    })
  }

  private drawCellMesh(cell: CellType, x: number, y: number) {
    if (cell === EMPTY) return
    const mesh = entityConstructor[
      cell.toUpperCase() as keyof typeof entityConstructor
    ](x, y)
    mesh && this.scene.add(mesh)
  }

  /**
   * 绑定键盘事件
   */
  private bindKeyboardEvent() {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const keyCode = e.code
      const pos = this.playerPos.clone()
      const nextPos = this.getNextPositon(pos.clone(), keyCode)
      if (!nextPos) return
      const nextNode = getNodeTypeByPosition(this.levelMap, nextPos)

      if (isTraversable(nextNode)) {
        this.movePlayer(pos, nextPos)
      } else if (isBlock(nextNode)) {
        this.movePlayerAndBoxes(pos, nextPos, nextNode, keyCode)
      }
      // else if(isMatchBlock(nextNode)) {

      // }
    })
  }

  private movePlayer(pos: Vector3, nextPos: Vector3) {
    const player = getMeshByPosition(this.scene, pos)
    player?.position.copy(nextPos)
    this.playerPos = nextPos.clone()
    // 将先前的位置替换为初始板状态（无效或空）
    const curPosType = isVoid(this.levelMap[pos.z][pos.x]) ? MATCH : EMPTY

    this.updateLevelMap(pos, curPosType)
    this.updateLevelMap(nextPos, PLAYER)
  }

  private movePlayerAndBoxes(
    pos: Vector3,
    nextPos: Vector3,
    nextNode: CellType,
    keyCode: string
  ) {
    const nextTwoPos = this.getNextPositon(nextPos.clone(), keyCode)
    if (!nextTwoPos) return
    const nextTwoNode = getNodeTypeByPosition(this.levelMap, nextTwoPos)
    if (
      nextTwoNode === WALL ||
      nextTwoNode === BLOCK ||
      nextTwoNode === MATCH_BLOCK
    )
      return
    else if (nextTwoNode === MATCH) {
      if (nextNode === MATCH_BLOCK) {
        // const matchBlockMesh = getMeshByPosition(this.scene, nextPos)
        // matchBlockMesh?.position.copy(nextTwoPos)
        // const matchMesh = getMeshByPosition(this.scene, nextTwoPos)
        // matchMesh?.position.copy(nextPos)
        // this.updateLevelMap(nextPos, MATCH)
        // this.updateLevelMap(nextTwoPos, MATCH_BLOCK)
        // this.movePlayer(pos, nextPos)
      } else {
        const mesh = getMeshByPosition(this.scene, nextPos)
        if (!mesh) return
        this.scene.remove(mesh)
        const newMesh = entityConstructor['MATCH_BLOCK'](
          nextTwoPos.x,
          nextTwoPos.z
        )
        this.scene.add(newMesh)
        this.updateLevelMap(nextTwoPos, MATCH_BLOCK)
        this.movePlayer(pos, nextPos)
      }
    } else {
      if (nextNode === MATCH_BLOCK) {
        // const blockMesh = getMeshByPosition(this.scene, nextPos)
        // blockMesh?.position.copy(nextTwoPos)
        // this.updateLevelMap(nextTwoPos, BLOCK)
        // const matchMesh = getMeshByPosition(this.scene, nextTwoPos)
        // matchMesh?.position.copy(nextPos)
        // this.updateLevelMap(nextPos, MATCH)
        // this.movePlayer(pos, nextPos)
      } else {
        const mesh = getMeshByPosition(this.scene, nextPos)
        mesh?.position.copy(nextTwoPos)
        this.updateLevelMap(nextTwoPos, BLOCK)
        this.movePlayer(pos, nextPos)
      }
    }
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
      return position.add(newDirection)
    }
  }

  private updateLevelMap(position: Vector3, type: CellType) {
    const { x, z } = position
    this.levelMap[z][x] = type
  }
}

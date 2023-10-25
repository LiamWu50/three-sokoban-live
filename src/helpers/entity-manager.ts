import {
  BoxGeometry,
  CylinderGeometry,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Scene,
  SphereGeometry
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

import characterMaleUrl from '@/assets/gltf/Character_Male_1.gltf'
import { BOX, CellType, colors, PLAYER, TARGET, WALL } from '@/common/constants'

import ElementManager from './element-manager'

const gltfLoader = new GLTFLoader()

export default class EntityManager {
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
  createWallMesh(x: number, y: number) {
    const ROCK_GEOMETRY = new IcosahedronGeometry(0.3)
    ROCK_GEOMETRY.rotateX(Math.random() * Math.PI * 2)
    const ROCK_MATERIAL = new MeshStandardMaterial({
      color: '#d1d8e0',
      flatShading: true
    })
    const mesh = new Mesh(ROCK_GEOMETRY, ROCK_MATERIAL)
    mesh.scale.set(1, 3, 1)
    mesh.rotation.y = Math.random() * Math.PI * 2
    mesh.rotation.x = Math.random() * Math.PI * 0.1
    mesh.rotation.order = 'YXZ'
    mesh.position.y = -0.5

    mesh.name = WALL
    mesh.position.x = x
    mesh.position.z = y
    mesh.castShadow = true
    mesh.receiveShadow = true

    this.scene.add(mesh)
  }

  /**
   * 创建目标位置
   */
  createTargetMesh(x: number, y: number) {
    const NODE_GEOMETRY = new SphereGeometry(0.3, 6, 6)
    const NODE_MATERIAL = new MeshStandardMaterial({
      color: colors.target
    })
    const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
    mesh.name = TARGET
    mesh.position.x = x
    mesh.position.z = y
    this.scene.add(mesh)
  }

  /**
   * 创建箱子
   */
  createBoxMesh(x: number, y: number) {
    const isTarget = this.elementManager.isTargetPosition(x, y)
    const NODE_GEOMETRY = new RoundedBoxGeometry(0.8, 0.8, 0.8, 5, 0.1)
    const NODE_MATERIAL = new MeshStandardMaterial({
      color: isTarget ? colors.coincide : colors.box
    })
    const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
    mesh.name = BOX
    mesh.position.x = x
    mesh.position.z = y
    this.scene.add(mesh)
  }

  /**
   * 创建玩家
   */
  createPlayerMesh(x: number, y: number) {
    gltfLoader.load(characterMaleUrl, (gltf: any) => {
      console.log('gltf', gltf)

      const root = gltf.scene
      root.name = PLAYER
      root.position.y = -0.5
      root.scale.set(0.5, 0.5, 0.5)
      root.position.x = x
      root.position.z = y
      root.traverse((child: any) => {
        console.log('child', child)

        if (child.castShadow !== undefined) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      this.scene.add(root)
    })
  }
}

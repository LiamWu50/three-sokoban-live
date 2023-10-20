import {
  AxesHelper,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector2
} from 'three'

import WarehouseMan from './warehouse-man'

export default class GameSceneCreator {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private gridSize: Vector2
  private scenePlane!: Mesh
  private warehouseMan: WarehouseMan

  constructor(scene: Scene, camera: PerspectiveCamera, gridSize: Vector2) {
    this.scene = scene
    this.camera = camera
    this.gridSize = gridSize

    this.warehouseMan = new WarehouseMan(scene, gridSize)

    this.createScenePlane()
    this.createBoxs()
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

  /**
   * 创建箱子
   */
  private createBoxs() {
    // for (let i = 0; i < 4; i++) {}
  }
}

import {
  BoxGeometry,
  Fog,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  VSMShadowMap,
  WebGLRenderer
} from 'three'

const UP = new Vector3(0, 0, -1)
const DOWN = new Vector3(0, 0, 1)
const LEFT = new Vector3(-1, 0, 0)
const RIGHT = new Vector3(1, 0, 0)

export default class WarehouseMan {
  private scene: Scene
  private gridsize: Vector2
  private mesh!: Mesh

  constructor(scene: Scene, gridSize: Vector2) {
    this.scene = scene
    this.gridsize = gridSize
    this.createMan()
    this.registerEventListener()
  }

  private createMan() {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshNormalMaterial()
    this.mesh = new Mesh(geometry, material)
    this.mesh.scale.multiplyScalar(0.9)
    this.mesh.position.set(this.gridsize.x / 2, 0, this.gridsize.y / 2)
    this.scene.add(this.mesh)
  }

  private registerEventListener() {
    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const keyCode = e.code

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

      this.mesh.position.add(newDirection)
    })
  }
}

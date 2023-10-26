import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  VSMShadowMap,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import theme from '@/common/theme'

export default new (class ThreeSceneCreator {
  public scene!: THREE.Scene
  public camera!: THREE.PerspectiveCamera
  private renderer!: THREE.WebGLRenderer
  private controls!: OrbitControls
  public gridSize!: Vector2
  private sizes!: { width: number; height: number }
  public container!: HTMLDivElement

  constructor() {
    this.gridSize = new Vector2(9, 9)
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  /**
   * 初始化场景
   */
  public init(container: HTMLDivElement) {
    this.container = container

    this.createScene()
    this.createCamera()
    this.createRenderer()
    this.createLight()
    this.createControls()

    this.tic()

    window.addEventListener('resize', this.handleResize.bind(this))
  }

  /**
   * 创建场景
   */
  private createScene() {
    this.scene = new Scene()
    this.scene.background = new Color(theme.fogColor)
    this.scene.fog = new Fog(theme.fogColor, 10, 24)
  }

  /**
   * 创建相机
   */
  private createCamera() {
    const fov = 60
    const aspect = this.sizes.width / this.sizes.height
    this.camera = new PerspectiveCamera(fov, aspect, 0.1)
    this.camera.position.copy(
      new Vector3(
        this.gridSize.x / 2 - 2,
        this.gridSize.x / 2 + 4.5,
        this.gridSize.y + 1.7
      )
    )
  }

  /**
   * 创建渲染器
   */
  private createRenderer() {
    const renderer = new WebGLRenderer({
      antialias: window.devicePixelRatio < 2,
      logarithmicDepthBuffer: true
    })

    this.container.appendChild(renderer.domElement)

    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = VSMShadowMap
    this.renderer = renderer
    this.handleResize()
  }

  /**
   * 创建光源
   */
  private createLight() {
    const ambLight = new AmbientLight(0xffffff, 0.6)
    const dirLight = new DirectionalLight(0xffffff, 0.7)

    dirLight.position.set(20, 20, 20)
    dirLight.target.position.set(this.gridSize.x / 2, 0, this.gridSize.y / 2)
    dirLight.shadow.mapSize.set(1024, 1024)
    dirLight.shadow.radius = 7
    dirLight.shadow.blurSamples = 20
    dirLight.shadow.camera.top = 30
    dirLight.shadow.camera.bottom = -30
    dirLight.shadow.camera.left = -30
    dirLight.shadow.camera.right = 30

    dirLight.castShadow = true

    this.scene.add(ambLight, dirLight)
  }

  /**
   * 创建控制器
   */
  private createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.enableRotate = false
    this.controls.target.set(this.gridSize.x / 2, 0, this.gridSize.y / 2)
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize() {
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.sizes.width, this.sizes.height)

    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.renderer.setPixelRatio(pixelRatio)
  }

  /**
   * 渲染
   */
  private tic() {
    this.controls.update()

    this.renderer.render(this.scene, this.camera)

    requestAnimationFrame(() => {
      this.tic()
    })
  }
})()

import {
  DoubleSide,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
  Vector3
} from 'three'

class Particle extends Mesh {
  public destination!: Vector3
  public rotateSpeedX!: number
  public rotateSpeedY!: number
  public rotateSpeedZ!: number
  public dispose!: () => void

  constructor(geometry: PlaneGeometry, material: MeshBasicMaterial) {
    super(geometry, material)
  }
}

const COLORS = [0xfc5c65, 0xfd9644, 0xfed330, 0x26de81, 0xa55eea, 0x45aaf2]

/**
 * 基于ThreeJS的五彩纸屑爆炸效果
 */
export default class ThreeConfettiMulticolored {
  private scene: Scene
  private particleCount: number //粒子数量
  private radius: number // 每次爆炸的半径
  private fallingHeight: number // 粒子下落的高度
  private colors: number[] // 粒子颜色数组
  private enableShadows: boolean // 启用粒子阴影。设置为false可获得更好的性能。
  private duration: number // 持续时间
  private stagger: number // 喷发的间隔时间

  constructor(
    scene: Scene,
    options?: {
      particleCount?: number
      radius?: number
      fallingHeight?: number
      colors?: number[]
      enableShadows?: boolean
      duration?: number
      stagger?: number
    }
  ) {
    this.scene = scene
    this.particleCount = options?.particleCount || 500
    this.radius = options?.radius || 15
    this.fallingHeight = options?.fallingHeight || 3
    this.colors = options?.colors || COLORS
    this.enableShadows = options?.enableShadows || false
    this.duration = options?.duration || 3000
    this.stagger = options?.stagger || 0.01
  }

  // 开始播放
  public animate(position: Vector3) {
    let startTime: number | undefined
    const confetti = this.createConfetti(position)

    const update = (time: number) => {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const progress = startTime === time ? 0 : elapsed / this.duration
      const curParticles = confetti.children.slice(
        0,
        Math.ceil(elapsed / this.stagger)
      )

      curParticles.forEach((particle) => {
        this.updateParticle(confetti, particle as Particle, progress)
      })

      if (time - startTime < this.duration) {
        requestAnimationFrame(update)
      } else {
        this.disposeConfetti(confetti)
      }
    }

    requestAnimationFrame(update)
  }

  // 创建五彩纸屑
  private createConfetti(position: Vector3) {
    const confetti = new Mesh()
    confetti.position.copy(position)
    this.scene.add(confetti)

    for (let i = 0; i < this.particleCount; i++) {
      const particle = this.createParticle()
      confetti.add(particle)
    }

    return confetti
  }

  // 销毁五彩纸屑
  private disposeConfetti(confetti: Mesh) {
    const particles = confetti.children as Particle[]
    particles.forEach((particle) => {
      const material = particle.material as MeshBasicMaterial
      material.dispose()
      particle.geometry.dispose()
      confetti.remove(particle)
    })
    this.scene.remove(confetti)
    confetti = null as any
  }

  // 创建粒子
  private createParticle() {
    const { colors, radius, enableShadows } = this
    const geometry = new PlaneGeometry(0.03, 0.03, 1, 1)

    const material = new MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      side: DoubleSide
    })
    const particle = new Particle(geometry, material)
    particle.castShadow = enableShadows

    const x = (Math.random() - 0.5) * (radius * 2) * Math.random()
    const y = (Math.random() - 0.5) * (radius * 2) * Math.random()
    const z = (Math.random() - 0.5) * (radius * 2) * Math.random()

    particle.destination = new Vector3(x, y, z)

    particle.rotation.x = Math.random() * 360
    particle.rotation.y = Math.random() * 360
    particle.rotation.z = Math.random() * 360

    const size = Math.random() * 2 + 1
    particle.scale.set(size, size, size)

    particle.rotateSpeedX = Math.random() * 0.8 - 0.4
    particle.rotateSpeedY = Math.random() * 0.8 - 0.4
    particle.rotateSpeedZ = Math.random() * 0.8 - 0.4

    return particle
  }

  // 更新粒子运动状态
  private updateParticle(confetti: Mesh, particle: Particle, progress: number) {
    particle.destination.y -= MathUtils.randFloat(0.1, 0.3)

    const speedX = (particle.destination.x - particle.position.x) / 200
    const speedY = (particle.destination.y - particle.position.y) / 200
    const speedZ = (particle.destination.z - particle.position.z) / 200

    particle.position.x += speedX
    particle.position.y += speedY
    particle.position.z += speedZ

    particle.rotation.y += particle.rotateSpeedY
    particle.rotation.x += particle.rotateSpeedX
    particle.rotation.z += particle.rotateSpeedZ

    const material = particle.material as MeshBasicMaterial
    material.opacity = 1 - progress

    if (particle.position.y < -this.fallingHeight) {
      material.dispose()
      particle.geometry.dispose()
      confetti.remove(particle)
      particle = null as any
    }
  }
}

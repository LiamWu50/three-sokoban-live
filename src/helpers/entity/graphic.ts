import gsap from 'gsap'
import { Mesh } from 'three'

export default class Graphic {
  public mesh: Mesh
  public option: { size: number; number: number }

  constructor(mesh: Mesh, option = { size: 1.5, number: 0.5 }) {
    this.mesh = mesh
    mesh.castShadow = true
    mesh.receiveShadow = true

    this.option = option
  }

  get position() {
    return this.mesh.position
  }

  in() {
    gsap.from(this.mesh.scale, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
      ease: `elastic.out(${this.option.size}, ${this.option.number})`
    })
  }
}

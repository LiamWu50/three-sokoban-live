import { Mesh } from 'three'

export default class Graphic {
  public mesh: Mesh

  constructor(mesh: Mesh) {
    this.mesh = mesh
    mesh.castShadow = true
    mesh.receiveShadow = true
  }

  get position() {
    return this.mesh.position
  }
}

import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three'

import { WALL } from '@/common/constants'

import Graphic from './graphic'

export default class WallGraphic extends Graphic {
  constructor(color?: number | string) {
    const geometry = new IcosahedronGeometry(0.3)
    geometry.rotateX(Math.random() * Math.PI * 2)
    const material = new MeshStandardMaterial({
      color: '#d1d8e0',
      flatShading: true
    })
    const mesh = new Mesh(geometry, material)

    mesh.scale.set(1, 3, 1)
    mesh.rotation.y = Math.random() * Math.PI * 2
    mesh.rotation.x = Math.random() * Math.PI * 0.1
    mesh.rotation.order = 'YXZ'
    mesh.position.y = -0.5
    mesh.name = WALL

    if (color) {
      material.color.set(color)
    }

    super(mesh)
  }
}

import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three'

import { WALL } from '@/common/constants'

import Graphic from './graphic'

const WALL_GEOMETRY = new IcosahedronGeometry(0.3)
WALL_GEOMETRY.rotateX(Math.random() * Math.PI * 2)
const WALL_MATERIAL = new MeshStandardMaterial({
  color: '#d1d8e0',
  flatShading: true
})

export default class WallGraphic extends Graphic {
  constructor(color?: number | string) {
    const mesh = new Mesh(WALL_GEOMETRY, WALL_MATERIAL)
    mesh.scale.set(1, 3, 1)
    mesh.rotation.y = Math.random() * Math.PI * 2
    mesh.rotation.x = Math.random() * Math.PI * 0.1
    mesh.rotation.order = 'YXZ'
    mesh.position.y = -0.5
    mesh.name = WALL

    if (color) {
      WALL_MATERIAL.color.set(color)
    }

    super(mesh)
  }
}

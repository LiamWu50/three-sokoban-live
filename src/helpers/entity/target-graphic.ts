import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'

import { TARGET } from '@/common/constants'
import theme from '@/common/theme'

import Graphic from './graphic'

export default class TargetGraphic extends Graphic {
  constructor(color?: number | string) {
    const geometry = new SphereGeometry(0.3, 6, 6)
    const material = new MeshStandardMaterial({
      color: theme.target
    })
    const mesh = new Mesh(geometry, material)
    mesh.name = TARGET

    if (color) {
      material.color.set(color)
    }

    super(mesh)
  }
}

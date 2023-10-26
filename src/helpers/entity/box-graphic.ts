import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three'

import { BOX } from '@/common/constants'
import theme from '@/common/theme'

import Graphic from './graphic'

export default class BoxGraphic extends Graphic {
  constructor(color?: number | string) {
    const geometry = new IcosahedronGeometry(0.46, 0)
    const material = new MeshStandardMaterial({
      color: theme.box
    })
    const mesh = new Mesh(geometry, material)
    mesh.name = BOX

    if (color) {
      material.color.set(color)
    }

    super(mesh)
  }
}

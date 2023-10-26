import { Mesh, MeshStandardMaterial } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

import { BOX, colors } from '@/common/constants'

import Graphic from './graphic'

export default class BoxGraphic extends Graphic {
  constructor(color?: number | string) {
    const geometry = new RoundedBoxGeometry(0.8, 0.8, 0.8, 5, 0.1)
    const material = new MeshStandardMaterial({
      color: colors.box
    })
    const mesh = new Mesh(geometry, material)
    mesh.name = BOX

    if (color) {
      material.color.set(color)
    }

    super(mesh)
  }
}

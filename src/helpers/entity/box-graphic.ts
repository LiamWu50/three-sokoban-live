import { Mesh, MeshStandardMaterial } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

import { BOX, colors } from '@/common/constants'

import Graphic from './graphic'

export default class BoxGraphic extends Graphic {
  constructor(color?: number | string) {
    const BOX_GEOMETRY = new RoundedBoxGeometry(0.8, 0.8, 0.8, 5, 0.1)
    const BOX_MATERIAL = new MeshStandardMaterial({
      color: colors.box
    })
    const mesh = new Mesh(BOX_GEOMETRY, BOX_MATERIAL)
    mesh.name = BOX

    if (color) {
      BOX_MATERIAL.color.set(color)
    }

    super(mesh)
  }
}

import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'

import { colors, TARGET } from '@/common/constants'

import Graphic from './graphic'

const TARGET_GEOMETRY = new SphereGeometry(0.3, 6, 6)
const TARGET_MATERIAL = new MeshStandardMaterial({
  color: colors.target
})

export default class TargetGraphic extends Graphic {
  constructor(color?: number | string) {
    const mesh = new Mesh(TARGET_GEOMETRY, TARGET_MATERIAL)
    mesh.name = TARGET

    if (color) {
      TARGET_MATERIAL.color.set(color)
    }

    super(mesh)
  }
}

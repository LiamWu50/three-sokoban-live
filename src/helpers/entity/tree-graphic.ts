import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three'

import { colors } from '@/common/constants'

import Graphic from './graphic'

const TREE_GEOMETRY = new IcosahedronGeometry(0.3)
TREE_GEOMETRY.rotateX(Math.random() * Math.PI * 2)
TREE_GEOMETRY.scale(0.6, 2.6, 0.6)
const TREE_MATERIAL = new MeshStandardMaterial({
  flatShading: true,
  color: colors.tree
})

export default class TreeGraphic extends Graphic {
  constructor() {
    const mesh = new Mesh(TREE_GEOMETRY, TREE_MATERIAL)
    mesh.scale.setScalar(0.6 + Math.random() * 0.6)
    mesh.rotation.y = Math.random() * Math.PI * 2

    super(mesh)
  }
}

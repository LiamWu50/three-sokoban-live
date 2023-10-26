import { CylinderGeometry, Mesh, MeshStandardMaterial } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

import theme from '@/common/theme'

import Graphic from './graphic'

export default class TreeGraphic extends Graphic {
  constructor() {
    const mesh = new Mesh()
    const treeGeometry = new CylinderGeometry(0.3, 0.2, 0.8, 4)
    const treeMaterial = new MeshStandardMaterial({
      flatShading: true,
      color: theme.tree
    })
    const tree = new Mesh(treeGeometry, treeMaterial)
    tree.position.y = 0.2
    tree.rotation.y = Math.PI / 4
    tree.castShadow = true
    tree.receiveShadow = true

    const trunkGeometry = new RoundedBoxGeometry(0.1, 0.3, 0.1, 5, 0.02)
    const trunkMaterial = new MeshStandardMaterial({
      flatShading: true,
      color: theme.trunk
    })
    const trunk = new Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = -0.35
    trunk.castShadow = true
    trunk.receiveShadow = true

    mesh.add(tree, trunk)
    mesh.scale.setScalar(0.6 + Math.random() * 0.6)
    mesh.rotation.y = Math.random() * Math.PI * 2

    super(mesh)
  }
}

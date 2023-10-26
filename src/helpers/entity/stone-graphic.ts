import { Mesh, MeshStandardMaterial, PolyhedronGeometry } from 'three'

import Graphic from './graphic'

export default class StoneGraphic extends Graphic {
  constructor() {
    const verticesOfCube = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
      -1, 1, 1
    ]

    const indicesOfFaces = [
      2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
      3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4
    ]

    const geometry = new PolyhedronGeometry(
      verticesOfCube,
      indicesOfFaces,
      0.26,
      1
    )

    const material = new MeshStandardMaterial({
      color: '#d1d8e0',
      flatShading: true
    })

    const mesh = new Mesh(geometry, material)

    super(mesh)
  }
}

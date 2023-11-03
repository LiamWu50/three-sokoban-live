import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

import { PLAYER } from '@/common/constants'
import theme from '@/common/theme'

import Graphic from './graphic'

export default class PlayerGraphic extends Graphic {
  constructor() {
    const NODE_GEOMETRY = new RoundedBoxGeometry(0.8, 0.8, 0.8, 5, 0.1)
    const NODE_MATERIAL = new MeshStandardMaterial({
      color: theme.player
    })
    const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL)
    mesh.name = PLAYER

    const leftEye = new Mesh(
      new SphereGeometry(0.16, 10, 10),
      new MeshStandardMaterial({
        color: 0xffffff
      })
    )
    leftEye.scale.z = 0.1
    leftEye.position.x = 0.2
    leftEye.position.y = 0.16
    leftEye.position.z = 0.46

    const leftEyeHole = new Mesh(
      new SphereGeometry(0.1, 100, 100),
      new MeshStandardMaterial({ color: 0x333333 })
    )

    leftEyeHole.position.z += 0.08
    leftEye.add(leftEyeHole)

    const rightEye = leftEye.clone()
    rightEye.position.x = -0.2

    const mouthMesh = new Mesh(
      new RoundedBoxGeometry(0.4, 0.15, 0.2, 5, 0.05),
      new MeshStandardMaterial({
        color: '#5f27cd'
      })
    )
    mouthMesh.position.x = 0.0
    mouthMesh.position.z = 0.4
    mouthMesh.position.y = -0.2

    mesh.add(leftEye, rightEye, mouthMesh)
    mesh.lookAt(mesh.position.clone().add(new Vector3(0, 0, 1)))

    super(mesh)
  }
}

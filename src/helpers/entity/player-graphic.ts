import { Group } from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import characterMaleUrl from '@/assets/gltf/character-male.gltf'
import { PLAYER } from '@/common/constants'

const gltfLoader = new GLTFLoader()

export default class PlayerGraphic {
  public mesh!: Group

  constructor() {}

  init() {
    return new Promise((resolve) => {
      gltfLoader.load(characterMaleUrl, (gltf: GLTF) => {
        this.mesh = gltf.scene
        this.mesh.name = PLAYER
        this.mesh.position.y = -0.5
        this.mesh.scale.set(0.5, 0.5, 0.5)
        this.mesh.traverse((child: any) => {
          if (child.castShadow) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        resolve(this.mesh)
      })
    })
  }
}

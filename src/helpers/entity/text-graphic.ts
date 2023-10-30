import { Mesh, MeshStandardMaterial } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import fontSrc from '@/assets/font/YouSheBiaoTiHei_Regular.json?url'
import theme from '@/common/theme'

import Graphic from './graphic'

const loader = new FontLoader()

export default class TextGraphic extends Graphic {
  private font: any

  constructor(level: number) {
    const mesh = new Mesh()

    loader.load(fontSrc, (loadedFont: any) => {
      this.font = loadedFont
      this.init(level)
    })

    super(mesh)
  }

  init(level: number) {
    const geometry = new TextGeometry(`关卡 ${level}`, {
      font: this.font,
      size: 1,
      height: 0.4,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5
    })
    geometry.center()

    const material = new MeshStandardMaterial({
      flatShading: true,
      color: theme.text
    })

    this.mesh.geometry = geometry
    this.mesh.material = material
  }
}

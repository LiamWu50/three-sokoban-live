import './styles/index.css'

import GameSceneCreator from '@/helpers/game-scene-creator'
import ThreeSceneCreator from '@/helpers/three-scene-creator'

const initScene = () => {
  const container = document.getElementById('container')
  ThreeSceneCreator.init(container as HTMLDivElement)

  const { scene, gridSize } = ThreeSceneCreator
  const gameSceneCreator = new GameSceneCreator(scene, gridSize)
  gameSceneCreator.render()
}

initScene()

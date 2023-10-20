import { useEffect, useRef } from 'react'

import GameSceneCreator from '@/helpers/game-scene-creator'
import ThreeSceneCreator from '@/helpers/three-scene-creator'

export default function Sokoban() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const gameSceneCreator = useRef<GameSceneCreator | null>(null)

  useEffect(() => {
    ThreeSceneCreator.init(containerRef.current as HTMLDivElement)
    const { scene, camera, gridSize } = ThreeSceneCreator
    gameSceneCreator.current = new GameSceneCreator(scene, camera, gridSize)
  }, [])

  return (
    <>
      <div className='w-full h-full' ref={containerRef}></div>
    </>
  )
}

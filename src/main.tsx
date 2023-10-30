import './styles/index.css'

import gsap from 'gsap'

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

// 添加按钮入场动画
const topBar = document.querySelector('.top-bar')
const topBarItems = document.querySelectorAll('.top-bar__item')

gsap.set(topBarItems, { y: 200, autoAlpha: 0 })

gsap.to(topBar, {
  opacity: 1,
  delay: 0.3,
  onComplete: () => {
    gsap.to(topBarItems, {
      duration: 1,
      y: 0,
      autoAlpha: 1,
      ease: 'elastic.out(1.2, 0.9)',
      stagger: {
        amount: 0.3
      }
    })
  }
})

// 绑定音乐控制按钮
let isSoundOn = false
const audio = document.getElementById('audio') as HTMLAudioElement
const soundCtrlBtn = document.getElementById('soundCtrl')
const soundCtrlImg = document.getElementById('soundCtrlImg') as HTMLImageElement

soundCtrlBtn?.addEventListener('click', () => {
  isSoundOn = !isSoundOn
  if (isSoundOn) audio.play()
  else audio.pause()
  soundCtrlImg.src = isSoundOn ? './music-note.svg' : './music-off.svg'
})

type Entity = {
  position: { x: number; y: number }
  moment: { x: number; y: number }
  speed: number
  deceleration: number
  radius: number
  color: number
  opacity: number
  isControllable: boolean
  isCamera: boolean
  isVisible: boolean
  controls: {
    up: string
    down: string
    left: string
    right: string
  }
  isPushable: boolean
  isRandomlyDashing: boolean
  isBullet: boolean
  timeLeft: number
  canShoot: boolean
  reload: number
  reloadTime: number
}

function back() {
  const entities: Entity[] = []

  // Camera
  entities.push({
    position: { x: 0, y: 0 },
    moment: { x: 0, y: 0 },
    speed: 5,
    deceleration: 0.75,
    radius: 32,
    color: 0x717173,
    opacity: 0.5,
    isControllable: true,
    isCamera: true,
    isVisible: true,
    controls: {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight',
    },
    isPushable: false,
    isRandomlyDashing: false,
    isBullet: false,
    timeLeft: 0,
    canShoot: false,
    reload: 0,
    reloadTime: 0,
  })

  // Player
  entities.push({
    position: { x: 1000, y: 500 },
    moment: { x: 0, y: 0 },
    speed: 2,
    deceleration: 0.75,
    radius: 32,
    color: 0x717173,
    opacity: 1,
    isControllable: true,
    isCamera: false,
    isVisible: true,
    controls: {
      up: 'z',
      down: 's',
      left: 'q',
      right: 'd',
    },
    isPushable: true,
    isRandomlyDashing: false,
    isBullet: false,
    timeLeft: 0,
    canShoot: true,
    reload: 40, // 40
    reloadTime: 0,
  })

  // Creatures
  for (let i = 0; i < 3; i++) {
    entities.push({
      position: {
        x: Math.random() * 2000,
        y: Math.random() * 1000,
      },
      moment: { x: 0, y: 0 },
      speed: 0,
      deceleration: 0.95,
      radius: 24,
      color: 0x717173,
      opacity: 1,
      isControllable: false,
      isCamera: false,
      isVisible: true,
      controls: { up: '', down: '', left: '', right: '' },
      isPushable: true,
      isRandomlyDashing: true,
      isBullet: false,
      timeLeft: 0,
      canShoot: false,
      reload: 0,
      reloadTime: 0,
    })
  }

  return entities
}

// export { back }

// import { entities } from './core.ts'

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
    up: boolean
    down: boolean
    left: boolean
    right: boolean
  }
  isPushable: boolean
  isRandomlyDashing: boolean
  isBullet: boolean
  timeLeft: number
  canShoot: boolean
  reload: number
  reloadTime: number
}

function initCanvas(canvas: HTMLCanvasElement) {
  // canvas = globalThis.document.createElement('canvas')
  // canvas.width = 0
  // canvas.height = 0
  // canvas.style = 'touch-action: none; cursor: inherit;'
  // canvas.style = 'cursor: default;'
  // canvas.style = 'image-rendering: pixelated; image-rendering: crisp-edges;'
  // canvas.style =
  //   'background-color: #50459b; max-width: 100%; max-height: 100%; image-rendering: pixelated;'
}

// function resize(e: UIEvent) {
//   canvas.width = globalThis.innerWidth
//   canvas.height = globalThis.innerHeight
// }

// function initContext() {
//   ctx = canvas.getContext('2d')!
// }

// const zero = globalThis.document.timeline.currentTime

// Encapsulated
// ctx: mutates
// entities: read-only
function animate(ctx: CanvasRenderingContext2D, entities: Entity[]) {
  // Background
  ctx.fillStyle = '#ebebe1'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Fill
  ctx.fillStyle = '#717173'
  // ctx.fillStyle = 'black'

  // Stroke
  ctx.strokeStyle = '#535354'
  ctx.lineWidth = 2

  for (const entity of entities) {
    // ctx.fillRect(
    //   Math.round(entity.position.x),
    //   Math.round(entity.position.y),
    //   entity.radius,
    //   entity.radius
    // )

    const x = entity.position.x
    const y = entity.position.y
    // const x = Math.round(entity.position.x)
    // const y = Math.round(entity.position.y)
    const radius = entity.radius

    // ctx.fillRect(x, y, radius, radius)

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    // ctx.arc(x, y, radius - ctx.lineWidth / 2, 0, 2 * Math.PI)
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
  }

  // globalThis.requestAnimationFrame(() => {
  //   animate(canvas, ctx)
  // })
}

// export { initCanvas, animate }

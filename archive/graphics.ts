import { Container, Graphics } from 'pixi.js'

type Entity = {
  position: { x: number; y: number }
  moment: { x: number; y: number }
  speed: number
  deceleration: number
  radius: number
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

const camera = {
  position: {
    x: 0,
    y: 0,
  },
}

function updateGraphics(
  clientGraphics: Graphics[],
  clientEntities: Entity[],
  world: Container
) {
  if (clientGraphics.length < clientEntities.length) {
    for (let i = clientGraphics.length; i < clientEntities.length; i++) {
      clientGraphics.push(
        new Graphics()
          .circle(0, 0, clientEntities[i].radius)
          // .rect(
          //   0 - entities[i].radius,
          //   0 - entities[i].radius,
          //   entities[i].radius * 2,
          //   entities[i].radius * 2
          // )
          .fill({
            // color: clientEntities[i].color,
            color: 0x717173,
            // alpha: entities[i].opacity,
            alpha: 1,
          })
          .stroke({ width: 2, color: 0x535354, alpha: 1 })
      )
      world.addChild(clientGraphics[i])
    }
  }

  if (clientGraphics.length > clientEntities.length) {
    for (let i = clientGraphics.length - 1; i >= clientEntities.length; i--) {
      world.removeChild(clientGraphics[i])
      clientGraphics[i].destroy()
      clientGraphics.splice(i, 1)
    }
  }

  for (let i = 0; i < clientEntities.length; i++) {
    clientGraphics[i].visible = clientEntities[i].isVisible
    const x = clientEntities[i].position.x - camera.position.x
    const y = clientEntities[i].position.y - camera.position.y
    // console.log(entities[i].position.x)

    clientGraphics[i].position.set(x, y)
    // graphics[i].rotation += 0.01 * Math.random()
  }
}

export { updateGraphics }

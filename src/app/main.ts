import { Entities } from './entities.ts'
import { Keyboard } from './keyboard.ts'
import { Canvas } from './canvas.ts'
import { Renderer } from './renderer.ts'
import { Animator } from './animator.ts'
import { Archetypes } from './archetypes.ts'

type ArchetypesData = {
  players: {
    controls: { up: boolean; down: boolean; left: boolean; right: boolean }[] // remove from here ?
    deceleration: number[]
    moment: { x: number; y: number }[]
    position: { x: number; y: number }[]
    radius: number[]
    speed: number[]
  }
  rocks: {
    deceleration: number[]
    moment: { x: number; y: number }[]
    position: { x: number; y: number }[]
    radius: number[]
  }
}

function main() {
  const archetypes: ArchetypesData = {
    players: {
      controls: [],
      deceleration: [],
      moment: [],
      position: [],
      radius: [],
      speed: [],
    },
    rocks: {
      deceleration: [],
      moment: [],
      position: [],
      radius: [],
    },
  }

  Archetypes.setArchetypes(archetypes)
  Archetypes.loadArchetypes()

  const entities: [unknown[], unknown[]] = [[], []]
  Entities.setEntities(entities)
  // Entities.load()

  // const player = entities[0][0]
  const playersControls = archetypes.players.controls
  // const player = archetypes.players.controls // Prefer this
  Keyboard.setEntity(playersControls)

  const canvas = globalThis.document.createElement('canvas')
  Canvas.set(canvas)

  const ctx = canvas.getContext('2d')!
  Renderer.setContext(ctx)
  // Renderer.setEntities(entities)
  Renderer.setArchetypes(archetypes)

  // const keydown = () => {}

  globalThis.addEventListener('keydown', Keyboard.keydown)
  globalThis.addEventListener('keyup', Keyboard.keyup)

  Canvas.resizeToScreen()

  globalThis.addEventListener('resize', (ev: UIEvent) => {
    Canvas.resizeToScreen()
  })

  globalThis.visualViewport!.addEventListener('resize', (ev: Event) => {
    // Canvas.resizeToScreen()
  })

  globalThis.visualViewport!.addEventListener('scroll', (ev: Event) => {
    Canvas.resizeToScreen()
  })

  const update = () => {
    // console.log(player)
    // console.log(archetypes.players.position[0])

    // Entities.update()
    Archetypes.updateAll()
    Renderer.animate() // <--- shapes borders don't collide ! only inside circle
  }
  Animator.setAnimate(update)
  globalThis.requestAnimationFrame(Animator.animate)

  // Append canvas to id=app rather than body ?
  globalThis.document.body.appendChild(canvas)

  function beforeunload(e: BeforeUnloadEvent) {
    // Show leaving confirmation
    // e.preventDefault() // Disabled for dev
  }
  globalThis.addEventListener('beforeunload', beforeunload)

  function contextmenu(e: PointerEvent) {
    // e.preventDefault() // Disabled for dev
  }
  globalThis.addEventListener('contextmenu', contextmenu)

  function wheel(e: WheelEvent) {
    // e.preventDefault() // Disabled for dev
  }
  globalThis.addEventListener('wheel', wheel, { passive: false })
}

export { main }

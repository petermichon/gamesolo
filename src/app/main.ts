import { Keyboard } from './keyboard.ts'
import { Canvas } from './canvas.ts'
import { Renderer } from './renderer.ts'
import { Animator } from './animator.ts'
import { Archetypes } from './archetypes.ts'
import { EntityInputs } from './entityinputs.ts'

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

export function main() {
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

  const keys: Record<string, boolean> = {}

  const canvas = globalThis.document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  // ---

  const players = archetypes.players.controls
  const entityInput = new EntityInputs(players, keys)

  Archetypes.setArchetypes(archetypes) // Decompose archetypes

  Keyboard.setEntity(keys)

  Canvas.set(canvas)

  Renderer.setContext(ctx)
  Renderer.setArchetypes(archetypes)

  // ---

  Archetypes.loadArchetypes()

  globalThis.addEventListener('keydown', (ev: KeyboardEvent) => {
    Keyboard.keydown(ev)
  })

  globalThis.addEventListener('keyup', (ev: KeyboardEvent) => {
    Keyboard.keyup(ev)
  })

  // ---

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
    // ---
    entityInput.update()
    Archetypes.updateAll() // Decompose archetypes
    // ---
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

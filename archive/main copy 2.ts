import { Entities } from './entities.ts'
import { Keyboard } from './keyboard.ts'
import { Canvas } from './canvas.ts'
import { Renderer } from './renderer.ts'
import { Animator } from './animator.ts'

function main() {
  const entities: [any[], any[]] = [[], []]
  Entities.setEntities(entities)
  Entities.load()

  const player = entities[0][0]
  Keyboard.setEntity(player)

  const canvas = globalThis.document.createElement('canvas')
  Canvas.set(canvas)
  Canvas.initCanvas()

  const ctx = canvas.getContext('2d')!
  Renderer.setContext(ctx)
  Renderer.setEntities(entities)

  globalThis.addEventListener('keydown', Keyboard.keydown)
  globalThis.addEventListener('keyup', Keyboard.keyup)

  Canvas.resizeToScreen()
  globalThis.addEventListener('resize', Canvas.resize)

  // Using this makes laptop pad zoom useless
  // globalThis.visualViewport!.addEventListener('resize', () => {
  //   console.log(globalThis.visualViewport!.scale)
  // })

  const update = () => {
    Entities.update()
    Renderer.animate()
  }
  Animator.setAnimate(update)
  globalThis.requestAnimationFrame(Animator.animate)

  globalThis.document.body.appendChild(canvas)

  function beforeunload(e: BeforeUnloadEvent) {
    // Show leaving confirmation
    // e.preventDefault() // Disabled for dev
  }
  globalThis.addEventListener('beforeunload', beforeunload)

  function contextmenu(e: PointerEvent) {
    // e.preventDefault() // Disabled for dev
  }
  document.addEventListener('contextmenu', contextmenu)

  // ---
  // Useless

  function touchmove(event: TouchEvent) {
    // console.log(event)
    // event.preventDefault()
  }
  globalThis.document.addEventListener('touchmove', touchmove)

  function wheel(e: WheelEvent) {
    if (e.ctrlKey) {
      // e.preventDefault()
    }
  }
  document.addEventListener('wheel', wheel, { passive: false })
  // ---
}

export { main }

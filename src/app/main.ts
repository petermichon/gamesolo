import { Keyboard } from './keyboard.ts'
import { Canvas } from './canvas.ts'
import { BackgroundRenderer } from './renderer.ts'
import { Animator } from './animator.ts'
import { EntityInputs } from './entityinputs.ts'
import { ControllableArch } from './controllablearch.ts'
import { PushableArch } from './pushablearch.ts'
import { BorderForce } from './borderforce.ts'
import { MomentArch } from './momentarch.ts'
import { PlayersLoader } from './playersloader.ts'
import { RocksLoader } from './rocksloader.ts'
import { VirtualCanvas } from './virtualcanvas.ts'
import { RocksRenderer } from './rocksrenderer.ts'
import { PlayersRenderer } from './playerrenderer.ts'

type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Radius = number
type Deceleration = number
type Speed = number
type Controls = { up: boolean; down: boolean; left: boolean; right: boolean }

type ArchetypesData = {
  players: {
    controls: Controls[] // remove from here ?
    deceleration: Deceleration[]
    moment: Moment[]
    position: Position[]
    radius: Radius[]
    speed: Speed[]
  }
  rocks: {
    deceleration: Deceleration[]
    moment: Moment[]
    position: Position[]
    radius: Radius[]
  }
}

type VCanvasData = {
  x: number
  y: number
  width: number
  height: number
  scale: number
}

export function main() {
  // Server data
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

  // ---
  // Client data

  const keys: Record<string, boolean> = {}

  const canvas = globalThis.document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const vCanvasData: VCanvasData = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: 0,
  }

  // ---

  const entityInput = new EntityInputs(
    keys /*read*/,
    archetypes.players.controls /*write*/
  )

  const controllablesObj = new ControllableArch(
    archetypes.players.controls /*read*/,
    archetypes.players.moment /*write*/,
    archetypes.players.speed /*read*/
  )

  const pushablesOjb = new PushableArch(
    archetypes.players.moment /*write*/,
    archetypes.players.position /*read*/,
    archetypes.players.radius /*read*/,
    archetypes.rocks.moment /*write*/,
    archetypes.rocks.position /*read*/,
    archetypes.rocks.radius /*read*/
  )

  const borderForce = new BorderForce(
    archetypes.players.position /*read*/,
    archetypes.rocks.position /*read*/,
    archetypes.players.moment /*write*/,
    archetypes.rocks.moment /*write*/
  )

  const momentObj = new MomentArch(
    archetypes.players.position /*read*/,
    archetypes.players.moment /*write*/,
    archetypes.players.deceleration /*read*/,
    archetypes.rocks.position /*read*/,
    archetypes.rocks.moment /*write*/,
    archetypes.rocks.deceleration /*read*/
  )

  const playersLoader = new PlayersLoader(archetypes.players /*write*/)
  const rocksLoader = new RocksLoader(archetypes.rocks /*write*/)

  // ---

  const keyboard = new Keyboard(keys /*write*/)

  const canvasObj = new Canvas(canvas /*write*/)

  const virtualCanvas = new VirtualCanvas(ctx /*read*/, vCanvasData /*write*/)

  const bgRenderer = new BackgroundRenderer(ctx /*write*/, vCanvasData /*read*/)

  const rocksRenderer = new RocksRenderer(ctx, archetypes.rocks, vCanvasData)

  const playersRenderer = new PlayersRenderer(
    ctx,
    archetypes.players,
    vCanvasData
  )

  // ---

  playersLoader.load()
  rocksLoader.load()

  globalThis.addEventListener('keydown', (ev: KeyboardEvent) => {
    keyboard.keydown(ev /*read*/)
  })

  globalThis.addEventListener('keyup', (ev: KeyboardEvent) => {
    keyboard.keyup(ev /*read*/)
  })

  // ---

  canvasObj.resizeToScreen()
  virtualCanvas.resize()

  globalThis.addEventListener('resize', (ev: UIEvent) => {
    canvasObj.resizeToScreen()
    virtualCanvas.resize()
  })

  globalThis.visualViewport!.addEventListener('resize', (ev: Event) => {
    // Canvas.resizeToScreen()
  })

  globalThis.visualViewport!.addEventListener('scroll', (ev: Event) => {
    canvasObj.resizeToScreen()
  })

  const update = () => {
    entityInput.update()
    // ---
    controllablesObj.updateControllable()
    pushablesOjb.updatePushable()
    borderForce.updateBorderForce()
    // ---
    momentObj.updateMoment()
    // ---
    bgRenderer.draw()
    rocksRenderer.draw()
    playersRenderer.draw()
  }
  const animator = new Animator(update)
  globalThis.requestAnimationFrame((time: DOMHighResTimeStamp) => {
    animator.animate(time)
  })

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

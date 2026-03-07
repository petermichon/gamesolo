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

export class BackgroundRenderer {
  private ctx: CanvasRenderingContext2D
  private vCanvasData: VCanvasData

  public constructor(ctx: CanvasRenderingContext2D, vCanvasData: VCanvasData) {
    this.ctx = ctx
    this.vCanvasData = vCanvasData
  }

  public draw() {
    const ctx = this.ctx
    // const archetypes = this.archetypes
    const vRCanvasX = this.vCanvasData.x
    const vRCanvasY = this.vCanvasData.y
    const rectWidth = this.vCanvasData.width
    const rectHeight = this.vCanvasData.height
    // const wScale = this.vCanvasData.scale

    ctx.globalAlpha = 1.0

    // Background
    ctx.fillStyle = '#c6c6c6' // #cccccc #cdbdbd #ebebe1
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Virtual Canvas
    ctx.fillStyle = '#cccccc' // #e0a6a7ff #717173
    ctx.fillRect(vRCanvasX, vRCanvasY, rectWidth, rectHeight)
  }
}

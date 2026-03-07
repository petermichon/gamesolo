type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Radius = number
type Deceleration = number

type Rocks = {
  deceleration: Deceleration[]
  moment: Moment[]
  position: Position[]
  radius: Radius[]
}

type VCanvasData = {
  x: number
  y: number
  width: number
  height: number
  scale: number
}

export class RocksRenderer {
  private ctx: CanvasRenderingContext2D
  private rocks: Rocks
  private vCanvasData: VCanvasData

  public constructor(
    ctx: CanvasRenderingContext2D,
    rocks: Rocks,
    vCanvasData: VCanvasData
  ) {
    this.ctx = ctx
    this.rocks = rocks
    this.vCanvasData = vCanvasData
  }

  public draw() {
    const vRCanvasX = this.vCanvasData.x
    const vRCanvasY = this.vCanvasData.y
    const wScale = this.vCanvasData.scale

    // #999999 #727272
    // #ffe869 #bfae4e
    // #fc7677 #bd5859
    // #768df7 #5869bd

    this.ctx.fillStyle = '#999999'
    this.ctx.strokeStyle = '#727272'

    this.ctx.lineWidth = 4 / wScale

    const n = this.rocks.position.length
    for (let i = 0; i < n; i++) {
      const x = vRCanvasX + this.rocks.position[i].x / wScale
      const y = vRCanvasY + this.rocks.position[i].y / wScale
      const radius = this.rocks.radius[i] / wScale
      this.drawCircle(x, y, radius)
    }
  }

  private drawCircle(x: number, y: number, radius: number) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.stroke() // <--- shapes borders don't collide ! only inside circle
    this.ctx.closePath()
  }

  private drawSquare(x: number, y: number, radius: number) {
    this.ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    this.ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2)
  }
}

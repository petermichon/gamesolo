type VCanvasData = {
  x: number
  y: number
  width: number
  height: number
  scale: number
  // Store ratio 16/9 here ?
}

export class VirtualCanvas {
  private ctx: CanvasRenderingContext2D /*read*/
  private vCanvas: VCanvasData /*write*/

  public constructor(ctx: CanvasRenderingContext2D, vCanvasData: VCanvasData) {
    this.ctx = ctx
    this.vCanvas = vCanvasData
  }

  public resize() {
    // Virtual Canvas
    // const aspectRatio = 1920 / 1080
    const aspectRatio = 16 / 9

    let rectWidth: number
    let rectHeight: number

    const someRatioIdk = this.ctx.canvas.width / this.ctx.canvas.height
    const isWider = someRatioIdk < aspectRatio

    // Calculate dimensions based on canvas aspect ratio
    //  isWider: Cropped
    // !isWider: Borders
    if (!isWider) {
      // Canvas is wider than 16:9, so height is the limiting factor
      rectHeight = this.ctx.canvas.height
      rectWidth = rectHeight * aspectRatio
    } else {
      // Canvas is taller than 16:9, so width is the limiting factor
      rectWidth = this.ctx.canvas.width
      rectHeight = rectWidth / aspectRatio
    }

    // Center the rectangle
    const vRCanvasX = (this.ctx.canvas.width - rectWidth) / 2
    const vRCanvasY = (this.ctx.canvas.height - rectHeight) / 2
    const vRCanvasWidth = rectWidth
    const vRCanvasHeight = rectHeight

    const wScale = 1920 / vRCanvasWidth
    // const hScale = 1080 / vRCanvasHeight

    this.vCanvas.x = vRCanvasX
    this.vCanvas.y = vRCanvasY
    this.vCanvas.width = vRCanvasWidth
    this.vCanvas.height = vRCanvasHeight
    this.vCanvas.scale = wScale
  }
}

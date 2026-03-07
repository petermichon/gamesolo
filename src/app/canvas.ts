export class Canvas {
  private canvas: HTMLCanvasElement /*write*/

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  // Works very well but seems to stretch pixels for weird pixelSize values
  public resizeToScreen() {
    const vp = globalThis.visualViewport! /*read*/
    const ratio = globalThis.devicePixelRatio /*read*/

    // ---

    // Settings
    const pixelSize = 1.0

    // pixelSize = pixelSize / vp.scale // Increase quality on trackpad zoom

    const width = Math.round(vp.width * ratio * vp.scale)
    const height = Math.round(vp.height * ratio * vp.scale)

    const canvasWidth = Math.ceil(width / pixelSize)
    const canvasHeight = Math.ceil(height / pixelSize)

    const styleWidth = (canvasWidth * pixelSize) / ratio
    const styleHeight = (canvasHeight * pixelSize) / ratio

    this.canvas.width = canvasWidth // - vp.pageLeft
    this.canvas.height = canvasHeight // - vp.pageTop
    this.canvas.style.width = `${styleWidth}px`
    this.canvas.style.height = `${styleHeight}px`
  }
}

abstract class Canvas {
  private static canvas: HTMLCanvasElement

  public static set(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  // Works very well but seems to stretch pixels for weird pixelSize values
  public static resizeToScreen() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio

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

    console.log(vp.scale)
  }
}

export { Canvas }

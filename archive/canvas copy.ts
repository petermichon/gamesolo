abstract class Canvas {
  private static canvas: HTMLCanvasElement

  public static set(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public static resizeToScreen() {
    // Doing a laptop pad zoom in + browser ctrl zoom in/out OR page refresh creates visual bugs.

    // Downscale resolution
    const vp = globalThis.visualViewport!

    {
      // const viewportWidth = vp.width * devicePixelRatio
      // const viewportHeight = vp.height * devicePixelRatio
      const viewportWidth = Math.round(vp.width * devicePixelRatio)
      const viewportHeight = Math.round(vp.height * devicePixelRatio) - 20
      this.canvas.width = viewportWidth
      this.canvas.height = viewportHeight

      // const width = Math.round(
      //   globalThis.document.documentElement.scrollWidth * devicePixelRatio
      // )
      // const height = Math.round(
      //   globalThis.document.documentElement.scrollHeight * devicePixelRatio
      // )
      // this.canvas.width = width
      // this.canvas.height = height

      // const width = Math.round(globalThis.innerWidth * devicePixelRatio)
      // const height = Math.round(globalThis.innerHeight * devicePixelRatio)
      // this.canvas.width = width
      // this.canvas.height = height
    }
  }

  public static resize(e: UIEvent) {
    Canvas.resizeToScreen()
  }

  public static initCanvas() {
    this.canvas.style.imageRendering = 'pixelated'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.display = 'block'
    // this.canvas.style.touchAction = 'none'
    // this.canvas.style.padding = '1em'
  }
}

export { Canvas }

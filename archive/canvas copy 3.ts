let lastPixelRatio = globalThis.devicePixelRatio

abstract class Canvas {
  private static canvas: HTMLCanvasElement

  public static set(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public static resizeToScreen() {
    {
      // Doing a laptop pad zoom in + browser ctrl zoom in/out OR page reload decreases quality.
      const vp = globalThis.visualViewport!
      const width = Math.round(vp.width * globalThis.devicePixelRatio)
      const height = Math.round(vp.height * globalThis.devicePixelRatio)

      // console.log(vp.width, vp.height)
      // console.log(globalThis.innerWidth, globalThis.innerHeight)

      const something =
        globalThis.innerWidth > Math.round(vp.width) ||
        globalThis.innerHeight > Math.round(vp.height)

      if (!something) {
        // this.canvas.width = width
        // this.canvas.height = height
      }
    }
    {
      const currentPixelRatio = globalThis.devicePixelRatio
      const isZoom = currentPixelRatio !== lastPixelRatio
      // console.log(isZoom ? 'Zoom' : 'Resize')
      lastPixelRatio = currentPixelRatio

      const vp = globalThis.visualViewport!
      const isPinchedZoom =
        globalThis.innerWidth > Math.round(vp.width) ||
        globalThis.innerHeight > Math.round(vp.height)

      if (!isZoom && !isPinchedZoom) {
        console.log('Resize!')

        const vp = globalThis.visualViewport!
        const width = Math.round(vp.width * globalThis.devicePixelRatio)
        const height = Math.round(vp.height * globalThis.devicePixelRatio)
        this.canvas.width = width
        this.canvas.height = height
      }
    }
  }

  public static resize(e: UIEvent) {
    Canvas.resizeToScreen()
  }

  public static initCanvas() {
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.display = 'block'
    this.canvas.style.imageRendering = 'pixelated'
    // this.canvas.style.touchAction = 'none'
    // this.canvas.style.padding = '1em'
  }
}

export { Canvas }

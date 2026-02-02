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
      // const width = globalThis.innerWidth
      // const height = globalThis.innerHeight

      const width = globalThis.document.documentElement.scrollWidth
      const height = globalThis.document.documentElement.scrollHeight
      console.log(width, height)

      // const viewportWidth = vp.width * devicePixelRatio
      // const viewportHeight = vp.height * devicePixelRatio
      const viewportWidth = Math.round(vp.width * devicePixelRatio)
      const viewportHeight = Math.round(vp.height * devicePixelRatio)
      // const viewportWidth = Math.round(width * devicePixelRatio)
      // const viewportHeight = Math.round(height * devicePixelRatio)
      const virtualWidth = vp.width
      const virtualHeight = vp.height
      // const virtualWidth = width
      // const virtualHeight = height

      this.canvas.width = viewportWidth
      this.canvas.height = viewportHeight
      // this.canvas.style.width = `${virtualWidth}px`
      // this.canvas.style.height = `${virtualHeight}px`
      // this.canvas.style.width = `${width}px`
      // this.canvas.style.height = `${height}px`
    }
    // {
    //   // Do width again in case the scrollbars left a white region (this is an issue on Chromium).
    //   const viewportWidth = vp.width * devicePixelRatio
    //   const viewportHeight = vp.height * devicePixelRatio
    //   const virtualWidth = vp.width
    //   const virtualHeight = vp.height

    //   this.canvas.width = viewportWidth
    //   this.canvas.height = viewportHeight
    //   this.canvas.style.width = `${virtualWidth}px`
    //   this.canvas.style.height = `${virtualHeight}px`
    // }
    // console.log(
    //   Math.round(vp.width * devicePixelRatio),
    //   Math.round(vp.height * devicePixelRatio)
    // )
  }

  public static resize(e: UIEvent) {
    Canvas.resizeToScreen()
  }

  public static initCanvas() {
    this.canvas.style.imageRendering = 'pixelated'
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    // this.canvas.style.touchAction = 'none'
    // this.canvas.style.padding = '1em'
  }
}

export { Canvas }

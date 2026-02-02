abstract class Canvas {
  private static canvas: HTMLCanvasElement

  public static set(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public static resizeToScreen() {
    // Using viewport size
    {
      // Doing a laptop pad zoom in + browser ctrl zoom in/out OR page reload decreases quality.
      const vp = globalThis.visualViewport!
      const width = Math.round(vp.width * globalThis.devicePixelRatio)
      const height = Math.round(vp.height * globalThis.devicePixelRatio)
      // this.canvas.width = width
      // this.canvas.height = height
      console.log(vp.width, vp.height)
    }

    // Using window size
    {
      // Browser ctrl zoom in/out creates pixel stretching
      // const width = globalThis.innerWidth
      // const height = globalThis.innerHeight
      const width = globalThis.innerWidth * globalThis.devicePixelRatio
      const height = globalThis.innerHeight * globalThis.devicePixelRatio
      // const width = Math.round(
      //   globalThis.innerWidth * globalThis.devicePixelRatio
      // )
      // const height = Math.round(
      //   globalThis.innerHeight * globalThis.devicePixelRatio
      // )
      // this.canvas.width = width
      // this.canvas.height = height
      // console.log(globalThis.innerWidth, globalThis.innerHeight)
      console.log(globalThis.innerWidth, globalThis.innerHeight)
      console.log(
        globalThis.innerWidth + ((1 / globalThis.devicePixelRatio) % 1),
        globalThis.innerHeight + ((1 / globalThis.devicePixelRatio) % 1)
      )
      // console.log(
      //   globalThis.innerWidth % globalThis.devicePixelRatio,
      //   globalThis.innerHeight % globalThis.devicePixelRatio
      // )
      console.log(globalThis.devicePixelRatio)

      console.log('')
    }
    {
      const width =
        document.documentElement.clientWidth * globalThis.devicePixelRatio
      const height =
        document.documentElement.clientHeight * globalThis.devicePixelRatio
      // this.canvas.width = width
      // this.canvas.height = height
      // console.log(width, height)
    }
    {
      const width = Math.round(
        globalThis.innerWidth * globalThis.devicePixelRatio +
          ((1 / globalThis.devicePixelRatio) % 1)
      )

      const height = Math.round(
        globalThis.innerHeight * globalThis.devicePixelRatio +
          ((1 / globalThis.devicePixelRatio) % 1)
      )
      this.canvas.width = width
      this.canvas.height = height
      // console.log(width, height)
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

abstract class Canvas {
  private static canvas: HTMLCanvasElement

  public static set(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  // Move and resize canvas to only what's visible
  public static resizeToScreen() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio

    // Settings
    // deno-lint-ignore prefer-const
    let pixelSize = 1.0

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

  // Tried using scale but seems weird
  public static resizeToScreenV4_5() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio

    // Settings
    let pixelSize = 1.0

    pixelSize = pixelSize / vp.scale // Increase quality on trackpad zoom

    const width = Math.round(vp.width * ratio * vp.scale)
    const height = Math.round(vp.height * ratio * vp.scale)

    const canvasWidth = Math.ceil(width / pixelSize)
    const canvasHeight = Math.ceil(height / pixelSize)

    const styleWidth = (canvasWidth * pixelSize) / ratio
    const styleHeight = (canvasHeight * pixelSize) / ratio

    this.canvas.width = vp.width
    this.canvas.height = vp.height
    // this.canvas.style.width = `${styleWidth}px`
    // this.canvas.style.height = `${styleHeight}px`
    // this.canvas.getContext('2d')?.scale(2, 2)

    // const r = Math.round(1 / ratio)

    // Move and resize canvas to only what's visible
    // console.log(vp.pageLeft, vp.pageTop)
  }

  // Excellent, last thing needed is trackpad zoom to be optimised
  public static resizeToScreenV4() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio

    // Settings
    let pixelSize = 1.0

    pixelSize = pixelSize / vp.scale // Increase quality on trackpad zoom

    const width = Math.round(vp.width * ratio * vp.scale)
    const height = Math.round(vp.height * ratio * vp.scale)

    const canvasWidth = Math.ceil(width / pixelSize)
    const canvasHeight = Math.ceil(height / pixelSize)

    const styleWidth = (canvasWidth * pixelSize) / ratio
    const styleHeight = (canvasHeight * pixelSize) / ratio

    this.canvas.width = canvasWidth
    this.canvas.height = canvasHeight
    this.canvas.style.width = `${styleWidth}px`
    this.canvas.style.height = `${styleHeight}px`

    // this.canvas.getContext('2d')?.scale(1 / ratio, 1 / ratio)

    // Move and resize canvas to only what's visible
    // console.log(vp.pageLeft, vp.pageTop)
  }

  // Almost perfect, doesn't work with trackpad zoom quality increase. Also, can probably be simplified
  public static resizeToScreenV3() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio

    // Settings
    const qualityVal = 1
    // deno-lint-ignore prefer-const
    let quality = 1 / qualityVal
    const fit = true // If pixels should be stretched to fit the canvas

    // quality *= vp.scale // Increase quality on trackpad zoom

    let width = Math.round(vp.width * ratio * vp.scale)
    let height = Math.round(vp.height * ratio * vp.scale)

    // Quality
    width = Math.ceil(width * quality)
    height = Math.ceil(height * quality)

    this.canvas.width = width
    this.canvas.height = height
    const invRatio = 1 / ratio
    this.canvas.style.width = `${width * qualityVal * invRatio}px`
    this.canvas.style.height = `${height * qualityVal * invRatio}px`

    // this.canvas.getContext('2d')?.scale(1 / ratio, 1 / ratio)

    // console.log(Math.round(Math.round(vp.height * ratio * vp.scale) * quality))
    // console.log(vp.width * vp.scale)

    // Move and resize canvas to only what's visible
    // console.log(vp.pageLeft, vp.pageTop)
  }

  // Almost perfect, stretches pixels to fit the screen
  public static resizeToScreenV2() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio

    // Settings
    // deno-lint-ignore prefer-const
    let quality = 1 / 128
    const fit = true // If pixels should be stretched to fit the canvas

    // quality *= vp.scale // Scale quality based on zoom

    const width = Math.round(Math.round(vp.width * ratio * vp.scale) * quality)
    // prettier-ignore
    const height = 
      Math.round(Math.round(vp.height * ratio * vp.scale) * quality)
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.width = `${width * vp.scale}px`
    this.canvas.style.height = `${height * vp.scale}px`

    // this.canvas.getContext('2d')?.scale(1 / ratio, 1 / ratio)

    // console.log(Math.round(Math.round(vp.height * ratio * vp.scale) * quality))
    // console.log(vp.width * vp.scale)

    // Move and resize canvas to only what's visible
    // console.log(vp.pageLeft, vp.pageTop)
  }

  // Previous version that works great but doesn't support quality setting
  public static resizeToScreenV1() {
    const vp = globalThis.visualViewport!
    const ratio = globalThis.devicePixelRatio
    const width = Math.round(vp.width * ratio * vp.scale)
    const height = Math.round(vp.height * ratio * vp.scale)
    this.canvas.width = width
    this.canvas.height = height
  }

  public static initCanvas() {
    // this.canvas.style.width = '100%'
    // this.canvas.style.height = '100%'
    // this.canvas.style.display = 'block'
    // this.canvas.style.imageRendering = 'pixelated'
  }

  // Previous version that works great but doesn't support quality setting
  public static initCanvasV1() {
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.display = 'block'
    this.canvas.style.imageRendering = 'pixelated'
    // this.canvas.style.touchAction = 'none'
    // this.canvas.style.padding = '1em'
  }
}

export { Canvas }

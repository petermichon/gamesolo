abstract class Canvas {
  private static canvas: HTMLCanvasElement

  public static set(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public static resizeToScreen() {
    {
      /* 
      Problem

      While zooming in using pinch-to-zoom, doing either a browser page zooming in/out or a page reload causes a decrease in the canvas rendering quality.
      This is a minor issue.

      Reason

      This happens because the visualViewport dimensions are affected by pinch-to-zoom. Zooming in reduces the dimensions of the viewport, which lowers the dimensions of the canvas, which causes the decrease in quality.

      Possibilities

      Using innerWidth/innerHeight dimensions instead of the viewport does prevent the issue with pinch-to-zoom, but it has less precision in terms of subpixels which leads to pixel stretching and the canvas being smaller than the screen.

      With some techniques, it is possible to differentiate between browser page zoom, pinch-to-zoom and screen resize. This allows to not resize the screen and thus not causing the issue during pinch-to-zoom. Unfortunately, this means not resizing at all during pinch-to-zoom, which can lead to situations where the canvas is smaller than the page.

      Fundamentally, the fact that visualViewport is affected by the pinch-to-zoom means that feature is not independant from the page. If the feature is meant to be like a magnifying glass, then it shouldn't affect the page, and this viewport dimensions shouldn't be affected by it. But also it can be argued that the viewport needs that information in case it needs to use computational power to increase the resolution of the exact region that is being zoomed in.

      What is needed is another global read-only dimensions, similar to innerW/H or visualVewport.w/h which have both the subpixel precision of the viewport and isn't affected by pinch-to-zoom.

      The best solution would be direct access to global dimensions, similar to innerW/H or visualViewport.w/h with the following properties:
      - Have subpixel precision like visualViewport.w/h.
      - Dimensions only changes on browser resize and browser page zoom. Never from pinch-to-zoom, like innerW/H.

      With such feature, the browser page zoom is fully taken into account for responsive page layouts, pinch-to-zoom has no effect on the page layout while still allowing you to zoom, which i believe is the correct approach.

      It would also be possible with the following properties:
      - Dimensions only changes on browser resize. Never from browser page zoom. Never from pinch-to-zoom, like innerW/H.
      The code would be simpler but at the cost of ignoring browser page zoom, which means allowing none responsive design, which i don't believe is good browser design.
      
      Conclusion

      Currently, there's no good solution to this problem. All possibilities have compromises, and the theoretical best solution is a browser feature that is not available.

      Until that feature is implemented, we'll use the viewport method which is simple and good enough.
      */

      const vp = globalThis.visualViewport!
      const width = Math.round(
        vp.width * globalThis.devicePixelRatio * vp.scale
      )
      const height = Math.round(
        vp.height * globalThis.devicePixelRatio * vp.scale
      )

      console.log(vp.width, vp.height)
      console.log(globalThis.innerWidth, globalThis.innerHeight)

      this.canvas.width = width
      this.canvas.height = height
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

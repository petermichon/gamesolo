export class Animator {
  private update: () => void /*read*/

  public constructor(update: () => void) {
    this.update = update
  }

  public animate(timestamp: DOMHighResTimeStamp) {
    this.update()

    const callback = (time: DOMHighResTimeStamp) => {
      this.animate(time)
    }
    globalThis.requestAnimationFrame(callback)
  }
}

export abstract class Animator {
  private static update: (timestamp: number) => void

  // ---
  private static lastTime: number = 0
  private static fps: number = 0
  // ---

  public static setAnimate(update: (timestamp: number) => void) {
    Animator.update = update
  }

  public static animate(timestamp: number) {
    // ---
    // const now = performance.now()
    // const delta = now - Animator.lastTime
    // Animator.lastTime = now
    // const thisFrameFPS = 1000 / delta
    // const fpsFilter = 5 // 5
    // Animator.fps += (thisFrameFPS - Animator.fps) / fpsFilter // Low-pass filter
    // console.log(Animator.fps.toFixed(0))
    // ---

    // ---
    // const now = performance.now()
    // const fps = 1000 / (now - Animator.lastTime)
    // Animator.lastTime = now
    // console.log(fps.toFixed(0))
    // ---

    Animator.update(timestamp)

    globalThis.requestAnimationFrame(Animator.animate)
  }

  // public static startUpdateLoop() {
  //   const targetFps = 60
  //   const frameTime = 1000 / targetFps

  //   const now = performance.now()
  //   const deltaTime = now - Updater.lastTime

  //   if (deltaTime >= frameTime) {
  //     // const fps = Math.round(targetFps / (deltaTime / frameTime))
  //     // const fps = Math.round(1000 / deltaTime)
  //     // console.log(fps)

  //     Updater.update()

  //     // Correct for drift
  //     Updater.lastTime = now - (deltaTime % frameTime)
  //   }

  //   setTimeout(Updater.startUpdateLoop, Math.max(0, frameTime - deltaTime))
  // }
}

// type AnimateFn = (timestamp: number) => void

// function newAnimationCallback(update: AnimateFn): AnimateFn {
//   const callback = (timestamp: number) => {
//     update(timestamp)
//     globalThis.requestAnimationFrame(callback)
//   }
//   return callback
// }

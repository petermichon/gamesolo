type Moment = { x: number; y: number }
type Speed = number
type Controls = { up: boolean; down: boolean; left: boolean; right: boolean }

export class ControllableArch {
  private controls: Controls[]
  private moments: Moment[]
  private speeds: Speed[]

  public constructor(controls: Controls[], moments: Moment[], speeds: Speed[]) {
    this.controls = controls
    this.moments = moments
    this.speeds = speeds
  }

  public updateControllable() {
    const n = this.speeds.length // controls moments speeds
    for (let i = 0; i < n; i++) {
      const up = this.controls[i].up
      const left = this.controls[i].left
      const down = this.controls[i].down
      const right = this.controls[i].right

      let dx = (right ? 1 : 0) - (left ? 1 : 0)
      let dy = (down ? 1 : 0) - (up ? 1 : 0)

      const len = Math.hypot(dx, dy)
      const isMoving = len !== 0
      if (isMoving) {
        // normalize (diagonal becomes length 1)
        dx /= len
        dy /= len
        this.moments[i].x += dx * this.speeds[i] // * deltaTime
        this.moments[i].y += dy * this.speeds[i] // * deltaTime
      }
    }
  }
}

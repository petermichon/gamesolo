type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Radius = number
type Deceleration = number

type Rocks = {
  deceleration: Deceleration[]
  moment: Moment[]
  position: Position[]
  radius: Radius[]
}

export class RocksLoader {
  private rocks: Rocks

  public constructor(rocks: Rocks) {
    this.rocks = rocks
  }

  public load() {
    // 60fps at 500-520 after ~10s
    // 30-35fps at 1000 after ~10s

    // 60fps at 1100 after ~10s
    // 28-32fps at 2500 after ~10s
    const n = 100
    for (let i = 0; i < n; i++) {
      this.rocks.position[i] = {
        x: 1920 * Math.random(),
        y: 1080 * Math.random(),
      }

      this.rocks.deceleration[i] = 0.95 // 0.95
      this.rocks.moment[i] = { x: 0, y: 0 }
      this.rocks.radius[i] = 24 // 24
    }
  }
}

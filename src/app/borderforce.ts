type Moment = { x: number; y: number }
type Position = { x: number; y: number }

export class BorderForce {
  private playersPosition: Position[]
  private rocksPosition: Position[]

  private playersMoment: Moment[]
  private rocksMoment: Moment[]

  public constructor(
    playersPosition: Position[],
    rocksPosition: Position[],
    playersMoment: Moment[],
    rocksMoment: Moment[]
  ) {
    this.playersPosition = playersPosition
    this.rocksPosition = rocksPosition
    this.playersMoment = playersMoment
    this.rocksMoment = rocksMoment
  }

  public updateBorderForce() {
    const positions = [...this.playersPosition, ...this.rocksPosition]
    const moments = [...this.playersMoment, ...this.rocksMoment]
    this.updateBorderForcePriv(positions, moments)
  }

  private updateBorderForcePriv(
    positions: { x: number; y: number }[],
    moments: { x: number; y: number }[]
  ) {
    const force = 1.5
    const n = moments.length // positions moments
    for (let i = 0; i < n; i++) {
      if (positions[i].x < 0) {
        moments[i].x += force
      }
      if (positions[i].x > 1920) {
        moments[i].x += -force
      }
      if (positions[i].y < 0) {
        moments[i].y += force
      }
      if (positions[i].y > 1080) {
        moments[i].y += -force
      }
    }
  }
}

type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Deceleration = number

export class MomentArch {
  private playersPosition: Position[]
  private playersMoment: Moment[]
  private playersDeceleration: Deceleration[]
  private rocksPosition: Position[]
  private rocksMoment: Moment[]
  private rocksDeceleration: Deceleration[]

  public constructor(
    playersPosition: Position[],
    playersMoment: Moment[],
    playersDeceleration: Deceleration[],
    rocksPosition: Position[],
    rocksMoment: Moment[],
    rocksDeceleration: Deceleration[]
  ) {
    this.playersPosition = playersPosition
    this.playersMoment = playersMoment
    this.playersDeceleration = playersDeceleration
    this.rocksDeceleration = rocksDeceleration
    this.rocksMoment = rocksMoment
    this.rocksPosition = rocksPosition
  }

  public updateMoment() {
    const positions = this.playersPosition.concat(this.rocksPosition)
    const moments = this.playersMoment.concat(this.rocksMoment)
    const decelerations = this.playersDeceleration.concat(
      this.rocksDeceleration
    )

    // ---

    const n = positions.length // decelerations moments positions
    for (let i = 0; i < n; i++) {
      positions[i].x += moments[i].x
      positions[i].y += moments[i].y
      moments[i].x *= decelerations[i]
      moments[i].y *= decelerations[i]
    }
  }
}

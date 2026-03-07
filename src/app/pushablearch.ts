type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Radius = number

type Pushables = {
  moment: Moment[]
  position: Position[]
  radius: Radius[]
}

export class PushableArch {
  private playerMoment: Moment[]
  private playerPosition: Position[]
  private playerRadius: Radius[]
  private rockMoment: Moment[]
  private rockPosition: Position[]
  private rockRadius: Radius[]

  public constructor(
    playerMoment: Moment[],
    playerPosition: Position[],
    playerRadius: Radius[],
    rockMoment: Moment[],
    rockPosition: Position[],
    rockRadius: Radius[]
  ) {
    this.playerMoment = playerMoment
    this.playerPosition = playerPosition
    this.playerRadius = playerRadius
    this.rockMoment = rockMoment
    this.rockPosition = rockPosition
    this.rockRadius = rockRadius
  }

  public updatePushable() {
    const pushables = {
      moment: [...this.playerMoment, ...this.rockMoment],
      position: [...this.playerPosition, ...this.rockPosition],
      radius: [...this.playerRadius, ...this.rockRadius],
    }
    this.updatePushablePriv(pushables)
  }

  private updatePushablePriv(e: Pushables) {
    const n = e.radius.length // moment position radius
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const selfInteracting = j === i
        if (selfInteracting) {
          continue
        }

        let x = 0
        let y = 0

        const dx = e.position[i].x - e.position[j].x
        const dy = e.position[i].y - e.position[j].y

        const distance = Math.sqrt(dx ** 2 + dy ** 2)
        const sumRadiuses = e.radius[i] + e.radius[j]
        const intersect = distance <= sumRadiuses
        if (intersect) {
          const angle = Math.atan2(dy, dx)
          x = Math.cos(angle)
          y = Math.sin(angle)
        }

        const superposed = dx === 0 && dy === 0
        if (superposed) {
          x = Math.random() - 0.5
          y = Math.random() - 0.5
        }

        e.moment[i].x += x
        e.moment[i].y += y

        // const angle = Math.atan2(dy, dx)
        // e.moment[i].x += Math.cos(angle)
        // e.moment[i].y += Math.sin(angle)
      }
    }
  }
}

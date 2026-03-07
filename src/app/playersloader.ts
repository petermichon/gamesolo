type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Radius = number
type Deceleration = number
type Speed = number
type Controls = { up: boolean; down: boolean; left: boolean; right: boolean }

type Players = {
  controls: Controls[] // remove from here ?
  deceleration: Deceleration[]
  moment: Moment[]
  position: Position[]
  radius: Radius[]
  speed: Speed[]
}

export class PlayersLoader {
  private players: Players

  public constructor(players: Players) {
    this.players = players
  }

  public load() {
    for (let i = 0; i < 1; i++) {
      this.players.controls[i] = {
        up: false,
        down: false,
        left: false,
        right: false,
      }
      this.players.deceleration[i] = 0.75 // 0.75
      this.players.moment[i] = { x: 0, y: 0 }
      const x = 1920 / 2 + i * 100
      const y = 1080 / 2
      this.players.position[i] = { x, y }
      this.players.radius[i] = 30 // 30 37
      this.players.speed[i] = 1.5 // 1.5 4.5 6.0
    }
  }
}

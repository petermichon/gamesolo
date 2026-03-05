type Moment = { x: number; y: number }
type Position = { x: number; y: number }
type Radius = number
type Deceleration = number
type Speed = number
type Controls = { up: boolean; down: boolean; left: boolean; right: boolean }

type Pushables = {
  moment: Moment[]
  position: Position[]
  radius: Radius[]
}

type ArchetypesData = {
  players: {
    controls: Controls[] // remove from here ?
    deceleration: Deceleration[]
    moment: Moment[]
    position: Position[]
    radius: Radius[]
    speed: Speed[]
  }
  rocks: {
    deceleration: Deceleration[]
    moment: Moment[]
    position: Position[]
    radius: Radius[]
  }
}

// Split this class in multiple classes for each archetype ?
abstract class ArchetypesClass {
  private static archetypes: ArchetypesData

  public static setArchetypes(archetypes: any) {
    this.archetypes = archetypes
  }

  public static loadArchetypes() {
    for (let i = 0; i < 1; i++) {
      this.archetypes.players.controls[i] = {
        up: false,
        down: false,
        left: false,
        right: false,
      }
      this.archetypes.players.deceleration[i] = 0.75 // 0.75
      this.archetypes.players.moment[i] = { x: 0, y: 0 }
      const x = 1920 / 2 + i * 100
      const y = 1080 / 2
      this.archetypes.players.position[i] = { x, y }
      this.archetypes.players.radius[i] = 29 // 29
      this.archetypes.players.speed[i] = 1.5 // 1.5 4.5 6.0
    }

    // 60fps at 500-520 after ~10s
    // 30-35fps at 1000 after ~10s

    // 60fps at 1100 after ~10s
    // 28-32fps at 2500 after ~10s
    for (let i = 0; i < 100; i++) {
      this.archetypes.rocks.position[i] = {
        x: 1920 * Math.random(),
        y: 1080 * Math.random(),
      }

      this.archetypes.rocks.deceleration[i] = 0.95 // 0.95
      this.archetypes.rocks.moment[i] = { x: 0, y: 0 }
      this.archetypes.rocks.radius[i] = 24 // 24
    }
  }

  public static updateAll() {
    ArchetypesClass.updateControllable(
      this.archetypes.players.controls,
      this.archetypes.players.moment,
      this.archetypes.players.speed
    )

    ArchetypesClass.updatePushable({
      moment: [
        ...this.archetypes.players.moment,
        ...this.archetypes.rocks.moment,
      ],
      position: [
        ...this.archetypes.players.position,
        ...this.archetypes.rocks.position,
      ],
      radius: [
        ...this.archetypes.players.radius,
        ...this.archetypes.rocks.radius,
      ],
    })

    ArchetypesClass.updateBorderForce(
      [...this.archetypes.players.position, ...this.archetypes.rocks.position],
      [...this.archetypes.players.moment, ...this.archetypes.rocks.moment]
    )

    // updateMoment(
    //   [
    //     ...this.archetypes.players.deceleration,
    //     ...this.archetypes.rocks.deceleration,
    //   ],
    //   [...this.archetypes.players.moment, ...this.archetypes.rocks.moment],
    //   [...this.archetypes.players.position, ...this.archetypes.rocks.position]
    // )

    ArchetypesClass.updateMoment()
  }

  public static updateControllable(
    controls: { up: boolean; left: boolean; down: boolean; right: boolean }[],
    moments: { x: number; y: number }[],
    speeds: number[]
  ) {
    const n = speeds.length // controls moments speeds
    for (let i = 0; i < n; i++) {
      const up = controls[i].up
      const left = controls[i].left
      const down = controls[i].down
      const right = controls[i].right

      let dx = (right ? 1 : 0) - (left ? 1 : 0)
      let dy = (down ? 1 : 0) - (up ? 1 : 0)

      const len = Math.hypot(dx, dy)
      const isMoving = len !== 0
      if (isMoving) {
        // normalize (diagonal becomes length 1)
        dx /= len
        dy /= len
        moments[i].x += dx * speeds[i] // * deltaTime
        moments[i].y += dy * speeds[i] // * deltaTime
      }
    }
  }

  public static updatePushable(e: Pushables) {
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

  public static updateBorderForce(positions: any, moments: any) {
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

  public static updateMoment() {
    const positions = ArchetypesClass.archetypes.players.position.concat(
      ArchetypesClass.archetypes.rocks.position
    )
    const moments = ArchetypesClass.archetypes.players.moment.concat(
      ArchetypesClass.archetypes.rocks.moment
    )
    const decelerations =
      ArchetypesClass.archetypes.players.deceleration.concat(
        ArchetypesClass.archetypes.rocks.deceleration
      )
    const n = positions.length // decelerations moments positions
    for (let i = 0; i < n; i++) {
      positions[i].x += moments[i].x
      positions[i].y += moments[i].y
      moments[i].x *= decelerations[i]
      moments[i].y *= decelerations[i]
    }
  }

  // type Moments = {
  //   decelerations: number[]
  //   moment: [x: number, y: number][]
  //   position: [x: number, y: number][]
  // }

  // function updateMoment(
  //   decelerations: number[],
  //   moments: [x: number, y: number][],
  //   positions: [x: number, y: number][]
  // ) {
  //   // for (const i in decelerations) {
  //   // for (const i in moments) {
  //   for (const i in positions) {
  //     positions[i][0] += moments[i][0]
  //     positions[i][1] += moments[i][1]
  //     moments[i][0] *= decelerations[i]
  //     moments[i][1] *= decelerations[i]
  //   }
  // }
}

export { ArchetypesClass as Archetypes }

type Pushables = {
  moment: { x: number; y: number }[]
  position: { x: number; y: number }[]
  radius: number[]
}

type ArchetypesData = {
  players: {
    controls: { up: boolean; down: boolean; left: boolean; right: boolean }[] // remove from here ?
    deceleration: number[]
    moment: { x: number; y: number }[]
    position: { x: number; y: number }[]
    radius: number[]
    speed: number[]
  }
  rocks: {
    deceleration: number[]
    moment: { x: number; y: number }[]
    position: { x: number; y: number }[]
    radius: number[]
  }
}

// Split this class in multiple classes for each archetype ?
abstract class Archetypes {
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
      this.archetypes.players.deceleration[i] = 0.75 // 0.0 0.75
      this.archetypes.players.moment[i] = { x: 0, y: 0 }
      const x = 1920 / 2 + i * 100
      const y = 1080 / 2
      this.archetypes.players.position[i] = { x, y }
      this.archetypes.players.radius[i] = 29 // 32
      this.archetypes.players.speed[i] = 1.5 // 1.5 4.5 6.0
    }

    // 60fps at 500-520 after ~10s
    // 30-35fps at 1000 after ~10s
    for (let i = 0; i < 100; i++) {
      this.archetypes.rocks.position[i] = {
        x: Math.random() * 1920,
        y: Math.random() * 1080,
      }

      this.archetypes.rocks.deceleration[i] = 0.95 // 0.0 0.75
      this.archetypes.rocks.moment[i] = { x: 0, y: 0 }
      this.archetypes.rocks.radius[i] = 24 // 32
    }
  }

  public static updateAll() {
    Archetypes.updateControllable(
      this.archetypes.players.controls,
      this.archetypes.players.moment,
      this.archetypes.players.speed
    )

    Archetypes.updatePushable({
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

    Archetypes.updateBorderForce(
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

    Archetypes.updateMoment()
  }

  public static updateMoment() {
    const positions = Archetypes.archetypes.players.position.concat(
      Archetypes.archetypes.rocks.position
    )
    const moments = Archetypes.archetypes.players.moment.concat(
      Archetypes.archetypes.rocks.moment
    )
    const decelerations = Archetypes.archetypes.players.deceleration.concat(
      Archetypes.archetypes.rocks.deceleration
    )
    // for (const i in decelerations) {
    // for (const i in moments) {
    for (const i in positions) {
      positions[i].x += moments[i].x
      positions[i].y += moments[i].y
      moments[i].x *= decelerations[i]
      moments[i].y *= decelerations[i]
    }
  }

  public static updateControllable(
    controls: { up: boolean; left: boolean; down: boolean; right: boolean }[],
    moments: { x: number; y: number }[],
    speeds: number[]
  ) {
    // for (const i in controls) {
    // for (const i in moments) {
    for (const i in speeds) {
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
    // for (const i in entities.moment) {
    // for (const i in entities.position) {
    for (const i in e.radius) {
      for (const other in e.radius) {
        if (other !== i) {
          const dx = e.position[i].x - e.position[other].x
          const dy = e.position[i].y - e.position[other].y

          const distance = Math.sqrt(dx ** 2 + dy ** 2)
          const radiusThing = e.radius[i] + e.radius[other]

          const intersect = distance <= radiusThing

          if (intersect) {
            // normalize
            const overlap = radiusThing - distance

            const angle = Math.atan2(dy, dx)

            e.moment[i].x += Math.cos(angle) * overlap * 0.5 // 0.05 1
            e.moment[i].y += Math.sin(angle) * overlap * 0.5 // 0.05 1

            // e.moment[other].x -= Math.cos(angle) * overlap * 0.05 // ?
            // e.moment[other].y -= Math.sin(angle) * overlap * 0.05 // ?
          }
        }
      }
    }
  }

  public static updateBorderForce(positions: any, moments: any) {
    const force = 1.5
    // for (let i = 0; i < positions.length; i++) {
    for (let i = 0; i < moments.length; i++) {
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

export { Archetypes }

type Player = {
  controls: { up: boolean; down: boolean; left: boolean; right: boolean }
  deceleration: number
  moment: { x: number; y: number }
  position: { x: number; y: number }
  radius: number
  speed: number
}

type Rock = {
  position: { x: number; y: number }
  moment: { x: number; y: number }
  deceleration: number
  radius: number
}

abstract class Entities {
  private static entities: [Player[], Rock[]]

  public static setEntities(entities: [any[], any[]]) {
    this.entities = entities
  }

  public static load() {
    this.entities[0].push({
      controls: { up: false, down: false, left: false, right: false },
      position: { x: 1920 / 2, y: 1080 / 2 },
      // position: { x: 0, y: 1080 / 2 },
      moment: { x: 0, y: 0 },
      speed: 1.5, // 1.5 4.5
      deceleration: 0.75,
      radius: 29, // 32
    })

    for (let i = 0; i < 100; i++) {
      this.entities[1][i] = {
        position: {
          x: Math.random() * 1920,
          y: Math.random() * 1080,
        },
        // position: { x: 1920 / 2, y: 1080 / 2 },
        moment: { x: 0, y: 0 },
        deceleration: 0.95,
        radius: 24,
      }
    }
  }

  public static update() {
    for (const entity of this.entities[0]) {
      updateControllable(entity)
      updatePushable(entity, this.entities)
      updateBorderForce(entity)
      updateMoment(entity)
    }

    for (const entity of this.entities[1]) {
      updatePushable(entity, this.entities)
      updateBorderForce(entity)
      updateMoment(entity)
    }
  }
}

function updateBorderForce(entity: any) {
  const force = 1.5
  if (entity.position.x < 0) {
    entity.moment.x += force
  }
  if (entity.position.x > 1920) {
    entity.moment.x += -force
  }
  if (entity.position.y < 0) {
    entity.moment.y += force
  }
  if (entity.position.y > 1080) {
    entity.moment.y += -force
  }
}

function updateControllable(entity: any) {
  const up = entity.controls.up
  const down = entity.controls.down
  const left = entity.controls.left
  const right = entity.controls.right

  let dx = (right ? 1 : 0) - (left ? 1 : 0)
  let dy = (down ? 1 : 0) - (up ? 1 : 0)

  const len = Math.hypot(dx, dy)
  const isMoving = len !== 0
  if (isMoving) {
    // normalize (diagonal becomes length 1)
    dx /= len
    dy /= len
    entity.moment.x += dx * entity.speed // * deltaTime
    entity.moment.y += dy * entity.speed // * deltaTime
  }
}

function updatePushable(entity: any, entities: any[][]) {
  for (let i = 0; i < entities.length; i++) {
    for (const other of entities[i]) {
      if (other !== entity) {
        const a = entity
        const b = other

        const dx = a.position.x - b.position.x
        const dy = a.position.y - b.position.y

        const distance = Math.sqrt(dx ** 2 + dy ** 2)
        const radiusThing = a.radius + b.radius

        const intersect = distance <= radiusThing

        if (intersect) {
          // normalize
          const overlap = radiusThing - distance

          const angle = Math.atan2(dy, dx)

          a.moment.x += Math.cos(angle) * overlap * 0.1
          a.moment.y += Math.sin(angle) * overlap * 0.1

          // b.moment.x -= Math.cos(angle) * overlap * 0.05 // ?
          // b.moment.y -= Math.sin(angle) * overlap * 0.05 // ?
        }
      }
    }
  }
}

function updateMoment(entity: any) {
  entity.position.x += entity.moment.x
  entity.position.y += entity.moment.y
  entity.moment.x *= entity.deceleration
  entity.moment.y *= entity.deceleration
  // entity.moment.x = 0
  // entity.moment.y = 0
}

export { Entities }

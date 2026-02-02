// import { entities } from './core.ts'

function update() {
  for (const entity of entities) {
    if (entity.isControllable) {
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
        // dx = parseFloat(dx.toFixed(3))
        // dy = parseFloat(dy.toFixed(3))

        const addx = dx * entity.speed // * time.deltaTime
        const addy = dy * entity.speed // * time.deltaTime
        entity.moment.x += addx
        entity.moment.y += addy
      }
    }

    if (entity.isPushable) {
      for (const other of entities) {
        if (other !== entity && other.isPushable) {
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

            // a.moment.x += Math.cos(angle) * overlap * 0.5
            // a.moment.y += Math.sin(angle) * overlap * 0.5

            b.moment.x -= Math.cos(angle) * overlap * 0.1
            b.moment.y -= Math.sin(angle) * overlap * 0.1
          }
        }
      }
    }

    // if (entity.isRandomlyDashing) {
    //   if (Math.random() <= 0.1) {
    //     entity.moment.x += (Math.random() * 2 - 1) * 1
    //     entity.moment.y += (Math.random() * 2 - 1) * 1
    //   }
    // }

    // if (entity.isBullet) {
    //   entity.timeLeft -= time.deltaTime
    //   if (entity.timeLeft <= 0) {
    //     // world.removeChild(graphics[entities.indexOf(entity)])
    //     // graphics[entities.indexOf(entity)].destroy()
    //     const i = entities.indexOf(entity)
    //     // graphics[i].visible = false
    //     entities.splice(i, 1)
    //   }
    // }

    entity.position.x += entity.moment.x
    entity.position.y += entity.moment.y
    entity.moment.x *= entity.deceleration
    entity.moment.y *= entity.deceleration
    // entity.moment.x = 0
    // entity.moment.y = 0
  }

  // const player = entities[1]

  // const reloaded = player.reloadTime >= player.reload
  // if (!reloaded) {
  //   player.reloadTime += time.deltaTime
  // }
  // if (reloaded) {
  //   player.reloadTime = player.reload
  //   if (Mouse.get(0)) {
  //     player.reloadTime = 0
  //     const playerRelativeX =
  //       entities[1].position.x - entities[0].position.x
  //     const playerRelativeY =
  //       entities[1].position.y - entities[0].position.y

  //     let dx = mouse.x - playerRelativeX
  //     let dy = mouse.y - playerRelativeY

  //     // normalize
  //     const len = Math.hypot(dx, dy)
  //     const isMoving = len !== 0
  //     if (isMoving) {
  //       // normalize (diagonal becomes length 1)
  //       dx /= len
  //       dy /= len
  //       // entities[1].moment.x += dx * entities[1].speed * time.deltaTime
  //       // entities[1].moment.y += dy * entities[1].speed * time.deltaTime
  //     }

  //     entities.push({
  //       position: {
  //         x: player.position.x + dx * player.radius,
  //         y: player.position.y + dy * player.radius,
  //       },
  //       moment: {
  //         x: dx * 10,
  //         y: dy * 10,
  //       },
  //       speed: 2,
  //       deceleration: 0.99,
  //       radius: 16,
  //       color: 0x717173,
  //       opacity: 0.5,
  //       isControllable: false,
  //       isCamera: false,
  //       isVisible: true,
  //       controls: {
  //         up: 'ArrowUp',
  //         down: 'ArrowDown',
  //         left: 'ArrowLeft',
  //         right: 'ArrowRight',
  //       },
  //       isPushable: true,
  //       isRandomlyDashing: false,
  //       isBullet: true,
  //       timeLeft: 180, // 180
  //       canShoot: false,
  //       reload: 0,
  //       reloadTime: 0,
  //     })
  //   }
  // }
}

// export { update }

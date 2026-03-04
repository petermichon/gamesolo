export abstract class Keyboard {
  private static keys: Record<string, boolean> = {}

  // Remove from here
  private static playersControls: {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
  }[]

  public static setEntity(entity: any) {
    Keyboard.playersControls = entity
  }

  public static keydown(e: KeyboardEvent) {
    // ---
    if (e.repeat) {
      return
    }

    const special = e.altKey || e.ctrlKey || e.shiftKey || e.code == 'Tab' // || e.metaKey
    if (special) {
      // e.preventDefault() // Disabled for dev
    }
    // ---

    Keyboard.keys[e.code] = true

    // ---
    // Remove from here and use a function reference instead
    Keyboard.updateEntity()
    // ---
  }

  public static keyup(e: KeyboardEvent) {
    Keyboard.keys[e.code] = false

    // ---
    // Remove from here and use a function reference instead
    Keyboard.updateEntity()
    // ---
  }

  // ---
  // Remove from here
  private static updateEntity() {
    // Keyboard.playersControls[0] = {
    //   up: this.keys['KeyW'],
    //   left: this.keys['KeyA'],
    //   down: this.keys['KeyS'],
    //   right: this.keys['KeyD'],
    // }

    const player = Keyboard.playersControls[0]
    player.up = this.keys['KeyW']
    player.left = this.keys['KeyA']
    player.down = this.keys['KeyS']
    player.right = this.keys['KeyD']
  }
  // ---
}

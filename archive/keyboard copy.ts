abstract class Keyboard {
  private static keys: Record<string, boolean> = {}

  // Remove from here
  private static entity: any

  public static setEntity(entity: any) {
    this.entity = entity
  }

  public static keydown(e: KeyboardEvent) {
    // ---
    if (e.repeat) {
      return
    }
    if (e.altKey || e.ctrlKey || e.shiftKey || e.key === 'Shift') {
      // e.preventDefault()
    }
    // ---

    console.log(e.code)

    Keyboard.keys[e.key] = true

    // ---
    // Remove from here and use a function reference instead
    Keyboard.updateEntity()
    // ---
  }

  public static keyup(e: KeyboardEvent) {
    Keyboard.keys[e.key] = false

    // ---
    // Remove from here and use a function reference instead
    Keyboard.updateEntity()
    // ---
  }

  // ---
  // Remove from here
  private static updateEntity() {
    this.entity.controls = {
      up: this.keys['z'],
      left: this.keys['q'],
      down: this.keys['s'],
      right: this.keys['d'],
    }
  }
  // ---
}

export { Keyboard }

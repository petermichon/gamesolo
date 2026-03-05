export abstract class Keyboard {
  private static keys: Record<string, boolean> // Write

  public static setEntity(keys: Record<string, boolean>) {
    Keyboard.keys = keys
  }

  public static keydown(e: KeyboardEvent) {
    if (e.repeat) {
      return
    }
    const special = e.altKey || e.ctrlKey || e.shiftKey || e.code == 'Tab' // || e.metaKey
    if (special) {
      // e.preventDefault() // Disabled for dev
    }

    // ---

    Keyboard.keys[e.code] = true
  }

  public static keyup(e: KeyboardEvent) {
    Keyboard.keys[e.code] = false
  }
}

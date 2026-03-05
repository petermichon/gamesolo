export class Keyboard {
  private keys: Record<string, boolean> // Write

  public constructor(keys: Record<string, boolean>) {
    this.keys = keys
  }

  public keydown(e: KeyboardEvent) {
    if (e.repeat) {
      return
    }
    const special = e.altKey || e.ctrlKey || e.shiftKey || e.code == 'Tab' // || e.metaKey
    if (special) {
      // e.preventDefault() // Disabled for dev
    }

    // ---

    this.keys[e.code] = true
  }

  public keyup(e: KeyboardEvent) {
    this.keys[e.code] = false
  }
}

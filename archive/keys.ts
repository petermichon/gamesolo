class Keys {
  // static keyStates: Record<string, boolean | undefined> = {}
  static keyStates: string[] = []

  static keyDown(key: string) {
    if (this.keyStates.indexOf(key) !== -1) {
      return
    }
    this.keyStates.push(key)
  }

  static keyUp(key: string) {
    this.keyStates.splice(this.keyStates.indexOf(key), 1)
  }

  static get(key: string): boolean {
    if (this.keyStates.indexOf(key) === -1) {
      return false
    }
    return true
  }
}

// export { Keys }

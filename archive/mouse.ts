class Mouse {
  // static keyStates: Record<string, boolean | undefined> = {}
  static keyStates: number[] = [];

  static buttonDown(key: number) {
    if (this.keyStates.indexOf(key) !== -1) {
      return;
    }
    this.keyStates.push(key);
  }

  static buttonUp(key: number) {
    this.keyStates.splice(this.keyStates.indexOf(key), 1);
  }

  static get(key: number): boolean {
    if (this.keyStates.indexOf(key) === -1) {
      return false;
    }
    return true;
  }
}

// export { Mouse }

export const b: Record<string, boolean> = {};

// globalThis.addEventListener('mousedown', mousedown)

// globalThis.addEventListener('mouseup', mouseup)

function mousedown(e: MouseEvent) {
  b[e.button] = true;
}

function mouseup(e: MouseEvent) {
  b[e.button] = false;
}

// export { mousedown, mouseup }

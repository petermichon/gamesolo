type Controls = { up: boolean; down: boolean; left: boolean; right: boolean }

export class EntityInputs {
  private keys: Record<string, boolean> // Read

  private playersControls: Controls[] // Write

  constructor(keys: Record<string, boolean>, playersControls: Controls[]) {
    this.keys = keys
    this.playersControls = playersControls
  }

  public update() {
    const player = this.playersControls[0]

    player.up = this.keys['KeyW']
    player.left = this.keys['KeyA']
    player.down = this.keys['KeyS']
    player.right = this.keys['KeyD']
  }
}

type Controls = { up: boolean; down: boolean; left: boolean; right: boolean }

export class EntityInputs {
  private keys: Record<string, boolean> // Read

  private playersControls: Controls[] // Write

  constructor(playersControls: Controls[], keys: Record<string, boolean>) {
    this.playersControls = playersControls
    this.keys = keys
  }

  public update() {
    const player = this.playersControls[0]

    player.up = this.keys['KeyW']
    player.left = this.keys['KeyA']
    player.down = this.keys['KeyS']
    player.right = this.keys['KeyD']
  }
}

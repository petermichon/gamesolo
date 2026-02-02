// import { websocket } from './websocket.ts'

// import { entities } from './core.ts'

// const pressedKeys = new Set()

const keys: Record<string, boolean> = {};

function initInputs() {
  // globalThis.addEventListener('keydown', keydown)
  // globalThis.addEventListener('keyup', keyup)
  // globalThis.addEventListener('keydown', keydown)
  // globalThis.addEventListener('keyup', keyup)
  // globalThis.addEventListener('mousedown', mousedown)
  // globalThis.addEventListener('mouseup', mouseup)
  // globalThis.addEventListener('gamepadconnected', gamepadconnected)
}

function keydown(event: KeyboardEvent) {
  keys[event.key] = true;
}

function keyup(event: KeyboardEvent) {
  keys[event.key] = false;
}

function mousedown(event: MouseEvent) {
  // Mouse.buttonDown(event.button)
}

function mouseup(event: MouseEvent) {
  // Mouse.buttonUp(event.button)
}

function gamepadconnected(event: GamepadEvent) {
  const gamepad = event.gamepad;
  console.log("Gamepad connected:", gamepad.id);

  function updateGamepad() {
    const gamepads = navigator.getGamepads();
    const gp = gamepads[gamepad.index]!;

    // Axes: gp.axes[0] (left/right), gp.axes[1] (up/down)
    // Buttons: gp.buttons[0].pressed (e.g., button A)
    // console.log('Left Stick X:', gp.axes[0])
    // console.log('Left Stick Y:', gp.axes[1])

    const xAxis = gp.axes[0]; // Left (-1) to Right (1)
    const yAxis = gp.axes[1]; // Up (-1) to Down (1)

    const inputs = {
      up: yAxis <= -0.5,
      left: xAxis <= -0.5,
      down: yAxis >= 0.5,
      right: xAxis >= 0.5,
    };

    console.log(inputs);

    const data = JSON.stringify(inputs);
    // websocket.send(data)

    requestAnimationFrame(updateGamepad);
  }

  updateGamepad();
}

// export { keydown, keyup, mousedown, mouseup, gamepadconnected }

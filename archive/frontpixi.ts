import { Application, Graphics, Renderer, Text, Ticker } from 'pixi.js'

import { entities } from './core.ts'

import { updateEntities } from './update.ts'

import { updateGraphics } from './graphics.ts'

let app: Application<Renderer>

let clientGraphics: Graphics[] = []

let fpsGraphics: Text

function frontPixi() {
  ;(async () => {
    app = new Application()

    // 'b74869'
    // '1099bb'
    await app.init({
      antialias: true,
      width: globalThis.innerWidth,
      height: globalThis.innerHeight,
      resizeTo: window,
      background: 'ebebe1',
      // resolution: globalThis.devicePixelRatio, // bugged with zoom
    })

    const mouse = {
      x: 0,
      y: 0,
    }

    // globalThis.addEventListener('mousemove', (e) => {
    //   const rect = app.canvas.getBoundingClientRect()
    //   mouse.x = e.clientX - rect.left
    //   mouse.y = e.clientY - rect.top
    //   // console.log(`${mouse.x}, ${mouse.y}`)
    // })

    // app.canvas.addEventListener('contextmenu', (e) => {
    //   e.preventDefault()
    // })

    globalThis.document.body.appendChild(app.canvas)

    clientGraphics = []

    fpsGraphics = new Text({
      x: 24,
      y: 24,
      text: '60',
      style: {
        fill: '#000000',
        fontSize: 36,
        // fontFamily: 'MyFont',
      },
    })
    // world.addChild(fpsGraphics)
    app.stage.addChild(fpsGraphics)

    app.ticker.add(tickerCallback)
  })()
}

function tickerCallback(ticker: Ticker) {
  updateEntities(entities)

  // updateServerGraphics(serverGraphics, serverEntities, world)
  // updateServerGraphics(serverGraphics, server.entities, app.stage)

  updateGraphics(clientGraphics, entities, app.stage)

  const fps = (1 / ticker.deltaTime) * 60
  // const fps = app.ticker.FPS

  // fpsGraphics.text = `${fps.toFixed(0)}`
  fpsGraphics.text = `${Math.round(fps)}`
}

export { frontPixi }

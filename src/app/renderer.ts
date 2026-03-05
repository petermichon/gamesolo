type ArchetypesData = {
  players: {
    controls: { up: boolean; down: boolean; left: boolean; right: boolean }[] // remove from here ?
    deceleration: number[]
    moment: { x: number; y: number }[]
    position: { x: number; y: number }[]
    radius: number[]
    speed: number[]
  }
  rocks: {
    deceleration: number[]
    moment: { x: number; y: number }[]
    position: { x: number; y: number }[]
    radius: number[]
  }
}

export class Renderer {
  private ctx: CanvasRenderingContext2D

  private archetypes: ArchetypesData

  public constructor(
    ctx: CanvasRenderingContext2D,
    archetypes: ArchetypesData
  ) {
    this.ctx = ctx
    this.archetypes = archetypes
  }

  public animate() {
    const ctx = this.ctx
    const archetypes = this.archetypes

    // ---

    // Virtual Canvas
    const aspectRatio = 16 / 9

    let rectWidth
    let rectHeight

    const someRatioIdk = ctx.canvas.width / ctx.canvas.height
    const isWider = someRatioIdk < aspectRatio
    // const idk2 = idk > aspectRatio

    // Calculate dimensions based on canvas aspect ratio
    // if (isWider) {
    if (!isWider) {
      // Canvas is wider than 16:9, so height is the limiting factor
      rectHeight = ctx.canvas.height
      rectWidth = rectHeight * aspectRatio
    } else {
      // Canvas is taller than 16:9, so width is the limiting factor
      rectWidth = ctx.canvas.width
      rectHeight = rectWidth / aspectRatio
    }

    // Center the rectangle
    const vRCanvasX = (ctx.canvas.width - rectWidth) / 2
    const vRCanvasY = (ctx.canvas.height - rectHeight) / 2
    const vRCanvasWidth = rectWidth
    const vRCanvasHeight = rectHeight

    const wScale = 1920 / vRCanvasWidth
    const hScale = 1080 / vRCanvasHeight
    // console.log(wScale, hScale)

    // ---

    ctx.globalAlpha = 1.0

    // Background
    ctx.fillStyle = '#c6c6c6' // #cccccc #cdbdbd #ebebe1
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Virtual Canvas
    ctx.fillStyle = '#cccccc' // #e0a6a7ff #717173
    // ctx.fillRect(vCanvasX, vCanvasY, vCanvasSize, vCanvasSize)
    ctx.fillRect(vRCanvasX, vRCanvasY, rectWidth, rectHeight)

    ctx.lineWidth = 4 / wScale

    ctx.fillStyle = '#06b2e1' // #f04f55 #717173 #000000
    ctx.strokeStyle = '#0385a8' // #b33d41 #535354
    ctx.globalAlpha = 0.125 // 0.0 0.125
    // for (const entity of Renderer.ghosts[0]) {
    //   // ---
    //   // CALCULATE GRAPHICS

    //   const x = vRCanvasX + entity.position.x / wScale
    //   const y = vRCanvasY + entity.position.y / wScale
    //   // const x = Math.round(entity.position.x)
    //   // const y = Math.round(entity.position.y)
    //   const radius = entity.radius / wScale

    //   this.drawCircle(x, y, radius)
    // }

    ctx.fillStyle = '#999999'
    ctx.strokeStyle = '#727272'
    ctx.globalAlpha = 0.125 // 0.0 0.125

    ctx.fillStyle = '#06b2e1' // #f04f55 #717173 #000000
    ctx.strokeStyle = '#0385a8' // #b33d41 #535354
    ctx.globalAlpha = 1.0
    // for (const entity of this.entities[0]) {
    for (let i = 0; i < archetypes.players.position.length; i++) {
      // console.log(Renderer.archetypes.players.position[i])
      // console.log(Renderer.archetypes.players.radius[i])

      // ---
      // CALCULATE GRAPHICS

      const x = vRCanvasX + archetypes.players.position[i].x / wScale
      const y = vRCanvasY + archetypes.players.position[i].y / wScale
      // const x = Math.round(entity.position.x)
      // const y = Math.round(entity.position.y)
      const radius = archetypes.players.radius[i] / wScale

      this.drawCircle(x, y, radius)
    }

    // #999999 #727272
    // #ffe869 #bfae4e
    // #fc7677 #bd5859
    // #768df7 #5869bd

    ctx.fillStyle = '#999999'
    ctx.strokeStyle = '#727272'
    ctx.globalAlpha = 1.0

    for (let i = 0; i < archetypes.rocks.position.length; i++) {
      // ---
      // CALCULATE GRAPHICS

      const x = vRCanvasX + archetypes.rocks.position[i].x / wScale
      const y = vRCanvasY + archetypes.rocks.position[i].y / wScale
      // const x = Math.round(entity.position.x)
      // const y = Math.round(entity.position.y)
      const radius = archetypes.rocks.radius[i] / wScale

      // this.ctx.fillRect(x, y, radius, radius)
      this.drawCircle(x, y, radius)
    }
  }

  public drawCircle(x: number, y: number, radius: number) {
    const ctx = this.ctx

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
}

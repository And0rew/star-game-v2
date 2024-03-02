const CELL_W = 55
const CELL_H = 55

function drawUI(dt, t) {
  if (!Game.myId || !Game.state.objects[Game.myId]) {
    return
  }

  const objectMe = Game.state.objects[Game.myId]
  if (objectMe.gun) {
    const gun = ALL_GUNS[objectMe.gun]
    let gunTex = Game.resources[gun.tex]

    ctx.fillStyle = "rgba(100,100,100,0.5)"
    ctx.fillRect(80, Game.cameraSize[1] - 80, CELL_W, CELL_H)

    if (lastShot) {
      const diff = t - lastShot
      if (diff < SHOT_RATE) {
        console.log('diff', diff)
        console.log('%', 1 - diff / SHOT_RATE)

        const w = Math.round( (1 - diff / SHOT_RATE) * CELL_W)
        ctx.fillStyle = "rgba(200,200,200,0.5)"
        ctx.fillRect(80, Game.cameraSize[1] - 80, w, CELL_H)
      }
    }


    ctx.drawImage(
      gunTex,

      80,
      Game.cameraSize[1] - 80,

      gun.renderOpt.w,
      gun.renderOpt.h,
    )

    ctx.fillStyle = "White"
		ctx.fillText(
			"Q",

			90,
			Game.cameraSize[1] - 40
		)
  }
}
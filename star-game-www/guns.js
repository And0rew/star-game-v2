let ALL_GUNS = {
  shotgun_0: {
    id: 'shotgun_0',
    name: 'Shotgun',
    tex: 'weapon7_sm',
    renderOpt: {
      w: 41,
      h: 20,
      x: 0,
      y: 22,
      g: 90,
    },

    shot: {
      damage: 20,
      v: 0.4,
      life: 500,
      x: 0,
      y: 0,
      tex: 'shot_round',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 10 })
      spawnOneShot({ object, gun, g: object.g + 10 })
    }
  },
  assault_rifle_0: {
    id: 'assault_rifle_0',
    name: 'Assault Rifle',
    tex: 'weapon8_sm',
    renderOpt: {
      w: 55,
      h: 25,
      x: 0,
      y: 22,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 20,
      v: 0.4,
      life: 800,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  }
}

// Test function to spawn guns on a ground
function spawn_guns() {
  let fromX = 10 * 40
  let fromY = 3 * 40
  let stepY = 80

  for (let i in ALL_GUNS) {
    let gun = ALL_GUNS[i]
    let id = genId()

    game_update(['objects', id], {
      type: 'gun',

      id: id,
      gunId: gun.id,

      x: fromX,
      y: fromY,

      g: 0, vx: 0, vy: 0, v: 0,

      look: gun.tex,
      map: 'sand_planet',

      renderOpt: {
        noShadow: true,
      },

      render_layer: 1,
    })

    fromY += stepY
  }
}

let GUN_GRAB_DIST = 40 * 2

function tryToGrabGun(player) {
  console.log('tryToGrabGun')

  for (let key in Game.state.objects) {
    var gun = Game.state.objects[key]
    if (gun.type === "gun"
      && Math.abs(player.x - gun.x) < GUN_GRAB_DIST
      && Math.abs(player.y - gun.y) < GUN_GRAB_DIST
    ) {
      console.log('tryToGrabGun.gun_found')

      game_update(['objects', player.id, 'gun'], gun.gunId)
      game_delete('objects', gun.id)

      return
    }
  }
}


function oldGunShot(object) {
  let k = Math.tan(object.g / 180 * Math.PI)
  let V_SHOT = 0.4
  var vy = V_SHOT / Math.sqrt(k * k + 1)
  var vx = Math.abs(k * vy)

  if (object.g >= 0 && object.g < 90) {
    vy = -vy
  } else if (object.g <= 0 && object.g > -90) {
    vy = -vy
    vx = -vx
  } else if (object.g <= -90 && object.g > -180) {
    vx = -vx
  }

  var life = 3000
  var date_create = Date.now()
  var shotId = random(16)

  game_update(["shots", shotId], {
    id: shotId,
    x: object.x + 49 / 2,
    y: object.y + 30 / 2,
    g: object.g,
    vx: vx,
    vy: vy,
    v: V_SHOT,
    date_create: date_create,
    time_life: life,
    time_not_life: date_create + life,
    myid: Game.myId,
    map: object.map,
  })
  console.log(["Id:", shotId, "x:", Game.state.shots[shotId].x, "y:", Game.state.shots[shotId].y, "g:", Game.state.shots[shotId].g].join(" "))
}

function gunShot(object) {
  if (!object.gun) {
    // return oldGunShot(object)
    return
  }

  let gun = ALL_GUNS[object.gun]
  if (gun.spawnShots) {
    gun.spawnShots(object, gun)
    return
  }
}

function spawnOneShot({ object, gun, x, y, g }) {
  if (!x) {
    x = object.x
  }
  if (!y) {
    y = object.y
  }

  let vShot = gun.shot.v
  var life = gun.shot.life

  let k = Math.tan(g / 180 * Math.PI)
  var vy = vShot / Math.sqrt(k * k + 1)
  var vx = Math.abs(k * vy)

  if (g >= 0 && g < 90) {
    vy = -vy
  } else if (g <= 0 && g > -90) {
    vy = -vy
    vx = -vx
  } else if (g <= -90 && g > -180) {
    vx = -vx
  }

  let date_create = Date.now()
  let shotId = genId()

  game_update(["shots", shotId], {
    id: shotId,
    x: x + gun.shot.x,
    y: y + gun.shot.y,
    g: g,
    vx: vx,
    vy: vy,
    v: vShot,
    date_create: date_create,
    time_life: life,
    time_not_life: date_create + life,
    myid: object.id,
    map: object.map,
    tex: gun.shot.tex,
  })
}
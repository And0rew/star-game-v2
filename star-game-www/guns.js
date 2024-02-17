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
    damage: 20,
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
    }
  }
}
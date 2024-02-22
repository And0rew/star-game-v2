let ALL_GUNS = {
  shotgun_0: {
    id: 'shotgun_0',
    name: 'Shotgun',
    tex: 'weapon7_sm',
    ground: 'true',
    renderOpt: {
      w: 41,
      h: 20,
      x: 0,
      y: 22,
      g: 90,
    },

    shot: {
      damage: 20, // я думаю перезарядка средняя
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
    ground: 'true',
    renderOpt: {
      w: 55,
      h: 25,
      x: 0,
      y: 22,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 20, // перезарядка маленькая
      v: 0.4,
      life: 800,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      for (let i = -2; i <= 2; i++) {
        spawnOneShot({ object, gun, g: object.g + i * 45, l: 160})
      }
    }
  },
  test_weapon1: {
    id: 'test_weapon1',
    name: 'test_weapon1',
    tex: 'weapon1_sm',
    ground: 'true',
    renderOpt: {
      w: 39,
      h: 30,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 15, //перезарядка маленькая
      v: 0.2,
      life: 1800,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  },
  test_weapon2: {
    id: 'test_weapon2',
    name: 'test_weapon2',
    tex: 'weapon2_sm',
    ground: 'true',
    renderOpt: {
      w: 29,
      h: 28,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 45, //перезарядка средняя
      v: 0.3,
      life: 500,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  },
  test_weapon3: {
    id: 'test_weapon3',
    name: 'test_weapon3',
    tex: 'weapon3_sm',
    ground: 'true',
    renderOpt: {
      w: 38,
      h: 28,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 20, //перезарядка средняя
      v: 0.3,
      life: 900,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })

      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 100)
      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 200)
    }
  },
  test_weapon4: {
    id: 'test_weapon4',
    name: 'test_weapon4',
    tex: 'weapon4_sm',
    ground: 'true',
    renderOpt: {
      w: 32,
      h: 25,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 15, //перезарядка большая
      v: 0.2,
      life: 900,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })

      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 100)
      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 200)

      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 400)
      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 500)
    }
  },
  test_weapon5: {
    id: 'test_weapon5',
    name: 'test_weapon5',
    tex: 'weapon5_sm',
    ground: 'true',
    renderOpt: {
      w: 35,
      h: 25,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 50, //перезарядка огромная
      v: 0.3,
      life: 1500,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  },
  test_weapon6: {
    id: 'test_weapon6',
    name: 'test_weapon6',
    tex: 'weapon6_sm',
    ground: 'true',
    renderOpt: {
      w: 33,
      h: 22,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 25, //перезарядка огромная
      v: 0.2,
      life: 1300,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 1 })
      spawnOneShot({ object, gun, g: object.g + 1 })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
    }
  },
  test_weapon9: {
    id: 'test_weapon9',
    name: 'test_weapon9',
    tex: 'weapon9_sm',
    ground: 'true',
    renderOpt: {
      w: 26,
      h: 23,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 15, //перезарядка средняя
      v: 0.4,
      life: 1300,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
      spawnOneShot({ object, gun, g: object.g - 4 })
      spawnOneShot({ object, gun, g: object.g + 4 })
    }
  },
  test_weapon10: {
    id: 'test_weapon10',
    name: 'test_weapon10',
    tex: 'weapon10_sm',
    ground: 'true',
    renderOpt: {
      w: 40,
      h: 24,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 5, //перезарядка менькая
      v: 0.8,
      life: 400,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
    }
  },
  test_weapon11: {
    id: 'test_weapon11',
    name: 'test_weapon11',
    tex: 'weapon11_sm',
    ground: 'true',
    renderOpt: {
      w: 59,
      h: 23,
      x: 0,
      y: 15,
      g: 90,
     },
     damage: 10,
  
     shot: {
       damage: 30, //перезарядка средняя
       v: 1,
       life: 300,
       x: 0,
       y: 0,
       tex: 'shot_fireball',
     },
     spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
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

    if (gun.ground === false) {
      continue
    }

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

function spawnOneShot({ object, gun, x, y, g, l = 0 }) {
  if (!x) {
    x = object.x
  }
  if (!y) {
    y = object.y
  }

  let vShot = gun.shot.v
  var life = gun.shot.life

  let alfa = g / 180 * Math.PI
  let k = Math.tan(alfa)
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
    x: x - l * Math.cos(alfa + Math.PI / 2),
    y: y - l * Math.sin(alfa + Math.PI / 2),
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
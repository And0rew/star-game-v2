const _ = require('lodash')

function spawn_planets_0(game, map_name) {
  _.set(game, ['objects', 'planet_earth'], {
      id: 'planet_earth',
      x: 50,
      y: 50,
      look: 'planet_earth',
      ai: 'planet',
      g: 0,
      vx: 0,
      vy: 0,
      v: 0,

      planet_center_x: 1500,
      planet_center_y: 1500,
      orbit_radius: 800,
      orbit_speed: 10, // градус в секунду
      orbit_angle: 0,

      render_layer: 1,

      map: map_name,
  })

  _.set(game, ['objects', 'planet_mars'], {
      id: 'planet_mars',
      x: 50,
      y: 50,
      look: 'planet_mars',
      ai: 'planet',

      g: 0,
      vx: 0,
      vy: 0,
      v: 0,

      planet_center_x: 1500,
      planet_center_y: 1500,
      orbit_radius: 1300,
      orbit_speed: 15, // градус в секунду
      orbit_angle: 0,

      render_layer: 1,

      map: map_name,
  })

  _.set(game, ['objects', 'sun'], {
      id: 'sun',
      x: 1500,
      y: 1500,
      look: 'sun',

      g: 0,
      vx: 0,
      vy: 0,
      v: 0,

      render_layer: 1,

      map: map_name,
  })
}

exports.spawn_planets_0 = spawn_planets_0
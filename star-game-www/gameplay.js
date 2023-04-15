
function spawn_planets() {
    game_update(['objects', 'planet_earth'], { 
        id: 'planet_earth', 
        x: 50, 
        y: 50, 
        look: 'planet_earth',
        ai: 'planet',
        g: 0,
        vx: 0,
        vy: 0,
        v: 0,

        planet_center_x: 500,
        planet_center_y: 500,
        orbit_radius: 300,
        orbit_speed: 72, // градус в секунду
        orbit_angle: 0,

        render_layer: 1,
    })
}
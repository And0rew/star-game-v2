
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

        planet_center_x: 1500,
        planet_center_y: 1500,
        orbit_radius: 800,
        orbit_speed: 10, // градус в секунду
        orbit_angle: 0,

        render_layer: 1,
    })

    game_update(['objects', 'planet_mars'], {
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
    })

    game_update(['objects', 'sun'], {
        id: 'sun',
        x: 1500,
        y: 1500,
        look: 'sun',

        g: 0,
        vx: 0,
        vy: 0,
        v: 0,

        render_layer: 1,
    })
}

function spawn_players() {
    game_update(['objects', 'player1'], {
        id: 'player1',
        x: 50,
        y: 50,

        look: 'ship_0',
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Player 1',
        hitpoints: 100,
        max_hitpoints: 100,
    })

    game_update(['objects', 'player2'], {
        id: 'player2',
        x: 100,
        y: 100,

        look: 'ship_6',
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Mixerka',
        hitpoints: 100,
        max_hitpoints: 100,
    })

    game_update(['objects', 'max'], {
        id: 'player3',
        x: 100,
        y: 100,

        look: 'ship_6',
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Max',
        hitpoints: 100,
        max_hitpoints: 100,
    })
}
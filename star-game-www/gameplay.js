
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

        look: 'trooper1',
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

        look: 'trooper1',
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Mixerka',
        hitpoints: 100,
        max_hitpoints: 100,
    })
}

function spawn_car() {
    game_update(['objects', 'Car102'], {
        id: 'Car102',
        nickName: 'Press e',
        x: 700,
        y: 420,
        hitpoints: 100,
        max_hitpoints: 100,
        look: 'car0',
              ai: ['trooper', 'hitpoints'],
              type: "car",
        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        driverId: null,
        passengerIds: {},
        maxPassengers: 1,
    })
}

function game_delete_all() {
    for (const c in Game.state.objects) { game_delete('objects', c) }
}

function spawn_ships() {
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

var new_game = function () {
    game_update(['objects', 'Tower1'], {
    id: 'Tower1',
    x: 400,
    y: 400,
    hitpoints: 1000,
    max_hitpoints: 1000,
    look: 'tower1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Tower2'], {
    id: 'Tower2',
    x: 1200,
    y: 400,
    hitpoints: 1000,
    max_hitpoints: 1000,
    look: 'tower1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken'], {
    id: 'Maneken',
    nickName: 'Maneken',
    x: 500,
    y: 400,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken2'], {
    id: 'Maneken2',
    nickName: 'Maneken',
    x: 500,
    y: 420,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken3'], {
    id: 'Maneken',
    nickName: 'Maneken',
    x: 500,
    y: 440,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken4'], {
    id: 'Maneken2',
    nickName: 'Maneken',
    x: 500,
    y: 460,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken5'], {
    id: 'Maneken2',
    nickName: 'Maneken',
    x: 500,
    y: 480,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken6'], {
    id: 'Maneken',
    nickName: 'Maneken',
    x: 1140,
    y: 400,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken7'], {
    id: 'Maneken2',
    nickName: 'Maneken',
       x: 1140,
    y: 420,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken8'], {
    id: 'Maneken',
    nickName: 'Maneken',
    x: 1140,
    y: 440,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken9'], {
    id: 'Maneken2',
    nickName: 'Maneken',
    x: 1140,
    y: 460,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
    game_update(['objects', 'Maneken10'], {
    id: 'Maneken2',
    nickName: 'Maneken',
    x: 1140,
    y: 480,
    hitpoints: 100,
    max_hitpoints: 100,
    look: 'trooper1',
    g: 0,
    vx: 0,
    vy: 0,
    v: 0.2
    })
}
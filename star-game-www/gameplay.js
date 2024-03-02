
// function spawn_planets() {
//     game_update(['objects', 'planet_earth'], {
//         id: 'planet_earth',
//         x: 50,
//         y: 50,
//         look: 'planet_earth',
//         ai: 'planet',
//         g: 0,
//         vx: 0,
//         vy: 0,
//         v: 0,
//         planet_center_x: 1500,
//         planet_center_y: 1500,
//         orbit_radius: 800,
//         orbit_speed: 10, // градус в секунду
//         orbit_angle: 0,

//         render_layer: 1,
//     })

//     game_update(['objects', 'planet_mars'], {
//         id: 'planet_mars',
//         x: 50,
//         y: 50,
//         look: 'planet_mars',
//         ai: 'planet',

//         g: 0,
//         vx: 0,
//         vy: 0,
//         v: 0,

//         planet_center_x: 1500,
//         planet_center_y: 1500,
//         orbit_radius: 1300,
//         orbit_speed: 15, // градус в секунду
//         orbit_angle: 0,

//         render_layer: 1,
//     })

//     game_update(['objects', 'sun'], {
//         id: 'sun',
//         x: 1500,
//         y: 1500,
//         look: 'sun',

//         g: 0,
//         vx: 0,
//         vy: 0,
//         v: 0,

//         render_layer: 1,
//     })
// }

function spawnMe() {
    let nickName = document.getElementById("nick").value
    let id = document.getElementById("objectId").value
    let hitpoints = document.getElementById("hitpoints").value

    localStorage.myNickname = nickName

    const guns = ['shotgun_0', 'weapon1', 'weapon2', 'weapon3', 'weapon9', 'weapon10', 'weapon11']
    const gunId = guns[Math.round(Math.random() * (guns.length-1))]

    game_update(['objects', id], {
        type: 'character',

        gun: gunId,

        id: id,
        x: 200,
        y: 200,

        look: 'trooper_v2',
        lookOptions: {
            legsSpeed: 300,
            ang: 180,
            legs: [
                'trooper_v2_legs_0',
                'trooper_v2_legs_1'
            ]
        },

        ai: ['hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName,
        hitpoints,
        max_hitpoints: hitpoints,

        map: 'sand_planet',

        inventory: {
            gold: 1000,
            guns: []
        }
    })
}

function spawn_players() {
    // game_update(['objects', 'player1'], {
    //     id: 'player1',
    //     x: 100,
    //     y: 100,

    //     look: 'trooper1',
    //     ai: ['trooper', 'hitpoints'],

    //     g: 0,
    //     vx: 0,
    //     vy: 0,
    //     v: 0.2,

    //     nickName: 'Player 1',
    //     hitpoints: 100,
    //     max_hitpoints: 100,

    //     map: 'sand_planet'
    // })

    game_update(['objects', 'player2'], {
        id: 'player2',
        x: 200,
        y: 200,

        look: 'trooper_v2',
        lookOptions: {
            legsSpeed: 300,
            ang: 180,
            legs: [
                'trooper_v2_legs_0',
                'trooper_v2_legs_1'
            ]
        },

        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Max',
        hitpoints: 300,
        max_hitpoints: 300,

        map: 'sand_planet',

        inventory: {
            gold: 1000,
            guns: []
        }
    })

    game_update(['objects', 'playerMixer'], {
        id: 'playerMixer',
        x: 200,
        y: 200,

        look: 'trooper_v2',
        lookOptions: {
            legsSpeed: 300,
            ang: 180,
            legs: [
                'trooper_v2_legs_0',
                'trooper_v2_legs_1'
            ]
        },

        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Mixerka Papa',
        hitpoints: 300,
        max_hitpoints: 300,

        map: 'sand_planet',

        inventory: {
            gold: 1000,
            guns: []
        }
    })
}

function spawn_shopping_player() {
    game_update(['objects', 'playershop'], {
        id: 'playershop',
        x: 100,
        y: 100,

        look: 'trooper1',
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Player 1',
        hitpoints: 100,
        max_hitpoints: 100,

        map: 'sand_planet',

        inventory: {
            gold: 1000,
            guns: []
        }
    })
}

function spawn_trader() {
    game_update(['objects', 'vilTrader'], {
        id: 'vilTrader',
        x: 200,
        y: 100,

        look: 'trooper1',
        ai: ['hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: 'Торговец',
        hitpoints: 100,
        max_hitpoints: 100,

        map: 'sand_planet',
    })
}

function spawnEnemies() {
    const hitpoints = 300
    const baseEnemy = {
        type: 'character',
        gun: 'shotgun_0',

        look: 'trooper_v2',
        lookOptions: {
            legsSpeed: 300,
            ang: 180,
            legs: [
                'trooper_v2_legs_0',
                'trooper_v2_legs_1'
            ]
        },
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.1,

        hitpoints,
        max_hitpoints: hitpoints,

        map: 'sand_planet',

        inventory: {
            gold: 100,
            guns: []
        }
    }

    const guns = ['shotgun_0', 'weapon1', 'weapon2', 'weapon3']
    // for (const gunId in ALL_GUNS) {
    //     guns.push(gunId)
    // }

    const id0 = genId()
    const gunId0 = guns[Math.round(Math.random() * (guns.length-1))]
    game_update(['objects', id0], {
        ...baseEnemy,
        nickName: generateName(),
        id: id0,
        x: 300,
        y: 300,
        look: 'trooper_body_v2_orange',
        group: 'punks',
        gun: gunId0
    })

    const id1 = genId()
    const gunId1 = guns[Math.round(Math.random() * (guns.length-1))]
    game_update(['objects', id1], {
        ...baseEnemy,
        nickName: generateName(),
        id: id1,
        x: 300,
        y: 600,
        look: 'trooper_body_v2_yellow',
        group: 'monks',
        gun: gunId1,
    })

    const id2 = genId()
    const gunId2 = guns[Math.round(Math.random() * (guns.length-1))]
    game_update(['objects', id2], {
        ...baseEnemy,
        nickName: generateName(),
        id: id2,
        x: 600,
        y: 600,
        group: 'group0',
        gun: gunId2,
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
    game_update(['objects', 'ship1'], {
        id: 'ship1',

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

        map: 'space0',
    })

    game_update(['objects', 'ship2'], {
        id: 'ship2',

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

        map: 'space0',
    })

    game_update(['objects', 'ship3'], {
        id: 'ship3',

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

        map: 'space0',
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



// Expanded arrays of first and last names
const firstNames = ['Alex', 'Jax', 'Kai', 'Nova', 'Ryder', 'Sky', 'Zed', 'Mila', 'Trix', 'Luna', 'Ava', 'Leo', 'Mia', 'Niko', 'Sage', 'Tara', 'Zane', 'Eve', 'Jade', 'Kira'];
const lastNames = ['Morrow', 'Vega', 'Knight', 'Rex', 'Steel', 'Phoenix', 'Shadow', 'Blaze', 'Frost', 'Storm', 'Drake', 'Hawk', 'Wolf', 'Cross', 'Stone', 'Bishop', 'Knight', 'Rogue', 'Spear', 'Fox'];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random name
function generateName() {
    const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];

    return `${firstName} ${lastName}`;
}

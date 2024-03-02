const { update } = require('lodash')
const _ = require('lodash')

const { applyAI, addScript } = require('./ai-provider')

const { spawn_planets_0 } = require('./maps/map-space')

const f1 = require('./ai-scripts/hitpoints')
const f2 = require('./ai-scripts/planet')
const f3 = require('./ai-scripts/trooper')
const planet = require('./ai-scripts/planet')

f1(addScript)
f2(addScript)
f3(addScript)

const state = {
    maps: {},
    objects: {},
    shots: {},
}

let STOP_DIFF = 20
let ALMOST_ZERO = 10

function getBlockFromCor(mapThatPic, xpic, ypic) {
    var xblockC = xpic
    var yblockC = ypic
    var xblock = 0
    var yblock = 0
    xblock = Math.floor(xblockC / 40)
    yblock = Math.floor(yblockC / 40)
    if (mapThatPic[xblock] && mapThatPic[xblock][yblock]) {
        return {
            xBlock: xblock,
            yBlock: yblock,
            mapblock: mapThatPic[xblock][yblock]
        }
    }
    return null
}

const funcs = {
    bulkPatch: [],

    delete: (kind, id) => {
        delete state[kind][id]
        lastBroadcastFunc({ deleteObject: { kind, id } })
    },

    update: ( path, value ) => {
        _.set(state, path, value)
        funcs.bulkPatch.push({
            path,
            value,
        })
    },
}

let lastBroadcastFunc = null

const game = { state, funcs }

function game_start({ broadcast }) {
    lastBroadcastFunc = broadcast

    state.maps.sand_planet = generate_sand_planet(100, 100)
    state.maps.space0 = generate_space_map(100, 100)
    state.maps.big_house = generate_big_house()

    spawn_planets_0(state, 'space0')
    generatePalatk("playerSpawner", state, 'sand_planet')

    setInterval(() => {
        update_world({ broadcast })
    }, 10)
}

let pt = 0
let timeToSpawn = 0
function update_world({ broadcast }) {
    funcs.bulkPatch = []

    let t = Date.now()
    let dt = 0

    if (pt > 0) {
        dt = t - pt
    }
    pt = t
    if (dt === 0) {
        return
    }
    timeToSpawn = timeToSpawn + dt
    if (timeToSpawn > 49999) {
        if (colOfEnemySandNow < colOfEnemySand) {
            if (state.objects.playerSpawner) {
                console.log('spawn enemy')
                console.log(state.objects.playerSpawner.x)
                console.log(state.objects.playerSpawner.y + (1.5 * 40))
                generate_object("enemy" + Date.now(), state.objects.playerSpawner.x, state.objects.playerSpawner.y + (1.5 * 40), "enemy1", "enemyOnSand", "enemy", 200, "sand_planet", game)
                colOfEnemySandNow = colOfEnemySandNow + 1
            }
            timeToSpawn = timeToSpawn - 50000

        }
    }



    for (const objectId in state.objects) {
        const object = state.objects[objectId]

        if (object.ai) {
            applyAI(object, game , dt, t)
        }

        if (object.vx !== 0 || object.vy !== 0) {
            let new_x = object.x + object.vx * dt
            let new_y = object.y + object.vy * dt
            let mapObject = []
            if (object.map === "sand_planet") {
                mapObject = state.maps.sand_planet
            } else if (object.map === "space0") {
                mapObject = state.maps.space0
            } else if (object.map === "big_house") {
                mapObject = state.maps.big_house
            }
            let block = getBlockFromCor(mapObject, new_x, new_y)
            if (block && block.mapblock.col !== "yes") {
                object.x = new_x
                object.y = new_y
                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'x'],
                    value: object.x,
                })
                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'y'],
                    value: object.y,
                })
            } else if (block && block.mapblock.col === "yes") {
                object.vx = 0
                object.vy = 0
                object.target = null
                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'vx'],
                    value: object.vx,
                })
                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'vy'],
                    value: object.vy,
                })
                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'target'],
                    value: object.target,
                })
            }
            if (block && block.xBlock === villCor[3] && block.yBlock === villCor[4] && object.map === "sand_planet") {
                object.map = "big_house"
                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'map'],
                    value: object.map,
                })
            }
        }


        if (object.target) {
            let xm = object.target[0]
            let ym = object.target[1]

            let dx = xm - object.x
			let dy = ym - object.y

            let vx = 0
            let vy = 0

            if (Math.abs(dx) < ALMOST_ZERO) {
                vy = object.v
                vx = 0
            } else if (Math.abs(dy) < ALMOST_ZERO) {
                vy = 0
                vx = object.v
            } else {
                let k = Math.abs(dx / dy)
			    vy = object.v / Math.sqrt(k * k + 1)
			    vx = k * vy
            }

			if (xm < object.x) {
				vx = -vx
			}
			if (ym < object.y) {
				vy = -vy
			}

            object.vx = vx
            object.vy = vy

            if (
                (object.x > xm - STOP_DIFF && object.x < xm + STOP_DIFF)
                && (object.y > ym - STOP_DIFF && object.y < ym + STOP_DIFF)
            ) {
                object.vx = 0
                object.vy = 0
                object.target = null

                funcs.bulkPatch.push({
                    path: ['objects', objectId, 'target'],
                    value: null,
                })
            }

            funcs.bulkPatch.push({
                path: ['objects', objectId, 'vx'],
                value: object.vx,
            })
            funcs.bulkPatch.push({
                path: ['objects', objectId, 'vy'],
                value: object.vy,
            })
        }
    }

    for (const shotId in state.shots) {
        const shot = state.shots[shotId]
        if (shot.time_not_life <= Date.now()) {
            funcs.delete('shots', shotId)
        } else if (shot.vx !== 0 || shot.vy !== 0) {
            funcs.update(
                ['shots', shot.id, 'x'],
                shot.x + shot.vx * dt
            )
            funcs.update(
                ['shots', shot.id, 'y'],
                shot.y + shot.vy * dt
            )
        }
    }

    if (funcs.bulkPatch.length > 0) {
        broadcast({ stateBulkPatch: funcs.bulkPatch })
    }

}

function get_full_world_state() {
    return state
}

function apply_state_patch(patch) {
    const { path, value } = patch
    _.set(state, path, value)
}

function apply_delete_object(deleteObject) {
    const { kind, id } = deleteObject
    if (state[kind] && state[kind][id]) {
        delete state[kind][id]
    }
}

function generate_object(id, x, y, look, group, nickName, hitpoints, map, game) {
    //_.set(state, ['objects', id], {
        console.log("generate_object")
        game.funcs.update(['objects', id, 'id'], id)
        game.funcs.update(['objects', id, 'y'], y)
        game.funcs.update(['objects', id, 'x'], x)

        game.funcs.update(['objects', id, 'look'], look)
        game.funcs.update(['objects', id, 'group'], group)
        game.funcs.update(['objects', id, 'ai'], ['trooper', 'hitpoints'])

        game.funcs.update(['objects', id, 'g'], 0)
        game.funcs.update(['objects', id, 'vx'], 0)
        game.funcs.update(['objects', id, 'vy'], 0)
        game.funcs.update(['objects', id, 'v'], 0.2)

        game.funcs.update(['objects', id, 'nickName'], nickName)
        game.funcs.update(['objects', id, 'hitpoints'], hitpoints)
        game.funcs.update(['objects', id, 'max_hitpoints'], hitpoints)

        game.funcs.update(['objects', id, 'map'], map)

        // game.funcs.update(['objects', id], {
        //     id,
        //     x,
        //     y,
        //     look,
        //     group,
        //     ai: ['trooper', 'hitpoints'],
        //     g: 0,
        //     vx: 0,
        //     vy: 0,
        //     v: 0.2,

        //     nickName,
        //     hitpoints,
        //     max_hitpoints: hitpoints,

        //     map
        // })


        /*id: id,
        x: x,
        y: y,

        look: look,
        group: group,
        ai: ['trooper', 'hitpoints'],

        g: 0,
        vx: 0,
        vy: 0,
        v: 0.2,

        nickName: nickName,
        hitpoints: hitpoints,
        max_hitpoints: hitpoints,

        map: map
    })*/
}
function generateSome(What, WhatMap, xg, yg, colWhat) {
    WhatMap[xg][yg] = {
        text: What,
        col: colWhat
    }
}

function generateVilageWallLeftRight(mapw, x, y) {
    generateSome("wallleft2", mapw, x, y, "yes")
    generateSome("wallright2", mapw, x + 1, y, "yes")
}

function generateVilageWallUpDown(mapw, x, y) {
    generateSome("wallup2", mapw, x, y, "yes")
    generateSome("walldown2", mapw, x, y + 1, "yes")
}

function generateVilageCornerUpLeft(mapw, x, y) {
    generateSome("wallcornerupleft2", mapw, x, y, "yes")
    generateSome("wallleft2", mapw, x, y + 1, "yes")
    generateSome("wallup2", mapw, x + 1, y, "yes")
    generateSome("wallobcornerdownleft2", mapw, x + 1, y + 1, "yes")
}

function generateVilageCornerUpRight(mapw, x, y) {
    generateSome("wallup2", mapw, x, y, "yes")
    generateSome("wallobcornerdownright2", mapw, x, y + 1, "yes")
    generateSome("wallcornerupright2", mapw, x + 1, y, "yes")
    generateSome("wallright2", mapw, x + 1, y + 1, "yes")
}

function generateVilageCornerDownLeft(mapw, x, y) {
    generateSome("wallleft2", mapw, x, y, "yes")
    generateSome("wallcornerdownleft2", mapw, x, y + 1, "yes")
    generateSome("wallobcornerupright2", mapw, x + 1, y, "yes")
    generateSome("walldown2", mapw, x + 1, y + 1, "yes")
}

function generateVilageCornerDownRight(mapw, x, y) {
    generateSome("wallobcornerupleft2", mapw, x, y, "yes")
    generateSome("walldown2", mapw, x, y + 1, "yes")
    generateSome("wallright2", mapw, x + 1, y, "yes")
    generateSome("wallcornerdownright2", mapw, x + 1, y + 1, "yes")
}

function generateVilageGate(mapv, x, y) {
    generateSome("gateperupleft2", mapv, x, y - 2, "yes")
    generateSome("gateperupright2", mapv, x + 1, y - 2, "yes")
    generateSome("gateupleft2", mapv, x, y - 1, "no")
    generateSome("gateupright2", mapv, x + 1, y - 1, "no")
    generateSome("gatecenterleft2", mapv, x, y, "no")
    generateSome("gatecenteright2", mapv, x + 1, y, "no")
    generateSome("gatedownleft2", mapv, x, y + 1, "no")
    generateSome("gatedownright2", mapv, x + 1, y + 1, "no")
    generateSome("gateperdownleft2", mapv, x, y + 2, "yes")
    generateSome("gateperdownright2", mapv, x + 1, y + 2, "yes")
}

function generateHouseOne(maph, x, y) {
    generateSome("houseupleft", maph, x, y, "yes")
    generateSome("houseup", maph, x + 1, y, "yes")
    generateSome("houseupright", maph, x + 2, y, "yes")
    generateSome("houseleft", maph, x, y + 1, "yes")
    generateSome("housecenter", maph, x + 1, y + 1, "yes")
    generateSome("houseright", maph, x + 2, y + 1, "yes")
    generateSome("housedownleft", maph, x, y + 2, "yes")
    generateSome("housedown", maph, x + 1, y + 2, "yes")
    generateSome("housedownright", maph, x + 2, y + 2, "yes")
}

function generateHouseBig(maph, x, y) {
    generateSome("houseupleft", maph, x, y, "yes")
    generateSome("houseup", maph, x + 1, y, "yes")
    generateSome("houseup", maph, x + 2, y, "yes")
    generateSome("houseupright", maph, x + 3, y, "yes")
    generateSome("houseleft2", maph, x, y + 1, "yes")
    generateSome("housecenter", maph, x + 1, y + 1, "yes")
    generateSome("housecenter", maph, x + 2, y + 1, "yes")
    generateSome("houseright", maph, x + 3, y + 1, "yes")
    generateSome("houseleft2", maph, x, y + 2, "yes")
    generateSome("housecenter2", maph, x + 1, y + 2, "yes")
    generateSome("housecenter2", maph, x + 2, y + 2, "yes")
    generateSome("houseright", maph, x + 3, y + 2, "yes")
    generateSome("houseleft", maph, x, y + 3, "no")
    generateSome("housecenter2", maph, x + 1, y + 3, "yes")
    generateSome("housecenter2", maph, x + 2, y + 3, "yes")
    generateSome("houseright", maph, x + 3, y + 3, "yes")
    generateSome("houseleft2", maph, x, y + 4, "yes")
    generateSome("housecenter", maph, x + 1, y + 4, "yes")
    generateSome("housecenter", maph, x + 2, y + 4, "yes")
    generateSome("houseright", maph, x + 3, y + 4, "yes")
    generateSome("housedownleft", maph, x, y + 5, "yes")
    generateSome("housedown", maph, x + 1, y + 5, "yes")
    generateSome("housedown", maph, x + 2, y + 5, "yes")
    generateSome("housedownright", maph, x + 3, y + 5, "yes")
}

function generate_weapon_trade (naph, x, y) {
    generateSome("privupleft", naph, x, y, "yes")
    generateSome("privup", naph, x + 1, y, "no")
    generateSome("privupright", naph, x + 2, y, "yes")
    generateSome("privdownleft", naph, x, y + 1, "yes")
    generateSome("privdown", naph, x + 1, y + 1, "yes")
    generateSome("privdownright", naph, x + 2, y + 1, "yes")
}

function generateVilageHouses(how, naph, x, y) {
    if (how === 1) {
        generateHouseOne(naph, x + 5, y + 4)
        generateSome("Road2", naph, x + 4, y + 5, "no")
        generateHouseOne(naph, x + 11, y + 4)
        generateSome("Road2", naph, x + 10, y + 5, "no")
        generateHouseOne(naph, x + 5, y + 13)
        generateSome("Road2", naph, x + 4, y + 14, "no")
        generateHouseOne(naph, x + 17, y + 13)
        generateSome("Road2", naph, x + 16, y + 14, "no")
        generateHouseOne(naph, x + 5, y + 17)
        generateSome("Road2", naph, x + 4, y + 18, "no")
        generateHouseOne(naph, x + 11, y + 17)
        generateSome("Road2", naph, x + 10, y + 18, "no")
        generateHouseOne(naph, x + 17, y + 17)
        generateSome("Road2", naph, x + 16, y + 18, "no")
        for(var yh = 5; yh < 19; yh++) {
            generateSome("Road2", naph, x + 3, y + yh, "no")
        }
        for(var yh = 5; yh < 19; yh++) {
            generateSome("Road2", naph, x + 9, y + yh, "no")
        }
        for(var yh = 8; yh < 19; yh++) {
            generateSome("Road2", naph, x + 15, y + yh, "no")
        }
        for(var xr = 2; xr < 16; xr++) {
            for (var yr = 8; yr < 11; yr++) {
                generateSome("Road2", naph, x + xr, y + yr, "no")
            }
        }
        for(var xp = 9; xp < 16; xp++) {
            for (var yp = 11; yp < 13; yp++) {
                generateSome("Road2", naph, x + xp, y + yp, "no")
            }
        }
        generateHouseBig(naph, x + 17, y + 6)
        generateSome("Road2", naph, x + 16, y + 9, "no")
    } else if (how === 2) {
        generateHouseOne(naph, x + 5, y + 3)
        generateSome("Road2", naph, x + 4, y + 4, "no")
        generateHouseOne(naph, x + 11, y + 3)
        generateSome("Road2", naph, x + 10, y + 4, "no")
        generateHouseOne(naph, x + 18, y + 3)
        generateSome("Road2", naph, x + 17, y + 4, "no")
        generateHouseOne(naph, x + 18, y + 7)
        generateSome("Road2", naph, x + 17, y + 8, "no")
        generateHouseOne(naph, x + 12, y + 18)
        generateSome("Road2", naph, x + 11, y + 19, "no")
        generateHouseOne(naph, x + 18, y + 18)
        generateSome("Road2", naph, x + 17, y + 19, "no")
        generateSome("Road2", naph, x + 11, y + 16, "no")
        for(var yh = 4; yh < 8; yh++) {
            generateSome("Road2", naph, x + 3, y + yh, "no")
        }
        for(var yh = 4; yh < 8; yh++) {
            generateSome("Road2", naph, x + 9, y + yh, "no")
        }
        for(var yh = 4; yh < 8; yh++) {
            generateSome("Road2", naph, x + 16, y + yh, "no")
        }
        for(var yh = 16; yh < 20; yh++) {
            generateSome("Road2", naph, x + 10, y + yh, "no")
        }
        for(var yh = 17; yh < 20; yh++) {
            generateSome("Road2", naph, x + 16, y + yh, "no")
        }
        for(var xh = 2; xh < 17; xh++) {
            for(var yh = 8; yh < 11; yh++) {
                generateSome("Road2", naph, x + xh, y + yh, "no")
            }
        }
        for(var xh = 12; xh < 21; xh++) {
            for(var yh = 11; yh < 17; yh++) {
                generateSome("Road2", naph, x + xh, y + yh, "no")
            }
        }
        generateHouseBig(naph, x + 5, y + 11)
        generateSome("Road2", naph, x + 4, y + 14, "no")
        for(var yh = 11; yh < 15; yh++) {
            generateSome("Road2", naph, x + 3, y + yh, "no")
        }
    } else if (how === 3) {
        generateHouseOne(naph, x + 9, y + 4)
        generateHouseOne(naph, x + 14, y + 4)
        generateHouseOne(naph, x + 17, y + 7)
        generateSome("Road2", naph, x + 16, y + 8, "no")
        generateHouseOne(naph, x + 17, y + 11)
        generateSome("Road2", naph, x + 16, y + 12, "no")
        generateHouseOne(naph, x + 9, y + 14)
        generateSome("Road2", naph, x + 8, y + 15, "no")
        generateHouseOne(naph, x + 9, y + 18)
        generateSome("Road2", naph, x + 8, y + 19, "no")
        for(var yh = 11; yh < 20; yh++) {
            generateSome("Road2", naph, x + 7, y + yh, "no")
        }
        for(var yh = 5; yh < 8; yh++) {
            generateSome("Road2", naph, x + 13, y + yh, "no")
        }
        for(var xr = 3; xr < 9; xr++) {
            for (var yr = 3; yr < 11; yr++) {
                generateSome("Road2", naph, x + xr, y + yr, "no")
            }
        }
        for(var xr = 2; xr < 16; xr++) {
            for (var yr = 8; yr < 11; yr++) {
                generateSome("Road2", naph, x + xr, y + yr, "no")
            }
        }
        for(var xr = 13; xr < 16; xr++) {
            for (var yr = 11; yr < 21; yr++) {
                generateSome("Road2", naph, x + xr, y + yr, "no")
            }
        }
        generateHouseBig(naph, x + 17, y + 15)
        generateSome("Road2", naph, x + 16, y + 18, "no")
    }
}

function generateVilageWall (mapc, x, y, type) { //пока что type будет только 1
    if (type === 1) {
        generateVilageCornerUpLeft(mapc, x, y)
        generateVilageCornerUpRight(mapc, x + 22, y)
        generateVilageCornerDownLeft(mapc, x, y + 22)
        generateVilageCornerDownRight(mapc, x + 22, y + 22)
        generateVilageGate(mapc, x, y + 9)
        for (var xForUpWall = 2; xForUpWall < 22; xForUpWall++) {
            generateVilageWallUpDown(mapc, x + xForUpWall, y)
        }
        for (var xForDownWall = 2; xForDownWall < 22; xForDownWall++) {
            generateVilageWallUpDown(mapc, x + xForDownWall, y + 22)
        }
        for (var yForLeftWallo = 2; yForLeftWallo < 7; yForLeftWallo++) {
            generateVilageWallLeftRight(mapc, x, y + yForLeftWallo)
        }
        for (var yForLeftWallt = 12; yForLeftWallt < 22; yForLeftWallt++) {
            generateVilageWallLeftRight(mapc, x, y + yForLeftWallt)
        }
        for (var yForRightWall = 2; yForRightWall < 22; yForRightWall++) {
            generateVilageWallLeftRight(mapc, x + 22, y + yForRightWall)
        }
    }
}
var xgv = 0
var ygv = 0
var ran = 0
var villCor = [0, 0, 0, 0, 0]
function generateAllVilage(map, type) {
    if (type === "sand") {
        while (xgv < 3 || xgv > 74 || ygv < 3 || ygv > 74) {
            xgv = Math.floor(Math.random() * 100)
            ygv = Math.floor(Math.random() * 100)
            console.log(xgv + " " + ygv)
        }
        villCor[0] = xgv
        villCor[1] = ygv

        ran = Math.floor(Math.random() * 3) + 1

        villCor[2] = ran
        if (ran === 1) {
            villCor[3] = xgv + 17
            villCor[4] = ygv + 9
        } else if (ran === 2) {
            villCor[3] = xgv + 5
            villCor[4] = ygv + 14
        } else if (ran === 3) {
            villCor[3] = xgv + 17
            villCor[4] = ygv + 18
        }

        console.log(ran)
        console.log(villCor[3])
        console.log(villCor[4])
        generateVilageHouses(ran, map, xgv, ygv)
        generateVilageWall(map, xgv, ygv, 1)
    }
}

function generateTable(naph, x, y) {
    generateSome("seatleft", naph, x, y, "no")
    generateSome("table1", naph, x + 1, y, "yes")
    generateSome("seatright", naph, x + 2, y, "no")
    generateSome("seatleft", naph, x, y + 1, "no")
    generateSome("table1", naph, x + 1, y + 1, "yes")
    generateSome("seatright", naph, x + 2, y + 1, "no")
}
var palatkCorX = 0
var palatkCorY = 0
//var palatkCorXS = 0
//var palatkCorYS = 0
var colOfEnemySand = 8
var colOfEnemySandNow = 0
function generatePalatk (who, game, map_name) {
    while (palatkCorX < 3 || palatkCorX > 93 || palatkCorY < 3 || palatkCorY > 93) {
        palatkCorX = Math.floor(Math.random() * 100)
        palatkCorY = Math.floor(Math.random() * 100)
        console.log(palatkCorX + " " + palatkCorY)
        if (palatkCorX > villCor[0] - 1 && palatkCorY > villCor[1] - 1 && palatkCorX > villCor[0] + 24 && palatkCorY > villCor[1] + 24) {
            palatkCorY = 0
            palatkCorX = 0
        }
    }
    //palatkCorXS = palatkCorX + 2
    //palatkCorYS = palatkCorY + 4
        /*game.funcs.update(['objects', id, 'id'], who)
        game.funcs.update(['objects', id, 'x'], palatkCorX)
        game.funcs.update(['objects', id, 'y'], palatkCorY)

        game.funcs.update(['objects', id, 'look'], "palatkAll")
        game.funcs.update(['objects', id, 'group'], "palatk")
        game.funcs.update(['objects', id, 'ai'], ['trooper', 'hitpoints'])

        game.funcs.update(['objects', id, 'g'], 0)
        game.funcs.update(['objects', id, 'vx'], 0)
        game.funcs.update(['objects', id, 'vy'], 0)
        game.funcs.update(['objects', id, 'v'], 0)

        game.funcs.update(['objects', id, 'nickName'], who + "'s palatk")
        game.funcs.update(['objects', id, 'hitpoints'], 500)
        game.funcs.update(['objects', id, 'max_hitpoints'], 500)

        game.funcs.update(['objects', id, 'map'], "sand_planet")*/
        _.set(game, ['objects', who], {
            id: who,
            x: palatkCorX * 40,
            y: palatkCorY * 40,
            look: "palatkAll",
            group: "palatk",
            ai: ['trooper', 'hitpoints'],
            g: 0,
            vx: 0,
            vy: 0,
            v: 0,

            nickName: who + "'s palatk",
            hitpoints: 500,
            max_hitpoints: 500,
            map: map_name
        })
}

function generate_sand_planet(width, height) {
    const map = [[]]

    var blocks = ["sand1", "sand1", "sand1", "sand2", "sand2", "sand2"]
    // "dark_sand", "dark_sand"
    //var blocks = ["space1"]
    var numbers = [0, 1, 2, 3, 4, 5]

    for (let x = 0; x < width; x++) {
        map.push(new Array(height))

        for (let y = 0; y < height; y++) {
            let block = numbers[Math.floor(Math.random() * blocks.length)]
            map[x][y] = {
                text: blocks[block],
                col: "no"
            }
        }
    }

    for (var x = 0; x < 101; x++) {
        map[x][0] = {
            text: "rock1",
            col: "yes"
        }
    }
    for (var x = 0; x < 101; x++) {
        map[x][99] = {
            text: "rock1",
            col: "yes"
        }
    }
    for (var y = 0; y < 101; y++) {
        map[0][y] = {
            text: "rock1",
            col: "yes"
        }
    }
    for (var y = 0; y < 101; y++) {
        map[99][y] = {
            text: "rock1",
            col: "yes"
        }
    }

    generateAllVilage(map, "sand")
    return map
}

function generate_space_map(width, height) {
    const map = [[]]
    let map_blocks = ["space1"]

    for (let x = 0; x < width; x++) {
        map.push(new Array(height))

        for (let y = 0; y < height; y++) {
            let block = map_blocks[Math.floor(Math.random() * map_blocks.length)]
            map[x][y] = {
                text: block
            }
        }
    }

    return map
}

function generate_big_house() {
    const map = [[]]
    for (let x = 0; x < 100; x++) {
        map.push(new Array(100))
    }
    for (var x = 0; x < 100; x++) {
        for (var y = 0; y < 100; y++) {
            map[x][y] = {
                text: "nothing",
                col: "no"
            }
        }
    }
    generateSome("wallbhouseupleft", map, 0, 0, "yes")
    for (var x = 1; x < 12; x++) {
        generateSome("wallbhouseup", map, x, 0, "yes")
    }
    generateSome("wallbhouseupright", map, 12, 0, "yes")
    for (var y = 1; y < 7; y++) {
        generateSome("wallbhouseright", map, 12, y, "yes")
    }
    generateSome("wallbhousedownright", map, 12, 7, "yes")
    for (var x = 1; x < 12; x++) {
        generateSome("wallbhousedown", map, x, 7, "yes")
    }
    generateSome("wallbhousedownleft", map, 0, 7, "yes")
    for (var y = 2; y < 7; y++) {
        generateSome("wallbhouseleft", map, 0, y, "yes")
    }
    generateSome("doorbhouse", map, 0, 1, "no")
    for (var x = 1; x < 12; x++) {
        for (var y = 1; y < 7; y++) {
            generateSome("floor", map, x, y, "no")
        }
    }
    for (var x = 3; x < 12; x++) {
        generateSome("table1", map, x, 5, "yes")
    }

    generateTable(map, 3, 1)
    generateTable(map, 6, 1)
    generateTable(map, 9, 1)
    generateSome("seat1", map, 4, 4, "no")
    generateSome("seat1", map, 6, 4, "no")
    generateSome("seat1", map, 8, 4, "no")
    generateSome("seat1", map, 10, 4, "no")
    return map
}


exports.game_start = game_start
exports.get_full_world_state = get_full_world_state
exports.apply_state_patch = apply_state_patch
exports.apply_delete_object = apply_delete_object
const { update } = require('lodash')
const _ = require('lodash')

const { applyAI, addScript } = require('./ai-provider')

const f1 = require('./ai-scripts/hitpoints')
const f2 = require('./ai-scripts/planet')
const f3 = require('./ai-scripts/trooper')

f1(addScript)
f2(addScript)
f3(addScript)

const state = {
    map: [],
    objects: {},
    shots: {},
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

function game_start({ broadcast }) {
    lastBroadcastFunc = broadcast
    /*
        Пока мир один
        Нужно при старте сервера собрать стейт, если он есть
    */
    state.map = game_tmp_gen_map(100, 100)

    setInterval(() => {
        update_world({ broadcast })
    }, 10)
}

let pt = 0
function update_world({ broadcast }) {
    let t = Date.now()
    let dt = 0
    if (pt > 0) {
        dt = t - pt
    }
    pt = t
    if (dt === 0) {
        return
    }

    funcs.bulkPatch = []

    for (const objectId in state.objects) {
        const object = state.objects[objectId]

        if (object.ai) {
            applyAI(object, { state, funcs } , dt)
        }

        if (object.vx > 0) {
            object.x = object.x + object.vx * dt
            funcs.bulkPatch.push({
                path: ['objects', objectId, 'x'],
                value: object.x,
            })

        }
        if (object.vy > 0) {
            object.y = object.y + object.vy * dt
            funcs.bulkPatch.push({
                path: ['objects', objectId, 'y'],
                value: object.y,
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

function generateSome(What, WhatMap, xg, yg) {
    WhatMap[xg][yg] = {
        text: What
    }
}

function generateVilageWallLeftRight(mapw, x, y) {
    generateSome("wallleft2", mapw, x, y)
    generateSome("wallright2", mapw, x + 1, y)
}

function generateVilageWallUpDown(mapw, x, y) {
    generateSome("wallup2", mapw, x, y)
    generateSome("walldown2", mapw, x, y + 1)
}

function generateVilageCornerUpLeft(mapw, x, y) {
    generateSome("wallcornerupleft2", mapw, x, y)
    generateSome("wallleft2", mapw, x, y + 1)
    generateSome("wallup2", mapw, x + 1, y)
    generateSome("wallobcornerdownleft2", mapw, x + 1, y + 1)
}

function generateVilageCornerUpRight(mapw, x, y) {
    generateSome("wallup2", mapw, x, y)
    generateSome("wallobcornerdownright2", mapw, x, y + 1)
    generateSome("wallcornerupright2", mapw, x + 1, y)
    generateSome("wallright2", mapw, x + 1, y + 1)
}

function generateVilageCornerDownLeft(mapw, x, y) {
    generateSome("wallleft2", mapw, x, y)
    generateSome("wallcornerdownleft2", mapw, x, y + 1)
    generateSome("wallobcornerupright2", mapw, x + 1, y)
    generateSome("walldown2", mapw, x + 1, y + 1)
}

function generateVilageCornerDownRight(mapw, x, y) {
    generateSome("wallobcornerupleft2", mapw, x, y)
    generateSome("walldown2", mapw, x, y + 1)
    generateSome("wallright2", mapw, x + 1, y)
    generateSome("wallcornerdownright2", mapw, x + 1, y + 1)
}

function generateVilageGate(mapv, x, y) {
    generateSome("gateperupleft2", mapv, x, y - 2)
    generateSome("gateperupright2", mapv, x + 1, y - 2)
    generateSome("gateupleft2", mapv, x, y - 1)
    generateSome("gateupright2", mapv, x + 1, y - 1)
    generateSome("gatecenterleft2", mapv, x, y)
    generateSome("gatecenteright2", mapv, x + 1, y)
    generateSome("gatedownleft2", mapv, x, y + 1)
    generateSome("gatedownright2", mapv, x + 1, y + 1)
    generateSome("gateperdownleft2", mapv, x, y + 2)
    generateSome("gateperdownright2", mapv, x + 1, y + 2)
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

function game_tmp_gen_map(width, height) {
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
                text: blocks[block]
            }
        }
    }

    for (var x = 0; x < 101; x++) {
        map[x][0] = {
            text: "rock1"
        }
    }
    for (var x = 0; x < 101; x++) {
        map[x][99] = {
            text: "rock1"
        }
    }
    for (var y = 0; y < 101; y++) {
        map[0][y] = {
            text: "rock1"
        }
    }
    for (var y = 0; y < 101; y++) {
        map[99][y] = {
            text: "rock1"
        }
    }

    generateVilageWall (map, 10, 10, 1)
    return map
}

exports.game_tmp_gen_map = game_tmp_gen_map
exports.game_start = game_start
exports.get_full_world_state = get_full_world_state
exports.apply_state_patch = apply_state_patch
exports.apply_delete_object = apply_delete_object
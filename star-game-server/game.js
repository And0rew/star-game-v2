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

function game_tmp_gen_map(width, height) {
    const map = [[]]

    var blocks = ["sand1", "sand1", "sand1", "sand2", "sand2", "sand2", "dark_sand", "dark_sand"]
    //var blocks = ["space1"]
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7]

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
    map[10][10] = {
        text: "wallleft2"
    }
    map[11][10] = {
        text: "wallright2"
    }
    map[10][11] = {
        text: "gateperupleft2"
    }
    map[11][11] = {
        text: "gateperupright2"
    }
    map[10][12] = {
        text: "gateupleft2"
    }
    map[11][12] = {
        text: "gateupright2"
    }
    map[10][13] = {
        text: "gatecenterleft2"
    }
    map[11][13] = {
        text: "gatecenteright2"
    }
    map[10][14] = {
        text: "gatedownleft2"
    }
    map[11][14] = {
        text: "gatedownright2"
    }
    map[10][15] = {
        text: "gateperdownleft2"
    }
    map[11][15] = {
        text: "gateperdownright2"
    }
    map[10][16] = {
        text: "wallleft2"
    }
    map[11][16] = {
        text: "wallright2"
    }
    return map
}

exports.game_tmp_gen_map = game_tmp_gen_map
exports.game_start = game_start
exports.get_full_world_state = get_full_world_state
exports.apply_state_patch = apply_state_patch
exports.apply_delete_object = apply_delete_object
const _ = require('lodash')

let scripts = {}

function addScript(label, func) {
    if (scripts[label]) {
        console.log('Twice logic for', label)
    }
    scripts[label] = func
}

function applyAI(object, game, dt) {
    if (!object.ai) {
        return
    }
    
    const labels = _.isArray(object.ai) ? object.ai : [object.ai]
    for (const label of labels) {
        if (scripts[label]) {
            const func = scripts[label]
            try {
                func(object, game, dt)
            } catch(e) {
                console.log('AI apply error for ', label, object)
                console.error(e)
            }
        }
    }
}

exports.addScript = addScript
exports.applyAI = applyAI

const { getDistance } = require('../utils')


const GRAVITY_LIMIT = 250

module.exports = (addScript) => {
    addScript('planet', (object, game, dt) => {
        if (
            object.planet_center_x == undefined || 
            object.planet_center_y == undefined
        ) {
            return
        }
    
        object.orbit_angle = object.orbit_angle + object.orbit_speed * dt / 1000
    
        if (object.orbit_angle > 360) {
            object.orbit_angle -= 360
        }

        let old_x = object.x
        let old_y = object.y
        
        let new_y = object.planet_center_y + 
            Math.sin(object.orbit_angle / 180 * Math.PI) * object.orbit_radius
    
        let new_x = object.planet_center_x +
            Math.cos(object.orbit_angle / 180 * Math.PI) * object.orbit_radius
    
        game.funcs.update(['objects', object.id, 'x'], new_x)
        game.funcs.update(['objects', object.id, 'y'], new_y) 

        for (let otherObjectId in game.state.objects) {
            const otherObject = game.state.objects[otherObjectId]
            if (otherObject.vx > 0 || otherObject.vy > 0) {
                continue
            }
            if (otherObject.id === object.id) {
                continue
            }

            const dist = getDistance(object, otherObject)            
            if (dist < GRAVITY_LIMIT) {
                const offset_x = otherObject.x - old_x
                const offset_y = otherObject.y - old_y

                const new_object_x = new_x + offset_x
                const new_object_y = new_y + offset_y

                game.funcs.update(['objects', otherObject.id, 'x'], new_object_x)
                game.funcs.update(['objects', otherObject.id, 'y'], new_object_y) 
            }
        }


        
    })
}

AI_functions.planet = function (objectId, object, dt) {
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
    
    let new_y = object.planet_center_y + 
        Math.sin(object.orbit_angle / 180 * Math.PI) * object.orbit_radius

    let new_x = object.planet_center_x +
        Math.cos(object.orbit_angle / 180 * Math.PI) * object.orbit_radius

    game_update(['objects', 'planet_earth', 'x'], new_x)
    game_update(['objects', 'planet_earth', 'y'], new_y)
}
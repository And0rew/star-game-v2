function getDistance(obj1, obj2) {
    var diffX = obj1.x - obj2.x;
    var diffY = obj1.y - obj2.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

function getTurnToTarget(obj1, obj2) {
    let dx = obj2.x - obj1.x
    let dy = obj2.y - obj1.y

    let k = dy / dx
    let g = Math.atan(k) / Math.PI * 180
    if  (dx < 0) {
        g = g - 90
    } else {
        g = g + 90
    }
    return g
}

exports.getDistance = getDistance
exports.getTurnToTarget = getTurnToTarget
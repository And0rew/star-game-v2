function getDistance(obj1, obj2) {
    var diffX = obj1.x - obj2.x;
    var diffY = obj1.y - obj2.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

exports.getDistance = getDistance
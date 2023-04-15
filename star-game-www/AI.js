var AI_functions = {}

var AI = function (myAiId, dt) {
	let object = Game.state.objects[myAiId]
	
	if (!object) {
		return
	}

	// if (object.ai === 'trooper_p') {
	// 	ai_trooper_p(myAiId, object)
	// }

	if (object.ai && AI_functions[object.ai]) {
		AI_functions[object.ai](myAiId, object, dt)
	}

	// var chel
	// if (!chel) {
	// 	for (var key in Game.state.objects) {
	// 		if (key != myAiId) {
	// 			chel = Game.state.objects
	// 		}
	// 	}
	// }
}
var getDistance = function (event, target) {
        var diffX = event.x - target.x;
        var diffY = event.y - target.y;
        return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

AI_functions.trooper_p = function trooper_p(id, object) {
	if (!object.target) {
		for (var key in Game.state.objects) {
		 	if (key.id != id) {
		 		target = Game.state.objects[key]
			}
		}
	}
	if (object.target) {
		// разворот на цель
		// если далеко -- идти
		// если близко -- стрелять
	}
}



module.exports = (addScript) => {
	addScript('trooper', (object, game, dt) => {    
		if (!object.target) {
			for (var key in game.state.objects) {
				//  if (key.id != id) {
				// 	 target = game.state.objects[key]
				// }
			}
		}
		if (object.target) {
			// разворот на цель
			// если далеко -- идти
			// если близко -- стрелять
		}
	})
	
		// var chel
		// if (!chel) {
		// 	for (var key in Game.state.objects) {
		// 		if (key != myAiId) {
		// 			chel = Game.state.objects
		// 		}
		// 	}
		// }
}

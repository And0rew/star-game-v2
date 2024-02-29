const {
	getDistance,
	getTurnToTarget,
} = require('../utils')

const allEnemies = {}


const walkingState = {}
// TODO: Нет цели? Гуляй недалеко в случайном направлении

const attackState = {}
// TODO: Давно не палили по цели? Пальни

const SEE_SIGHT = 280

module.exports = (addScript) => {
	addScript('trooper', (object, game, dt, t) => {
		// TODO: сделать проверку реже

		if (allEnemies[object.id]) {

			const targetObjectId = allEnemies[object.id]
			const targetObject = game.state.objects[targetObjectId]

			if (!targetObject) {
				// Цель уже умерла?
				delete allEnemies[object.id]
				return
			}

			const dist = getDistance(object, targetObject)
			if (dist > SEE_SIGHT) {
				// Цель больше не видна
				delete allEnemies[object.id]
				return
			}

			// Смотри на цель
			const g = getTurnToTarget(object, targetObject)
			game.funcs.update(['objects', object.id, 'g'], g)
		} else {
			// Найти цель
			let minDistance
			let minDistanceId

			for (let otherObjectId in game.state.objects) {
				const otherObject = game.state.objects[otherObjectId]

				if (otherObject.type !== 'character') {
					continue
				}

				if (otherObject.map !== object.map) {
					continue
				}
				if (otherObject.group === object.group) {
					continue
				}

				const dist = getDistance(object, otherObject)
				if (dist < SEE_SIGHT && (minDistance === undefined || dist < minDistance)) {
					minDistance = dist
					minDistanceId = otherObject.id
				}
			}

			if (minDistanceId) {
				allEnemies[object.id] = minDistanceId
			}
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

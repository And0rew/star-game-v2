const {
	getDistance,
	getTurnToTarget,
} = require('../utils')

const {
	gunShot
} = require('../../star-game-www/guns')

const allEnemies = {}


const walkingState = {}
// TODO: Нет цели? Гуляй недалеко в случайном направлении

const attackState = {}
// TODO: Давно не палили по цели? Пальни

const SEE_SIGHT = 280
const ATTACK_RATE = 2000

const WALK_RANGE = 80
const WALK_DIFF_RAND = 1000
const WALK_RATE = 600 // Как часть принимать решение ходить?

module.exports = (addScript) => {
	addScript('trooper', (object, game, dt, t) => {

		if (!object.target) {
			const walkRate = WALK_RATE + WALK_DIFF_RAND * Math.random()
			// Немного пойти куда нить, если стоишь. Что стоять то?
			if (!walkingState[object.id] || (t - walkingState[object.id]) > walkRate) {
				let dir = 1
				if (Math.random() < 0.5) {
					dir = -1
				}
				const xToGo = object.x + dir * Math.round(WALK_RANGE * Math.random())
				const yToGo = object.y + dir * Math.round(WALK_RANGE * Math.random())
				game_update(["objects", object.id, "target"], [xToGo, yToGo])
				walkingState[object.id] = t
			}
		}

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

			if (!attackState[object.id] || (t - attackState[object.id]) > ATTACK_RATE) {
				gunShot(object)
				attackState[object.id]=t
			}
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

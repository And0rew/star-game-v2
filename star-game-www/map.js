var Game = {
		cameraMode: 'fixed',
    resources: {},
    camera:[0, 0],
		cameraSize: [0, 0],
		myId: "",
		currentMap: 'sand_planet',
    state: {
    	maps: {},
    	objects: {},
    	shots: {}
    },
    bloock_r: 1,
    X_Y_block: 40,
	isTrade: false,
	isInventory: false
}
var bigTradeObjects = [["weapon1", "30", 30], ["weapon2", "35", 35], ["weapon3", "45", 45], ["weapon4", "25", 25], ["weapon5", "30", 30], ["weapon6", "40", 40], ["weapon7", "60", 60], ["weapon8", "40", 40], ["weapon9", "100", 100], ["weapon10", "60", 60], ["weapon11", "225", 225]];

function get_block_from_coords(x, y) {
	let block_num_x = Math.floor(x / Game.X_Y_block)
	let block_num_y = Math.floor(y / Game.X_Y_block)
	if (Game.map[block_num_x] && Game.map[block_num_x][block_num_y]) {
		return {
			block_num_x,
			block_num_y,
			block: Game.map[block_num_x][block_num_y]
		}
	}
	return null
}


var start_game = function(canvas, ctx) {
	gs_init()

	game_loadImage('sand1', 'pix/sand1.png')
	game_loadImage('sand_dark', 'pix/sand_dark.png')
	game_loadImage('sand2', 'pix/sand2.png')
	game_loadImage('trooper1', 'pix/trooper1.png')
	game_loadImage('enemy1', 'pix/enemy1.png')
	game_loadImage('enemy404', 'pix/enemy404.png')
	game_loadImage('shot1', 'pix/shot1.png')
	game_loadImage('shot_round', 'pix/shot_round.png')
	game_loadImage('shot_fireball', 'pix/shot_fireball.png')
	game_loadImage('tower1', 'pix/tower1.png')
	game_loadImage('space1', 'pix/space1.png')
	game_loadImage('ship_0', 'pix/ship_0.png')
	game_loadImage('ship_1', 'pix/ship_1.png')
	game_loadImage('ship_2', 'pix/ship_2.png')
	game_loadImage('ship_3', 'pix/ship_3.png')
	game_loadImage('ship_4', 'pix/ship_4.png')
	game_loadImage('ship_5', 'pix/ship_5.png')
	game_loadImage('ship_6', 'pix/ship_6.png')
	game_loadImage('rock1', 'pix/rock1.png')
	game_loadImage('car0', 'pix/car0.png')
	game_loadImage('human', 'pix/human.png')
	game_loadImage('pistolForInv', 'pix/pistolForInv.png')

	game_loadImage('gatecenter1', 'pix/gatecenter1.png') //деревня песка
	game_loadImage('gateup1', 'pix/gateup1.png')
	game_loadImage('gatedown1', 'pix/gatedown1.png')
	game_loadImage('wallup1', 'pix/wallup1.png')

	game_loadImage('gatecenteright2', 'pix/gatecenteright2.png')
	game_loadImage('gatecenterleft2', 'pix/gatecenterleft2.png')
	game_loadImage('gatedownleft2', 'pix/gatedownleft2.png')
	game_loadImage('gatedownright2', 'pix/gatedownright2.png')
	game_loadImage('gateperdownleft2', 'pix/gateperdownleft2.png')
	game_loadImage('gateperdownright2', 'pix/gateperdownright2.png')
	game_loadImage('gateperupleft2', 'pix/gateperupleft2.png')
	game_loadImage('gateperupright2', 'pix/gateperupright2.png')
	game_loadImage('gateupleft2', 'pix/gateupleft2.png')
	game_loadImage('gateupright2', 'pix/gateupright2.png')
	game_loadImage('wallleft2', 'pix/wallleft2.png')
	game_loadImage('wallright2', 'pix/wallright2.png')
	game_loadImage('wallcornerdownleft2', 'pix/wallcornerdownleft2.png')
	game_loadImage('wallcornerdownright2', 'pix/wallcornerdownright2.png')
	game_loadImage('wallcornerupleft2', 'pix/wallcornerupleft2.png')
	game_loadImage('wallcornerupright2', 'pix/wallcornerupright2.png')
	game_loadImage('walldown2', 'pix/walldown2.png')
	game_loadImage('wallobcornerdownleft2', 'pix/wallobcornerdownleft2.png')
	game_loadImage('wallobcornerdownright2', 'pix/wallobcornerdownright2.png')
	game_loadImage('wallobcornerupleft2', 'pix/wallobcornerupleft2.png')
	game_loadImage('wallobcornerupright2', 'pix/wallobcornerupright2.png')
	game_loadImage('wallup2', 'pix/wallup2.png')

	game_loadImage('houseupleft', 'pix/houseupleft.png')
	game_loadImage('houseup', 'pix/houseup.png')
	game_loadImage('houseupright', 'pix/houseupright.png')
	game_loadImage('houseleft', 'pix/houseleft.png')
	game_loadImage('houseleft2', 'pix/houseleft2.png')
	game_loadImage('housecenter', 'pix/housecenter.png')
	game_loadImage('housecenter2', 'pix/housecenter2.png')
	game_loadImage('houseright', 'pix/houseright.png')
	game_loadImage('housedownleft', 'pix/housedownleft.png')
	game_loadImage('housedown', 'pix/housedown.png')
	game_loadImage('housedownright', 'pix/housedownright.png')
	game_loadImage('Road2', 'pix/Road2.png')

	game_loadImage('wallbhouseleft', 'pix/wallbhouseleft.png')
	game_loadImage('wallbhouseright', 'pix/wallbhouseright.png')
	game_loadImage('wallbhousedownleft', 'pix/wallbhousedownleft.png')
	game_loadImage('wallbhousedown', 'pix/wallbhousedown.png')
	game_loadImage('wallbhousedownright', 'pix/wallbhousedownright.png')
	game_loadImage('wallbhouseupleft', 'pix/wallbhouseupleft.png')
	game_loadImage('wallbhouseup', 'pix/wallbhouseup.png')
	game_loadImage('wallbhouseupright', 'pix/wallbhouseupright.png')
	game_loadImage('doorbhouse', 'pix/doorbhouse.png')
	game_loadImage('seatright', 'pix/seatright.png')
	game_loadImage('seatleft', 'pix/seatleft.png')
	game_loadImage('seat1', 'pix/seat1.png')
	game_loadImage('table1', 'pix/table1.png')
	game_loadImage('floor', 'pix/floor.png')
	game_loadImage('nothing', 'pix/nothing.png')

	game_loadImage('privup', 'pix/privup.png')
	game_loadImage('privdown', 'pix/privdown.png')
	game_loadImage('privupleft', 'pix/privupleft.png')
	game_loadImage('privupright', 'pix/privupright.png')
	game_loadImage('privdownleft', 'pix/privdownleft.png')
	game_loadImage('privdownright', 'pix/privdownright.png')

	game_loadImage('palatkcenter1', 'pix/palatkcenter1.png')
	game_loadImage('palatkleft1', 'pix/palatkleft1.png')
	game_loadImage('palatkright1', 'pix/palatkright1.png')
	game_loadImage('palatktupleft1', 'pix/palatktupleft1.png')
	game_loadImage('palatktupright1', 'pix/palatktupright1.png')
	game_loadImage('palatktdownleft1', 'pix/palatktdownleft1.png')
	game_loadImage('palatktdownright1', 'pix/palatktdownright1.png')
	game_loadImage('palatkAll', 'pix/palatkAll.png')

	game_loadImage('weapon1', 'pix/weapon1.png')
	game_loadImage('weapon2', 'pix/weapon2.png')
	game_loadImage('weapon3', 'pix/weapon3.png')
	game_loadImage('weapon4', 'pix/weapon4.png')
	game_loadImage('weapon5', 'pix/weapon5.png')
	game_loadImage('weapon6', 'pix/weapon6.png')
	game_loadImage('weapon7', 'pix/weapon7.png')
	game_loadImage('weapon8', 'pix/weapon8.png')
	game_loadImage('weapon9', 'pix/weapon9.png')
	game_loadImage('weapon10', 'pix/weapon10.png')
	game_loadImage('weapon11', 'pix/weapon11.png')

	game_loadImage('weapon1_sm', 'pix/weapon1_sm.png')
	game_loadImage('weapon2_sm', 'pix/weapon2_sm.png')
	game_loadImage('weapon3_sm', 'pix/weapon3_sm.png')
	game_loadImage('weapon4_sm', 'pix/weapon4_sm.png')
	game_loadImage('weapon5_sm', 'pix/weapon5_sm.png')
	game_loadImage('weapon6_sm', 'pix/weapon6_sm.png')
	game_loadImage('weapon7_sm', 'pix/weapon7_sm.png')
	game_loadImage('weapon8_sm', 'pix/weapon8_sm.png')
	game_loadImage('weapon9_sm', 'pix/weapon9_sm.png')
	game_loadImage('weapon10_sm', 'pix/weapon10_sm.png')
	game_loadImage('weapon11_sm', 'pix/weapon11_sm.png')

	game_loadImage('planet_earth', 'pix/earth.png')
	game_loadImage('planet_mars', 'pix/mars.png')
	game_loadImage('sun', 'pix/sun.png')

	game_loadImage('trooper_v2', 'pix/trooper_body_v2.png')
	game_loadImage('trooper_v2_legs_0', 'pix/trooper_body_v2_legs_0.png')
	game_loadImage('trooper_v2_legs_1', 'pix/trooper_body_v2_legs_1.png')
	game_loadImage('trooper_body_v2_blue', 'pix/trooper_body_v2_blue.png')
	game_loadImage('trooper_body_v2_lime', 'pix/trooper_body_v2_lime.png')
	game_loadImage('trooper_body_v2_orange', 'pix/trooper_body_v2_orange.png')
	game_loadImage("trooper_body_v2_pilot's","pix/trooper_body_v2_pilot's.png")
	game_loadImage('trooper_body_v2_purple', 'pix/trooper_body_v2_purple.png')
	game_loadImage('trooper_body_v2_yellow', 'pix/trooper_body_v2_yellow.png')
	game_loadImage('trooper_body_v2_lemon_lime', 'pix/trooper_body_v2_lemon_lime.png')

	var forImg = function (CorThatNeed, xPixc, yPixc) {
		if (yPixc > xPixc) {
			return [xPixc / yPixc * CorThatNeed, CorThatNeed]
		} else {
			return [CorThatNeed, yPixc / xPixc * CorThatNeed]
		}
	}

	var draw_map = function (width, height) {
		if (!Game.state?.maps[Game.currentMap]) {
			return
		}

		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				let tex
				let texName = Game.state.maps[Game.currentMap][x][y].text
				if (texName === "dark_sand") {
					tex = Game.resources.sand_dark
				} else if (Game.resources[texName]) {
					tex = Game.resources[texName]
				} else {
					tex = Game.resources.sand1
				}
				ctx.drawImage(
					tex,

					x * 40 * Game.bloock_r - Game.camera[0],
					y * 40 * Game.bloock_r - Game.camera[1],

					Game.bloock_r * Game.X_Y_block,
					Game.bloock_r * Game.X_Y_block
				)
			}
		}
	}

	// var STOP_DIFF = 11
	var draw_nickname = function (object) {
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
		let rectWidth = ctx.measureText(object.nickName).width + 6
		ctx.fillRect(
			object.x * Game.bloock_r - Game.camera[0] - 3,
			object.y * Game.bloock_r - Game.camera[1] - 24,
			rectWidth,
			12
		)
		ctx.fillStyle = "Black"
		ctx.fillText(
			object.nickName,

			object.x * Game.bloock_r - Game.camera[0],
			object.y * Game.bloock_r - Game.camera[1] - 15
		)
	}

	var draw_hitpoints = function (object) {
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
		ctx.fillRect(
			object.x * Game.bloock_r - Game.camera[0] - 3,
			object.y * Game.bloock_r - Game.camera[1] - (27 + 12),
			56,
			12
		)
		ctx.fillStyle = "Green"
		ctx.fillRect(
			object.x * Game.bloock_r - Game.camera[0],
			object.y * Game.bloock_r - Game.camera[1] - (27 + 9),
			(50 / object.max_hitpoints) * object.hitpoints,
			6
		)
		ctx.fillStyle = "Black"
	}

	var draw_objects = function (dt) {
		if (!Game.state.objects) {
  			return
  		}
  		var rt = 0

		for(var render_layer = 1; render_layer < 3; render_layer++) {
			for (var key in Game.state.objects) {
				var object = Game.state.objects[key]
				if (object.id === Game.myId && object.map !== Game.currentMap) {
					Game.currentMap = object.map
					Game.camera = [-340, -200]
					Game.bloock_r = 1
				}

				if (object.map && Game.currentMap !== object.map) {
					continue
				}

				if (render_layer === 1 && render_layer !== object.render_layer) {
					continue
				} else if (render_layer === 2 && object.render_layer !== undefined) {
					continue
				}

				if (object.vx !== 0 || object.vy !== 0) {
					let new_x = object.x + object.vx * dt
					let new_y = object.y + object.vy * dt

					if (new_x > 0 && new_x < 4001 && new_y > 0 && new_y < 41) {
						// скорость 0
					} else if (new_y > 3959 && new_y < 4001 && new_x > 0 && new_x < 4001) {

					} else if (new_y > 0 && new_y < 4001 && new_x > 0 && new_x < 41) {

					} else if (new_x > 3959 && new_x < 4001 && new_y > 0 && new_y < 4001) {

					} else {
						object.x = new_x //object.x + object.vx * dt
						object.y = new_y // object.y + object.vy * dt
					}

					// if (Game.myId === key && object.target) {
					// 	let xm = object.target[0]
					// 	let ym = object.target[1]

					// 	if (
					// 		(object.x > xm - STOP_DIFF && object.x < xm + STOP_DIFF)
					// 		&& (object.y > ym - STOP_DIFF && object.y < ym + STOP_DIFF)
					// 	) {
					// 		game_update(["objects", key, "vx"], 0)
					// 		game_update(["objects", key, "vy"], 0)
					// 		game_update(["objects", key, "x"], object.x)
					// 		game_update(["objects", key, "y"], object.y)
					// 	}

					// }

				}

				if (object.carSit) {
					continue
				}

				// shadowCtx.save()
				ctx.save()
				draw_object(ctx, object)
				if (object.type === 'car') {
					draw_car_seats(ctx, object)
				}
				// shadowCtx.restore()
				ctx.restore()

				if (object.nickName != null) {
					draw_nickname(object)
				}

				if (object.hitpoints != null) {
					draw_hitpoints(object)
				}
			}
		}
	}

	var draw_shots = function (dt) {
		if (!Game.state.shots) {
  			return
  		}

		for (var key in Game.state.shots) {
			var shot = Game.state.shots[key]

			if (shot.map && Game.currentMap !== shot.map) {
				continue
			}

			// if (shot.time_not_life <= Date.now()) {
			// 	delete Game.state.shots[key]
			// 	console.log("умер")
			// 	continue
			// }

			// if (shot.vx !== 0 || shot.vy !== 0) {
			// 	shot.x = shot.x + shot.vx * dt
			// 	shot.y = shot.y + shot.vy * dt
			// }

			let tex = Game.resources.shot1
			if (shot.tex) {
				tex = Game.resources[shot.tex]
			}

			ctx.save()
			ctx.translate(
				shot.x * Game.bloock_r - Game.camera[0],
				shot.y * Game.bloock_r - Game.camera[1]
			);
			ctx.rotate(shot.g / 180 * Math.PI);
			ctx.drawImage(
				tex,

				-Game.bloock_r * tex.width / 2,
				-Game.bloock_r * tex.height / 2,

				Game.bloock_r * tex.width,
				Game.bloock_r * tex.height

			)
			ctx.restore()
		}
	}

	var draw_object = function (ctx, object, options = {}) {
		let tex2

		if (object.look === "trooper1") {
			tex2 = Game.resources.trooper1
		} else if (object.look === "tower1") {
			tex2 = Game.resources.tower1
		} else if (Game.resources[object.look]) {
			tex2 = Game.resources[object.look]
		}

		if (!tex2) {
			return
		}

		let x = options?.x ?? object.x * Game.bloock_r - Game.camera[0]
		let y = options?.y ?? object.y * Game.bloock_r - Game.camera[1]

		ctx.translate(x, y)
		// shadowCtx.translate(x, y)

		const text_g = object.lookOptions?.ang ?? 0

		ctx.rotate((object.g - text_g) / 180 * Math.PI);
		// shadowCtx.rotate((object.g - text_g) / 180 * Math.PI);

		if (object.lookOptions?.legs && (object.vx !== 0 || object.vy !== 0)) {
			if (object.lookOptions.legsIndex === undefined) {
				object.lookOptions.legsIndex = 0
				object.lookOptions.legsTimer = t
			} else if (t - object.lookOptions.legsTimer > object.lookOptions.legsSpeed) {
				object.lookOptions.legsIndex = (object.lookOptions.legsIndex + 1) % object.lookOptions.legs.length
				object.lookOptions.legsTimer = t
			}
			const tex_name = object.lookOptions.legs[object.lookOptions.legsIndex]
			const legs_tex = Game.resources[tex_name]

			ctx.drawImage(
				legs_tex,

				-Game.bloock_r * legs_tex.width / 2,
				-Game.bloock_r * legs_tex.height / 2,

				Game.bloock_r * legs_tex.width,
				Game.bloock_r * legs_tex.height
			)
			// shadowCtx.drawImage(
			// 	legs_tex,

			// 	-Game.bloock_r * legs_tex.width / 2,
			// 	-Game.bloock_r * legs_tex.height / 2,

			// 	Game.bloock_r * legs_tex.width,
			// 	Game.bloock_r * legs_tex.height
			// )
		}

		if (object.gun) {
			let gun = ALL_GUNS[object.gun]
			let gunTex = Game.resources[gun.tex]
			ctx.save()
			ctx.translate(
				gun.renderOpt.x * Game.bloock_r,
				gun.renderOpt.y * Game.bloock_r
			);
			ctx.rotate(gun.renderOpt.g / 180 * Math.PI);
			ctx.drawImage(
				gunTex,

				-Game.bloock_r * gun.renderOpt.w / 2,  //- tex2.width / 2,
				-Game.bloock_r * gun.renderOpt.h / 2, //- tex2.height / 2,

				Game.bloock_r * gun.renderOpt.w,
				Game.bloock_r * gun.renderOpt.h
			)
			ctx.restore()

			// shadowCtx.save()
			// shadowCtx.translate(
			// 	gun.renderOpt.x * Game.bloock_r,
			// 	gun.renderOpt.y * Game.bloock_r
			// );
			// shadowCtx.rotate(gun.renderOpt.g / 180 * Math.PI);
			// shadowCtx.drawImage(
			// 	gunTex,

			// 	-Game.bloock_r * gun.renderOpt.w / 2,  //- tex2.width / 2,
			// 	-Game.bloock_r * gun.renderOpt.h / 2, //- tex2.height / 2,

			// 	Game.bloock_r * gun.renderOpt.w,
			// 	Game.bloock_r * gun.renderOpt.h
			// )
			// shadowCtx.restore()
		}

		ctx.drawImage(
			tex2,

			-Game.bloock_r * tex2.width / 2,  //- tex2.width / 2,
			-Game.bloock_r * tex2.height / 2, //- tex2.height / 2,

			Game.bloock_r * tex2.width,
			Game.bloock_r * tex2.height
		)
		if (!object.renderOpt?.noShadow) {
			// shadowCtx.drawImage(
			// 	tex2,

			// 	-Game.bloock_r * tex2.width / 2,  //- tex2.width / 2,
			// 	-Game.bloock_r * tex2.height / 2, //- tex2.height / 2,

			// 	Game.bloock_r * tex2.width,
			// 	Game.bloock_r * tex2.height
			// )
		}


	}

	var draw_car_seats = function(ctx, object) {
		if (object.driverId) {
			const driverId = object.driverId
			const driver = Game.state.objects[driverId]
			draw_object(ctx, driver, { x:0, y: 0 })
		}
		for (const passengerId in object.passengerIds) {
			const passenger = Game.state.objects[passengerId]
			draw_object(ctx, passenger, { x: 40, y: 0 })
		}
	}

	var scaleX = 0
	var scaleY = 0



	var draw_trade = function() {
		if (Game.isTrade === false) {
			return
		}
		//посчитать scale x и scale y
		scaleX = (window.innerWidth - 840) / 2;
		scaleY = (window.innerHeight - 555) / 2
		ctx.fillStyle = "Grey"
		ctx.strokeStyle = "Black"
		ctx.lineWidth = 1;
		for (var x = 0; x < 55 * 2; x = x + 55) {
			for (var y = 0; y < 55 * 10; y = y + 55) {
				ctx.fillRect(x + scaleX, y + scaleY, 55, 55)
				ctx.strokeRect(x + scaleX, y + scaleY, 55, 55);
			}
		}
		ctx.fillStyle = "#e5aa7a"
		ctx.fillRect(scaleX + 110, scaleY, 495, 550)
		ctx.fillStyle = "Grey"
		for (var x = 0; x < 55 * 4; x = x + 55) {
			for (var y = 0; y < 55 * 10; y = y + 55) {
				ctx.fillRect(x + scaleX + 605, y + scaleY, 55, 55)
				ctx.strokeRect(x + scaleX + 605, y + scaleY, 55, 55);
			}
		}

		ctx.font = "25px Comic Sans MS";
		ctx.fillStyle = "Black"
		ctx.textAlign = "left";
        ctx.textBaseline = "top";
		ctx.fillText("Buy", scaleX + 120, scaleY + 5);
		ctx.textAlign = "right";
		ctx.fillText("Sell", scaleX + 600, scaleY + 5);
		ctx.textAlign = "left";
		ctx.font = "15px Comic Sans MS";

		var xShopNow = 0
		var yShopNow = 0
		var text = "sand0"
		var tex2
		for (var justCor = 0; justCor < bigTradeObjects.length; justCor++) {
			if (yShopNow > 9) {
				xShopNow++
				yShopNow -= 10
			}
			text = bigTradeObjects[justCor][0]

			if (Game.resources[text]) {
				tex2 = Game.resources[text]
			}

			if (!tex2) {
				return
			}

			ctx.drawImage(
				tex2,

				scaleX + (55 * xShopNow),
				scaleY + (55 * yShopNow),

				forImg(55, tex2.width, tex2.height)[0],
				forImg(55, tex2.width, tex2.height)[1]
			)
			ctx.fillText(bigTradeObjects[justCor][1], scaleX + (55 * xShopNow) + 15, scaleY + (55 * yShopNow) + 40);
			yShopNow++
		}
		var xShopNowP = 0
		var yShopNowP = 0
		var textP = "sand0"
		var tex2P
		var doTexP
		var myPlayerShopping = Game.state.objects[Game.myId];
		if (myPlayerShopping && myPlayerShopping.inventory) {
			for (var justCorP = 0; justCorP < myPlayerShopping.inventory.guns.length; justCorP++) {


				if (yShopNowP > 9) {
					xShopNowP++
					yShopNowP -= 10
				}
				doTexP = myPlayerShopping.inventory.guns[justCorP][0]
				textP = ALL_GUNS[doTexP].tex
				textP = textP.slice(0, textP.length - 3)
				if (Game.resources[textP]) {
					tex2P = Game.resources[textP]
				}

				if (!tex2P) {
					return
				}

				ctx.drawImage(
					tex2P,

					scaleX + (55 * xShopNowP) + 605,
					scaleY + (55 * yShopNowP),

					forImg(55, tex2P.width, tex2P.height)[0],
					forImg(55, tex2P.width, tex2P.height)[1]
				)
				ctx.fillText(myPlayerShopping.inventory.guns[justCorP][1], scaleX + (55 * xShopNowP) + 620, scaleY + (55 * yShopNowP) + 40);
				yShopNowP++
			}
		ctx.font = "20px Comic Sans MS";
		ctx.fillStyle = "Black"
        ctx.textBaseline = "top";
		ctx.textAlign = "right";
		ctx.fillText("Gold: " + myPlayerShopping.inventory.gold, scaleX + 600, scaleY + 35);
		}
		ctx.textAlign = "left";
        ctx.textBaseline = "middle";
		ctx.font = "11px Arial";
	}

	var textI = "sand0"
	var tex2I
	var draw_inventory = function () {
		if (Game.isInventory === false) {
			return
		}
		//посчитать scale x и scale y
		scaleX = (window.innerWidth - 840) / 2;
		scaleY = (window.innerHeight - 555) / 2
		ctx.fillStyle = "Grey"
		ctx.strokeStyle = "Black"
		ctx.lineWidth = 1;
		ctx.fillStyle = "#e5aa7a"
		ctx.fillRect(scaleX, scaleY, 495, 550)
		ctx.fillStyle = "Grey"
		for (var x = 0; x < 55 * 4; x = x + 55) {
			for (var y = 0; y < 55 * 10; y = y + 55) {
				ctx.fillRect(x + scaleX + 495, y + scaleY, 55, 55)
				ctx.strokeRect(x + scaleX + 495, y + scaleY, 55, 55);
			}
		}

		ctx.fillRect(scaleX + 385, scaleY + 55, 55, 55)
		ctx.strokeRect(scaleX + 385, scaleY + 55, 55, 55);

		var myPlayer = Game.state.objects[Game.myId];

		if (myPlayer.gun === undefined) {

			var textI = "sand0"
			var tex2I
			textI = "pistolForInv"

			if (Game.resources[textI]) {
				tex2I = Game.resources[textI]
			}

			if (!tex2I) {
				return
			}

			ctx.drawImage(
				tex2I,

				scaleX + 385,
				scaleY + 55,

				forImg(55, tex2I.width, tex2I.height)[0],
				forImg(55, tex2I.width, tex2I.height)[1]
			)
		}

		var yINow = 0
		var xINow = 0
		var textP
		var tex2P
		var doTexP

		ctx.textBaseline = "top";
		ctx.textAlign = "left";
		ctx.font = "15px Comic Sans MS";
		ctx.fillStyle = "Black"
		if (myPlayer && myPlayer.inventory && myPlayer.inventory.guns[0]) {
			for (var justCorP = 0; justCorP < myPlayer.inventory.guns.length; justCorP++) {


				if (yINow > 9) {
					xINow++
					yINow -= 10
				}
				doTexP = myPlayer.inventory.guns[justCorP][0]
				textP = ALL_GUNS[doTexP].tex
				textP = textP.slice(0, textP.length - 3)


				if (Game.resources[textP]) {
					tex2P = Game.resources[textP]
				}

				if (!tex2P) {
					return
				}

				ctx.drawImage(
					tex2P,

					scaleX + (55 * xINow) + 495,
					scaleY + (55 * yINow),

					forImg(55, tex2P.width, tex2P.height)[0],
					forImg(55, tex2P.width, tex2P.height)[1]
				)
				ctx.fillText(myPlayer.inventory.guns[justCorP][1], scaleX + (55 * xINow) + 510, scaleY + (55 * yINow) + 40);
				yINow++
			}
		}
		console.log(myPlayer.gun)
		if (myPlayer.gun !== undefined) {
			var textP1 = myPlayer.gun
			var textP2 = ALL_GUNS[textP1].tex
			var textP = textP2.slice(0, textP2.length - 3)

			if (Game.resources[textP]) {
				tex2P = Game.resources[textP]
			}

			if (!tex2P) {
				return
			}

			ctx.drawImage(
				tex2P,

				scaleX + 385,
				scaleY + 55,

				forImg(55, tex2P.width, tex2P.height)[0],
				forImg(55, tex2P.width, tex2P.height)[1]
			)
		}
		ctx.textAlign = "left";
        ctx.textBaseline = "middle";
		ctx.font = "11px Arial";
	}

	function drawTalk () {

	}

	setTimeout(() => {
		window.requestAnimationFrame(render)
	}, 500)

	var t = Date.now()
	var pt = 0
	var dt = 0

	var render = function () {
		pt = t
		t = Date.now()
		dt = t - pt


		ctx.clearRect(0, 0, innerWidth, innerHeight)


		// Game.camera[0] = Game.camera[0] - 20
		// Game.camera[1] = Game.camera[1] - 20
		if (Game.cameraMode == 'follow' && Game.myId && Game.state.objects[Game.myId]) {
			const objectMe = Game.state.objects[Game.myId]
			Game.camera[0] = objectMe.x * Game.bloock_r - Game.cameraSize[0] / 2
			Game.camera[1] = objectMe.y * Game.bloock_r - Game.cameraSize[1] / 2
		}

		draw_map(100,100)

		// Draw shadows
		// shadowCtx.globalCompositeOperation = 'source-atop';
		// shadowCtx.fillStyle = 'rgba(50, 50, 50, 0.9)'; // Semi-transparent black
		// shadowCtx.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);
		// shadowCtx.filter = 'blur(2px)'

		// Apply transformation for perspective (this part is highly dependent on your game's perspective)
		// // shadowCtx.setTransform(1, 0, -0.5, 0.5, 0, 0); // Example transformation
		// Step 3: Draw the shadow on the main canvas with an offset
		// ctx.drawImage(shadowCanvas, 5, 5);

		// shadowCtx.globalCompositeOperation = 'source-over';
		// shadowCtx.clearRect(0, 0, innerWidth, innerHeight)

		draw_objects(dt)

		draw_shots(dt)

		draw_trade()

		draw_inventory()

		window.requestAnimationFrame(render)
	}
}
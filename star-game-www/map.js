var Game = {
    resources: {},
    camera:[0, 0],
		currentMap: 'sand_planet',
    state: {
    	maps: {},
    	objects: {},
    	shots: {}
    },
    bloock_r: 1,
    X_Y_block: 40
}

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

	game_loadImage('palatkcenter1', 'pix/palatkcenter1.png')
	game_loadImage('palatkleft1', 'pix/palatkleft1.png')
	game_loadImage('palatkright1', 'pix/palatkright1.png')
	game_loadImage('palatktupleft1', 'pix/palatktupleft1.png')
	game_loadImage('palatktupright1', 'pix/palatktupright1.png')
	game_loadImage('palatktdownleft1', 'pix/palatktdownleft1.png')
	game_loadImage('palatktdownright1', 'pix/palatktdownright1.png')

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

				shadowCtx.save()
				ctx.save()
				draw_object(ctx, object)
				if (object.type === 'car') {
					draw_car_seats(ctx, object)
				}
				shadowCtx.restore()
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

			var tex = Game.resources.shot1

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
		console.log(object.map)
		console.log(Game.currentMap)
		if (object.map !== Game.currentMap) {
			console.log(object.map)
			Game.currentMap === object.map
			console.log(Game.currentMap)
		}
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
		shadowCtx.translate(x, y)

		const text_g = object.lookOptions?.ang ?? 0

		ctx.rotate((object.g - text_g) / 180 * Math.PI);
		shadowCtx.rotate((object.g - text_g) / 180 * Math.PI);

		ctx.drawImage(
			tex2,

			-Game.bloock_r * tex2.width / 2,  //- tex2.width / 2,
			-Game.bloock_r * tex2.height / 2, //- tex2.height / 2,

			Game.bloock_r * tex2.width,
			Game.bloock_r * tex2.height
		)
		shadowCtx.drawImage(
			tex2,

			-Game.bloock_r * tex2.width / 2,  //- tex2.width / 2,
			-Game.bloock_r * tex2.height / 2, //- tex2.height / 2,

			Game.bloock_r * tex2.width,
			Game.bloock_r * tex2.height
		)

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
			shadowCtx.drawImage(
				legs_tex,

				-Game.bloock_r * legs_tex.width / 2,
				-Game.bloock_r * legs_tex.height / 2,

				Game.bloock_r * legs_tex.width,
				Game.bloock_r * legs_tex.height
			)
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

		draw_map(100,100)

		// Draw shadows
		shadowCtx.globalCompositeOperation = 'source-atop';
		shadowCtx.fillStyle = 'rgba(50, 50, 50, 0.9)'; // Semi-transparent black
		shadowCtx.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);
		shadowCtx.filter = 'blur(2px)'

		// Apply transformation for perspective (this part is highly dependent on your game's perspective)
		// shadowCtx.setTransform(1, 0, -0.5, 0.5, 0, 0); // Example transformation
		// Step 3: Draw the shadow on the main canvas with an offset
		ctx.drawImage(shadowCanvas, 5, 5);

		shadowCtx.globalCompositeOperation = 'source-over';
		shadowCtx.clearRect(0, 0, innerWidth, innerHeight)

		draw_objects(dt)

		draw_shots(dt)

		window.requestAnimationFrame(render)
	}
}
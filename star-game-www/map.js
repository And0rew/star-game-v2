var Game = {
    resources: {},
    camera:[0, 0],
    state: {
    	map: [[]],
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
	game_loadImage('shot1', 'pix/shot1.png')
	game_loadImage('tower1', 'pix/tower1.png')
	game_loadImage('space1', 'pix/space1.png')
	game_loadImage('ship_0', 'pix/ship_0.png')
	game_loadImage('ship_1', 'pix/ship_1.png')
	game_loadImage('ship_2', 'pix/ship_2.png')
	game_loadImage('ship_3', 'pix/ship_3.png')
	game_loadImage('ship_4', 'pix/ship_4.png')
	game_loadImage('ship_5', 'pix/ship_5.png')
	game_loadImage('rock1', 'pix/rock1.png')
	game_loadImage('car0', 'pix/car0.png')

	game_loadImage('planet_earth', 'pix/earth.png')
	game_loadImage('planet_mars', 'pix/mars.png')
	game_loadImage('sun', 'pix/sun.png')

  	var draw_map = function (width, height) {
  		if (!Game.state.map) {
  			return
  		}

		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				let tex
				let texName = Game.state.map[x][y].text
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

	var STOP_DIFF = 11

	var draw_objects = function (dt) {
		if (!Game.state.objects) {
  			return
  		}
  		var tex2
  		var rt = 0

		for(var render_layer = 1; render_layer < 3; render_layer++) {
			for (var key in Game.state.objects) {
				var object = Game.state.objects[key]

				if (render_layer === 1 && render_layer !== object.render_layer) {
					continue
				} else if (render_layer === 2 && object.render_layer !== undefined) {
					continue
				}

				if (object.vx !== 0 || object.vy !== 0) {
					let new_x = object.x + object.vx * dt
					let new_y = object.y + object.vy * dt
					
					/* проверить что блок под new_x new_y это не рок */

					if (new_x > 0 && new_x < 4001 && new_y > 0 && new_y < 41) {
						// скорость 0
					} else if (new_x > 0 && new_x < 4001 && new_y > 3979 && new_y < 4001) {

					} else if (new_y > 0 && new_y < 4001 && new_x > 0 && new_x < 41) {

					} else if (new_y > 0 && new_y < 4001 && new_x > 3979 && new_x < 4001) {

					} else {
						object.x = new_x //object.x + object.vx * dt
						object.y = new_y // object.y + object.vy * dt	
					}

					if (Game.myId === key && object.target) {
						let xm = object.target[0]
						let ym = object.target[1]

						if (
							(object.x > xm - STOP_DIFF && object.x < xm + STOP_DIFF)
							&& (object.y > ym - STOP_DIFF && object.y < ym + STOP_DIFF)
						) {
							game_update(["objects", key, "vx"], 0)
							game_update(["objects", key, "vy"], 0)
							game_update(["objects", key, "x"], object.x)
							game_update(["objects", key, "y"], object.y)
						}

					}

				}



				if (object.look === "trooper1") {
					tex2 = Game.resources.trooper1
				} else if (object.look === "tower1") {
					tex2 = Game.resources.tower1
				} else if (Game.resources[object.look]) {
					tex2 = Game.resources[object.look]
				}

				ctx.save()
				ctx.translate(
					object.x * Game.bloock_r - Game.camera[0] + Game.bloock_r * tex2.width / 2,
					object.y * Game.bloock_r - Game.camera[1] + Game.bloock_r * tex2.height / 2
				);
				ctx.rotate(object.g / 180 * Math.PI);
				ctx.drawImage(
					tex2,

					-Game.bloock_r * tex2.width / 2 - tex2.width / 2,
					-Game.bloock_r * tex2.height / 2 - tex2.height / 2,

					Game.bloock_r * tex2.width,
					Game.bloock_r * tex2.height

				)
				ctx.restore()
				if (object.nickName != null) {
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
				// ctx.fillText(
				// 	object.hitpoints,

				// 	object.x * Game.bloock_r - Game.camera[0],
				// 	object.y * Game.bloock_r - Game.camera[1] - 30
				// )
				if (object.hitpoints != null) {
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
			}
		}
	}

	var draw_shots = function (dt) {
		if (!Game.state.shots) {
  			return
  		}

		for (var key in Game.state.shots) {
			var shot = Game.state.shots[key]

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
		draw_objects(dt)
		draw_shots(dt)

		window.requestAnimationFrame(render)
	}
}
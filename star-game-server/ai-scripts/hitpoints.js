
var uron = 20
var RadPop = 0
var ux = 0
var uy = 0

module.exports = (addScript) => {
    addScript('hitpoints', (object, game) => {
        for (var key in game.state.shots) {
            var shot = game.state.shots[key]
            if (!shot) {
                return
            }
    
    
            if (object.look === "trooper1") {
                RadPop = 31
                ux = 49 / 2
                uy = 30 / 2
            } else if (object.look === "tower1") {
                RadPop = 81
                ux = 40
                uy = 40
            }
    
            // console.log(
            //     'Checking shot', 
            //     {
            //         shot,
            //         object,
            //     }
            // )
    
            if (shot.x > object.x + ux - RadPop && shot.x < object.x + ux + RadPop) {
                if (shot.y > object.y + uy - RadPop && shot.y < object.y + uy + RadPop) {
                    if (object.id != shot.myid) {                                                            
                        game.funcs.delete('shots', key)
                        if (object.hitpoints <= 0) {
                            game.funcs.delete('objects', object.id)
                        } else {
                            game.funcs.update(
                                ['objects', object.id, 'hitpoints'], 
                                object.hitpoints - uron
                            )
                        }
                    }
                }
            }        
        }
    })
}

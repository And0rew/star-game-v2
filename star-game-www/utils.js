function genId() {
  return `${Date.now()}_${Math.random()}`
}

exports.genId = genId
global.genId = genId
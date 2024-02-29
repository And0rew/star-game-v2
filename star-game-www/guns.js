let ALL_GUNS = {
  shotgun_0: {
    id: 'shotgun_0',
    name: 'Shotgun',
    tex: 'weapon7_sm',
    ground: true,
    renderOpt: {
      w: 41,
      h: 20,
      x: 0,
      y: 22,
      g: 90,
    },

    shot: {
      damage: 20, // я думаю перезарядка средняя
      v: 0.4,
      life: 500,
      x: 0,
      y: 0,
      tex: 'shot_round',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 10 })
      spawnOneShot({ object, gun, g: object.g + 10 })
    }
  },
  assault_rifle_0: {
    id: 'assault_rifle_0',
    name: 'Assault Rifle',
    tex: 'weapon8_sm',
    ground: true,
    renderOpt: {
      w: 55,
      h: 25,
      x: 0,
      y: 22,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 20, // перезарядка маленькая
      v: 0.4,
      life: 800,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      for (let i = -2; i <= 2; i++) {
        spawnOneShot({ object, gun, g: object.g + i * 45, l: 160})
      }
    }
  },
  weapon1: {
    id: 'weapon1',
    name: 'weapon1',
    tex: 'weapon1_sm',
    ground: true,
    renderOpt: {
      w: 39,
      h: 30,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 15, //перезарядка маленькая
      v: 0.2,
      life: 1800,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  },
  weapon2: {
    id: 'weapon2',
    name: 'weapon2',
    tex: 'weapon2_sm',
    ground: true,
    renderOpt: {
      w: 29,
      h: 28,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 45, //перезарядка средняя
      v: 0.3,
      life: 500,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  },
  weapon3: {
    id: 'weapon3',
    name: 'weapon3',
    tex: 'weapon3_sm',
    ground: true,
    renderOpt: {
      w: 38,
      h: 28,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 20, //перезарядка средняя
      v: 0.3,
      life: 900,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })

      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 100)
      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 200)
    }
  },
  weapon4: {
    id: 'weapon4',
    name: 'weapon4',
    tex: 'weapon4_sm',
    ground: true,
    renderOpt: {
      w: 32,
      h: 25,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 15, //перезарядка большая
      v: 0.2,
      life: 900,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })

      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 100)
      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 200)

      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 400)
      setTimeout(() => {
        spawnOneShot({ object, gun, g: object.g})
      }, 500)
    }
  },
  weapon5: {
    id: 'weapon5',
    name: 'weapon5',
    tex: 'weapon5_sm',
    ground: true,
    renderOpt: {
      w: 35,
      h: 25,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 50, //перезарядка огромная
      v: 0.3,
      life: 1500,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
    }
  },
  weapon6: {
    id: 'weapon6',
    name: 'weapon6',
    tex: 'weapon6_sm',
    ground: true,
    renderOpt: {
      w: 33,
      h: 22,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 25, //перезарядка огромная
      v: 0.2,
      life: 1300,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 1 })
      spawnOneShot({ object, gun, g: object.g + 1 })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
    }
  },
  weapon9: {
    id: 'weapon9',
    name: 'weapon9',
    tex: 'weapon9_sm',
    ground: true,
    renderOpt: {
      w: 26,
      h: 23,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 15, //перезарядка средняя
      v: 0.4,
      life: 1300,
      x: 0,
      y: 0,
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 1 })
      spawnOneShot({ object, gun, g: object.g + 1 })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
      spawnOneShot({ object, gun, g: object.g - 3 })
      spawnOneShot({ object, gun, g: object.g + 3 })
      spawnOneShot({ object, gun, g: object.g - 4 })
      spawnOneShot({ object, gun, g: object.g + 4 })
      spawnOneShot({ object, gun, g: object.g - 5 })
      spawnOneShot({ object, gun, g: object.g + 5 })
      spawnOneShot({ object, gun, g: object.g - 6 })
      spawnOneShot({ object, gun, g: object.g + 6 })
      spawnOneShot({ object, gun, g: object.g - 7 })
      spawnOneShot({ object, gun, g: object.g + 7 })
      spawnOneShot({ object, gun, g: object.g - 8 })
      spawnOneShot({ object, gun, g: object.g + 8 })
      spawnOneShot({ object, gun, g: object.g - 9 })
      spawnOneShot({ object, gun, g: object.g + 9 })
      spawnOneShot({ object, gun, g: object.g - 10 })
      spawnOneShot({ object, gun, g: object.g + 10 })
      spawnOneShot({ object, gun, g: object.g - 11 })
      spawnOneShot({ object, gun, g: object.g + 11 })
      spawnOneShot({ object, gun, g: object.g - 12 })
      spawnOneShot({ object, gun, g: object.g + 12 })
      spawnOneShot({ object, gun, g: object.g - 13 })
      spawnOneShot({ object, gun, g: object.g + 13 })
      spawnOneShot({ object, gun, g: object.g - 14 })
      spawnOneShot({ object, gun, g: object.g + 14 })
      spawnOneShot({ object, gun, g: object.g - 15 })
      spawnOneShot({ object, gun, g: object.g + 15 })
      spawnOneShot({ object, gun, g: object.g - 16 })
      spawnOneShot({ object, gun, g: object.g + 16 })
      spawnOneShot({ object, gun, g: object.g - 17 })
      spawnOneShot({ object, gun, g: object.g + 17 })
      spawnOneShot({ object, gun, g: object.g - 18 })
      spawnOneShot({ object, gun, g: object.g + 18 })
      spawnOneShot({ object, gun, g: object.g - 19 })
      spawnOneShot({ object, gun, g: object.g + 19 })
      spawnOneShot({ object, gun, g: object.g - 20 })
      spawnOneShot({ object, gun, g: object.g + 20 })
      spawnOneShot({ object, gun, g: object.g - 21 })
      spawnOneShot({ object, gun, g: object.g + 21 })
      spawnOneShot({ object, gun, g: object.g - 22 })
      spawnOneShot({ object, gun, g: object.g + 22 })
      spawnOneShot({ object, gun, g: object.g - 23 })
      spawnOneShot({ object, gun, g: object.g + 23 })
      spawnOneShot({ object, gun, g: object.g - 24 })
      spawnOneShot({ object, gun, g: object.g + 24 })
      spawnOneShot({ object, gun, g: object.g - 25 })
      spawnOneShot({ object, gun, g: object.g + 25 })
      spawnOneShot({ object, gun, g: object.g - 26 })
      spawnOneShot({ object, gun, g: object.g + 26 })
      spawnOneShot({ object, gun, g: object.g - 27 })
      spawnOneShot({ object, gun, g: object.g + 27 })
      spawnOneShot({ object, gun, g: object.g - 28 })
      spawnOneShot({ object, gun, g: object.g + 28 })
      spawnOneShot({ object, gun, g: object.g - 29 })
      spawnOneShot({ object, gun, g: object.g + 29 })
      spawnOneShot({ object, gun, g: object.g - 30 })
      spawnOneShot({ object, gun, g: object.g + 30 })
      spawnOneShot({ object, gun, g: object.g - 31 })
      spawnOneShot({ object, gun, g: object.g + 31 })
      spawnOneShot({ object, gun, g: object.g - 32 })
      spawnOneShot({ object, gun, g: object.g + 32 })
      spawnOneShot({ object, gun, g: object.g - 33 })
      spawnOneShot({ object, gun, g: object.g + 33 })
      spawnOneShot({ object, gun, g: object.g - 34 })
      spawnOneShot({ object, gun, g: object.g + 34 })
      spawnOneShot({ object, gun, g: object.g - 35 })
      spawnOneShot({ object, gun, g: object.g + 35 })
      spawnOneShot({ object, gun, g: object.g - 36 })
      spawnOneShot({ object, gun, g: object.g + 36 })
      spawnOneShot({ object, gun, g: object.g - 37 })
      spawnOneShot({ object, gun, g: object.g + 37 })
      spawnOneShot({ object, gun, g: object.g - 38 })
      spawnOneShot({ object, gun, g: object.g + 38 })
      spawnOneShot({ object, gun, g: object.g - 39 })
      spawnOneShot({ object, gun, g: object.g + 39 })
      spawnOneShot({ object, gun, g: object.g - 40 })
      spawnOneShot({ object, gun, g: object.g + 40 })
      spawnOneShot({ object, gun, g: object.g - 41 })
      spawnOneShot({ object, gun, g: object.g + 41 })
      spawnOneShot({ object, gun, g: object.g - 42 })
      spawnOneShot({ object, gun, g: object.g + 42 })
      spawnOneShot({ object, gun, g: object.g - 43 })
      spawnOneShot({ object, gun, g: object.g + 43 })
      spawnOneShot({ object, gun, g: object.g - 44 })
      spawnOneShot({ object, gun, g: object.g + 44 })
      spawnOneShot({ object, gun, g: object.g - 45 })
      spawnOneShot({ object, gun, g: object.g + 45 })
      spawnOneShot({ object, gun, g: object.g - 46 })
      spawnOneShot({ object, gun, g: object.g + 46 })
      spawnOneShot({ object, gun, g: object.g - 47 })
      spawnOneShot({ object, gun, g: object.g + 47 })
      spawnOneShot({ object, gun, g: object.g - 48 })
      spawnOneShot({ object, gun, g: object.g + 48 })
      spawnOneShot({ object, gun, g: object.g - 49 })
      spawnOneShot({ object, gun, g: object.g + 49 })
      spawnOneShot({ object, gun, g: object.g - 50 })
      spawnOneShot({ object, gun, g: object.g + 50 })
      spawnOneShot({ object, gun, g: object.g - 51 })
      spawnOneShot({ object, gun, g: object.g + 51 })
      spawnOneShot({ object, gun, g: object.g - 52 })
      spawnOneShot({ object, gun, g: object.g + 52 })
      spawnOneShot({ object, gun, g: object.g - 53 })
      spawnOneShot({ object, gun, g: object.g + 53 })
      spawnOneShot({ object, gun, g: object.g - 54 })
      spawnOneShot({ object, gun, g: object.g + 54 })
      spawnOneShot({ object, gun, g: object.g - 55 })
      spawnOneShot({ object, gun, g: object.g + 55 })
      spawnOneShot({ object, gun, g: object.g - 56 })
      spawnOneShot({ object, gun, g: object.g + 56 })
      spawnOneShot({ object, gun, g: object.g - 57 })
      spawnOneShot({ object, gun, g: object.g + 57 })
      spawnOneShot({ object, gun, g: object.g - 58 })
      spawnOneShot({ object, gun, g: object.g + 58 })
      spawnOneShot({ object, gun, g: object.g - 59 })
      spawnOneShot({ object, gun, g: object.g + 59 })
      spawnOneShot({ object, gun, g: object.g - 60 })
      spawnOneShot({ object, gun, g: object.g + 60 })
      spawnOneShot({ object, gun, g: object.g - 61 })
      spawnOneShot({ object, gun, g: object.g + 61 })
      spawnOneShot({ object, gun, g: object.g - 62 })
      spawnOneShot({ object, gun, g: object.g + 62 })
      spawnOneShot({ object, gun, g: object.g - 63 })
      spawnOneShot({ object, gun, g: object.g + 63 })
      spawnOneShot({ object, gun, g: object.g - 64 })
      spawnOneShot({ object, gun, g: object.g + 64 })
      spawnOneShot({ object, gun, g: object.g - 65 })
      spawnOneShot({ object, gun, g: object.g + 65 })
      spawnOneShot({ object, gun, g: object.g - 66 })
      spawnOneShot({ object, gun, g: object.g + 66 })
      spawnOneShot({ object, gun, g: object.g - 67 })
      spawnOneShot({ object, gun, g: object.g + 67 })
      spawnOneShot({ object, gun, g: object.g - 68 })
      spawnOneShot({ object, gun, g: object.g + 68 })
      spawnOneShot({ object, gun, g: object.g - 69 })
      spawnOneShot({ object, gun, g: object.g + 69 })
      spawnOneShot({ object, gun, g: object.g - 70 })
      spawnOneShot({ object, gun, g: object.g + 70 })
      spawnOneShot({ object, gun, g: object.g - 71 })
      spawnOneShot({ object, gun, g: object.g + 71 })
      spawnOneShot({ object, gun, g: object.g - 72 })
      spawnOneShot({ object, gun, g: object.g + 72 })
      spawnOneShot({ object, gun, g: object.g - 73 })
      spawnOneShot({ object, gun, g: object.g + 73 })
      spawnOneShot({ object, gun, g: object.g - 74 })
      spawnOneShot({ object, gun, g: object.g + 74 })
      spawnOneShot({ object, gun, g: object.g - 75 })
      spawnOneShot({ object, gun, g: object.g + 75 })
      spawnOneShot({ object, gun, g: object.g - 76 })
      spawnOneShot({ object, gun, g: object.g + 76 })
      spawnOneShot({ object, gun, g: object.g - 77 })
      spawnOneShot({ object, gun, g: object.g + 77 })
      spawnOneShot({ object, gun, g: object.g - 78 })
      spawnOneShot({ object, gun, g: object.g + 78 })
      spawnOneShot({ object, gun, g: object.g - 79 })
      spawnOneShot({ object, gun, g: object.g + 79 })
      spawnOneShot({ object, gun, g: object.g - 80 })
      spawnOneShot({ object, gun, g: object.g + 80 })
      spawnOneShot({ object, gun, g: object.g - 81 })
      spawnOneShot({ object, gun, g: object.g + 81 })
      spawnOneShot({ object, gun, g: object.g - 82 })
      spawnOneShot({ object, gun, g: object.g + 82 })
      spawnOneShot({ object, gun, g: object.g - 83 })
      spawnOneShot({ object, gun, g: object.g + 83 })
      spawnOneShot({ object, gun, g: object.g - 84 })
      spawnOneShot({ object, gun, g: object.g + 84 })
      spawnOneShot({ object, gun, g: object.g - 85 })
      spawnOneShot({ object, gun, g: object.g + 85 })
      spawnOneShot({ object, gun, g: object.g - 86 })
      spawnOneShot({ object, gun, g: object.g + 86 })
      spawnOneShot({ object, gun, g: object.g - 87 })
      spawnOneShot({ object, gun, g: object.g + 87 })
      spawnOneShot({ object, gun, g: object.g - 88 })
      spawnOneShot({ object, gun, g: object.g + 88 })
      spawnOneShot({ object, gun, g: object.g - 89 })
      spawnOneShot({ object, gun, g: object.g + 89 })
      spawnOneShot({ object, gun, g: object.g - 90 })
      spawnOneShot({ object, gun, g: object.g + 90 })
      spawnOneShot({ object, gun, g: object.g - 91 })
      spawnOneShot({ object, gun, g: object.g + 91 })
      spawnOneShot({ object, gun, g: object.g - 92 })
      spawnOneShot({ object, gun, g: object.g + 92 })
      spawnOneShot({ object, gun, g: object.g - 93 })
      spawnOneShot({ object, gun, g: object.g + 93 })
      spawnOneShot({ object, gun, g: object.g - 94 })
      spawnOneShot({ object, gun, g: object.g + 94 })
      spawnOneShot({ object, gun, g: object.g - 95 })
      spawnOneShot({ object, gun, g: object.g + 95 })
      spawnOneShot({ object, gun, g: object.g - 96 })
      spawnOneShot({ object, gun, g: object.g + 96 })
      spawnOneShot({ object, gun, g: object.g - 97 })
      spawnOneShot({ object, gun, g: object.g + 97 })
      spawnOneShot({ object, gun, g: object.g - 98 })
      spawnOneShot({ object, gun, g: object.g + 98 })
      spawnOneShot({ object, gun, g: object.g - 99 })
      spawnOneShot({ object, gun, g: object.g + 99 })
      spawnOneShot({ object, gun, g: object.g - 100 })
      spawnOneShot({ object, gun, g: object.g + 100 })
      spawnOneShot({ object, gun, g: object.g - 101 })
      spawnOneShot({ object, gun, g: object.g + 101 })
      spawnOneShot({ object, gun, g: object.g - 102 })
      spawnOneShot({ object, gun, g: object.g + 102 })
      spawnOneShot({ object, gun, g: object.g - 103 })
      spawnOneShot({ object, gun, g: object.g + 103 })
      spawnOneShot({ object, gun, g: object.g - 104 })
      spawnOneShot({ object, gun, g: object.g + 104 })
      spawnOneShot({ object, gun, g: object.g - 105 })
      spawnOneShot({ object, gun, g: object.g + 105 })
      spawnOneShot({ object, gun, g: object.g - 106 })
      spawnOneShot({ object, gun, g: object.g + 106 })
      spawnOneShot({ object, gun, g: object.g - 107 })
      spawnOneShot({ object, gun, g: object.g + 107 })
      spawnOneShot({ object, gun, g: object.g - 108 })
      spawnOneShot({ object, gun, g: object.g + 108 })
      spawnOneShot({ object, gun, g: object.g - 109 })
      spawnOneShot({ object, gun, g: object.g + 109 })
      spawnOneShot({ object, gun, g: object.g - 110 })
      spawnOneShot({ object, gun, g: object.g + 110 })
      spawnOneShot({ object, gun, g: object.g - 111 })
      spawnOneShot({ object, gun, g: object.g + 111 })
      spawnOneShot({ object, gun, g: object.g - 112 })
      spawnOneShot({ object, gun, g: object.g + 112 })
      spawnOneShot({ object, gun, g: object.g - 113 })
      spawnOneShot({ object, gun, g: object.g + 113 })
      spawnOneShot({ object, gun, g: object.g - 114 })
      spawnOneShot({ object, gun, g: object.g + 114 })
      spawnOneShot({ object, gun, g: object.g - 115 })
      spawnOneShot({ object, gun, g: object.g + 115 })
      spawnOneShot({ object, gun, g: object.g - 116 })
      spawnOneShot({ object, gun, g: object.g + 116 })
      spawnOneShot({ object, gun, g: object.g - 117 })
      spawnOneShot({ object, gun, g: object.g + 117 })
      spawnOneShot({ object, gun, g: object.g - 118 })
      spawnOneShot({ object, gun, g: object.g + 118 })
      spawnOneShot({ object, gun, g: object.g - 119 })
      spawnOneShot({ object, gun, g: object.g + 119 })
      spawnOneShot({ object, gun, g: object.g - 120 })
      spawnOneShot({ object, gun, g: object.g + 120 })
      spawnOneShot({ object, gun, g: object.g - 121 })
      spawnOneShot({ object, gun, g: object.g + 121 })
      spawnOneShot({ object, gun, g: object.g - 122 })
      spawnOneShot({ object, gun, g: object.g + 122 })
      spawnOneShot({ object, gun, g: object.g - 123 })
      spawnOneShot({ object, gun, g: object.g + 123 })
      spawnOneShot({ object, gun, g: object.g - 124 })
      spawnOneShot({ object, gun, g: object.g + 124 })
      spawnOneShot({ object, gun, g: object.g - 125 })
      spawnOneShot({ object, gun, g: object.g + 125 })
      spawnOneShot({ object, gun, g: object.g - 126 })
      spawnOneShot({ object, gun, g: object.g + 126 })
      spawnOneShot({ object, gun, g: object.g - 127 })
      spawnOneShot({ object, gun, g: object.g + 127 })
      spawnOneShot({ object, gun, g: object.g - 128 })
      spawnOneShot({ object, gun, g: object.g + 128 })
      spawnOneShot({ object, gun, g: object.g - 129 })
      spawnOneShot({ object, gun, g: object.g + 129 })
      spawnOneShot({ object, gun, g: object.g - 130 })
      spawnOneShot({ object, gun, g: object.g + 130 })
      spawnOneShot({ object, gun, g: object.g - 131 })
      spawnOneShot({ object, gun, g: object.g + 131 })
      spawnOneShot({ object, gun, g: object.g - 132 })
      spawnOneShot({ object, gun, g: object.g + 132 })
      spawnOneShot({ object, gun, g: object.g - 133 })
      spawnOneShot({ object, gun, g: object.g + 133 })
      spawnOneShot({ object, gun, g: object.g - 134 })
      spawnOneShot({ object, gun, g: object.g + 134 })
      spawnOneShot({ object, gun, g: object.g - 135 })
      spawnOneShot({ object, gun, g: object.g + 135 })
      spawnOneShot({ object, gun, g: object.g - 136 })
      spawnOneShot({ object, gun, g: object.g + 136 })
      spawnOneShot({ object, gun, g: object.g - 137 })
      spawnOneShot({ object, gun, g: object.g + 137 })
      spawnOneShot({ object, gun, g: object.g - 138 })
      spawnOneShot({ object, gun, g: object.g + 138 })
      spawnOneShot({ object, gun, g: object.g - 139 })
      spawnOneShot({ object, gun, g: object.g + 139 })
      spawnOneShot({ object, gun, g: object.g - 140 })
      spawnOneShot({ object, gun, g: object.g + 140 })
      spawnOneShot({ object, gun, g: object.g - 141 })
      spawnOneShot({ object, gun, g: object.g + 141 })
      spawnOneShot({ object, gun, g: object.g - 142 })
      spawnOneShot({ object, gun, g: object.g + 142 })
      spawnOneShot({ object, gun, g: object.g - 143 })
      spawnOneShot({ object, gun, g: object.g + 143 })
      spawnOneShot({ object, gun, g: object.g - 144 })
      spawnOneShot({ object, gun, g: object.g + 144 })
      spawnOneShot({ object, gun, g: object.g - 145 })
      spawnOneShot({ object, gun, g: object.g + 145 })
      spawnOneShot({ object, gun, g: object.g - 146 })
      spawnOneShot({ object, gun, g: object.g + 146 })
      spawnOneShot({ object, gun, g: object.g - 147 })
      spawnOneShot({ object, gun, g: object.g + 147 })
      spawnOneShot({ object, gun, g: object.g - 148 })
      spawnOneShot({ object, gun, g: object.g + 148 })
      spawnOneShot({ object, gun, g: object.g - 149 })
      spawnOneShot({ object, gun, g: object.g + 149 })
      spawnOneShot({ object, gun, g: object.g - 150 })
      spawnOneShot({ object, gun, g: object.g + 150 })
      spawnOneShot({ object, gun, g: object.g - 151 })
      spawnOneShot({ object, gun, g: object.g + 151 })
      spawnOneShot({ object, gun, g: object.g - 152 })
      spawnOneShot({ object, gun, g: object.g + 152 })
      spawnOneShot({ object, gun, g: object.g - 153 })
      spawnOneShot({ object, gun, g: object.g + 153 })
      spawnOneShot({ object, gun, g: object.g - 154 })
      spawnOneShot({ object, gun, g: object.g + 154 })
      spawnOneShot({ object, gun, g: object.g - 155 })
      spawnOneShot({ object, gun, g: object.g + 155 })
      spawnOneShot({ object, gun, g: object.g - 156 })
      spawnOneShot({ object, gun, g: object.g + 156 })
      spawnOneShot({ object, gun, g: object.g - 157 })
      spawnOneShot({ object, gun, g: object.g + 157 })
      spawnOneShot({ object, gun, g: object.g - 158 })
      spawnOneShot({ object, gun, g: object.g + 158 })
      spawnOneShot({ object, gun, g: object.g - 159 })
      spawnOneShot({ object, gun, g: object.g + 159 })
      spawnOneShot({ object, gun, g: object.g - 160 })
      spawnOneShot({ object, gun, g: object.g + 160 })
      spawnOneShot({ object, gun, g: object.g - 161 })
      spawnOneShot({ object, gun, g: object.g + 161 })
      spawnOneShot({ object, gun, g: object.g - 162 })
      spawnOneShot({ object, gun, g: object.g + 162 })
      spawnOneShot({ object, gun, g: object.g - 163 })
      spawnOneShot({ object, gun, g: object.g + 163 })
      spawnOneShot({ object, gun, g: object.g - 164 })
      spawnOneShot({ object, gun, g: object.g + 164 })
      spawnOneShot({ object, gun, g: object.g - 165 })
      spawnOneShot({ object, gun, g: object.g + 165 })
      spawnOneShot({ object, gun, g: object.g - 166 })
      spawnOneShot({ object, gun, g: object.g + 166 })
      spawnOneShot({ object, gun, g: object.g - 167 })
      spawnOneShot({ object, gun, g: object.g + 167 })
      spawnOneShot({ object, gun, g: object.g - 168 })
      spawnOneShot({ object, gun, g: object.g + 168 })
      spawnOneShot({ object, gun, g: object.g - 169 })
      spawnOneShot({ object, gun, g: object.g + 169 })
      spawnOneShot({ object, gun, g: object.g - 170 })
      spawnOneShot({ object, gun, g: object.g + 170 })
      spawnOneShot({ object, gun, g: object.g - 171 })
      spawnOneShot({ object, gun, g: object.g + 171 })
      spawnOneShot({ object, gun, g: object.g - 172 })
      spawnOneShot({ object, gun, g: object.g + 172 })
      spawnOneShot({ object, gun, g: object.g - 173 })
      spawnOneShot({ object, gun, g: object.g + 173 })
      spawnOneShot({ object, gun, g: object.g - 174 })
      spawnOneShot({ object, gun, g: object.g + 174 })
      spawnOneShot({ object, gun, g: object.g - 175 })
      spawnOneShot({ object, gun, g: object.g + 175 })
      spawnOneShot({ object, gun, g: object.g - 176 })
      spawnOneShot({ object, gun, g: object.g + 176 })
      spawnOneShot({ object, gun, g: object.g - 177 })
      spawnOneShot({ object, gun, g: object.g + 177 })
      spawnOneShot({ object, gun, g: object.g - 178 })
      spawnOneShot({ object, gun, g: object.g + 178 })
      spawnOneShot({ object, gun, g: object.g - 179 })
      spawnOneShot({ object, gun, g: object.g + 179 })
      spawnOneShot({ object, gun, g: object.g - 180 })
      spawnOneShot({ object, gun, g: object.g + 180 })
    }
  },
  weapon10: {
    id: 'weapon10',
    name: 'weapon10',
    tex: 'weapon10_sm',
    ground: true,
    renderOpt: {
      w: 40,
      h: 24,
      x: 0,
      y: 15,
      g: 90,
    },
    damage: 10,

    shot: {
      damage: 5, //перезарядка менькая
      v: 0.8,
      life: 400,
      x: 0,
      y: 0,
      tex: 'shot_fireball',
    },
    spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
    }
  },
  weapon11: {
    id: 'weapon11',
    name: 'weapon11',
    tex: 'weapon11_sm',
    ground: true,
    renderOpt: {
      w: 59,
      h: 23,
      x: 0,
      y: 15,
      g: 90,
     },
     damage: 10,
  
     shot: {
       damage: 30, //перезарядка средняя
       v: 1,
       life: 300,
       x: 0,
       y: 0,
       tex: 'shot_fireball',
     },
     spawnShots: (object, gun) => {
      spawnOneShot({ object, gun, g: object.g })
      spawnOneShot({ object, gun, g: object.g - 2 })
      spawnOneShot({ object, gun, g: object.g + 2 })
    }
  }
}

// Test function to spawn guns on a ground
function spawn_guns() {
  let fromX = 10 * 40
  let fromY = 3 * 40
  let stepY = 80

  for (let i in ALL_GUNS) {
    let gun = ALL_GUNS[i]
    let id = genId()
    
    console.log(gun)
    console.log(gun.ground)
    if (gun.ground === true) {
      game_update(['objects', id], {
        type: 'gun',
  
        id: id,
        gunId: gun.id,
  
        x: fromX,
        y: fromY,
  
        g: 0, vx: 0, vy: 0, v: 0,
  
        look: gun.tex,
        map: 'sand_planet',
  
        renderOpt: {
          noShadow: true,
        },
  
        render_layer: 1,
      })
  
      fromY += stepY
    }
  }
}

let GUN_GRAB_DIST = 40 * 2

function tryToGrabGun(player) {
  console.log('tryToGrabGun')

  for (let key in Game.state.objects) {
    var gun = Game.state.objects[key]
    if (gun.type === "gun"
      && Math.abs(player.x - gun.x) < GUN_GRAB_DIST
      && Math.abs(player.y - gun.y) < GUN_GRAB_DIST
    ) {
      console.log('tryToGrabGun.gun_found')

      game_update(['objects', player.id, 'gun'], gun.gunId)
      game_delete('objects', gun.id)

      return
    }
  }
}


function oldGunShot(object) {
  let k = Math.tan(object.g / 180 * Math.PI)
  let V_SHOT = 0.4
  var vy = V_SHOT / Math.sqrt(k * k + 1)
  var vx = Math.abs(k * vy)

  if (object.g >= 0 && object.g < 90) {
    vy = -vy
  } else if (object.g <= 0 && object.g > -90) {
    vy = -vy
    vx = -vx
  } else if (object.g <= -90 && object.g > -180) {
    vx = -vx
  }

  var life = 3000
  var date_create = Date.now()
  var shotId = random(16)

  game_update(["shots", shotId], {
    id: shotId,
    x: object.x + 49 / 2,
    y: object.y + 30 / 2,
    g: object.g,
    vx: vx,
    vy: vy,
    v: V_SHOT,
    date_create: date_create,
    time_life: life,
    time_not_life: date_create + life,
    myid: Game.myId,
    map: object.map,
  })
  console.log(["Id:", shotId, "x:", Game.state.shots[shotId].x, "y:", Game.state.shots[shotId].y, "g:", Game.state.shots[shotId].g].join(" "))
}

function gunShot(object) {
  if (!object.gun) {
    // return oldGunShot(object)
    return
  }

  let gun = ALL_GUNS[object.gun]
  if (gun.spawnShots) {
    gun.spawnShots(object, gun)
    return
  }
}

function spawnOneShot({ object, gun, x, y, g, l = 0 }) {
  if (!x) {
    x = object.x
  }
  if (!y) {
    y = object.y
  }

  let vShot = gun.shot.v
  var life = gun.shot.life

  let alfa = g / 180 * Math.PI
  let k = Math.tan(alfa)
  var vy = vShot / Math.sqrt(k * k + 1)
  var vx = Math.abs(k * vy)

  if (g >= 0 && g < 90) {
    vy = -vy
  } else if (g <= 0 && g > -90) {
    vy = -vy
    vx = -vx
  } else if (g <= -90 && g > -180) {
    vx = -vx
  }

  let date_create = Date.now()
  let shotId = genId()

  game_update(["shots", shotId], {
    id: shotId,
    x: x - l * Math.cos(alfa + Math.PI / 2),
    y: y - l * Math.sin(alfa + Math.PI / 2),
    g: g,
    vx: vx,
    vy: vy,
    v: vShot,
    date_create: date_create,
    time_life: life,
    time_not_life: date_create + life,
    myid: object.id,
    map: object.map,
    tex: gun.shot.tex,
  })
}
// 关卡地图
const customsPassMap_ = [
  // need = 通关的分数  seed = 速度  map = 地图
  // 地图：x = 障碍物   isPass = 是否通过
  // 1、
  {
    need: 10,
    seed: 100,
    isPass: false,
    map: [
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','x','x','x','x','x','x','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','']
    ]
  },
  // 2、
  {
    need: 20,
    seed: 90,
    isPass: false,
    map: [
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','x','x','x','x','x','x','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','x','','','','','x','','','','','','','','x','','x','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','x','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','']
    ]
  },
  {
    need: 20,
    seed: 80,
    isPass: false,
    map: [
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','x','x','x','','','','','','','','','','','x','x','x','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','x','x','x','','','','','','','','','',''],
      ['','','','','','x','','','','','','x','x','x','','','','','','x','','','',''],
      ['','','','','','','x','','','','','','','','','','','','x','','','','',''],
      ['','','','x','','','','x','','','','','','','','','','x','','','x','','',''],
      ['','','','x','','','','','x','','','','','','','','x','','','','x','','',''],
      ['','','','x','','','','','','x','','','','','','x','','','','','x','','',''],
      ['','','','','','','','','','','x','x','x','x','x','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','',''],
      ['','','','','','','','','','','','','','','','','','','','','','','','']
    ]
  }
]
// 判断关卡进度
export function customsPassMap() {
  customsPassMap_.forEach((v1, i1) => {
    if (i1 <= this.customsPassSchedule - 1) {
      customsPassMap_[i1].isPass = true
    }
  })
  return customsPassMap_
}

// 无尽地图
export function endlessMap() {
  const map = []
  const endlessMapRow = this.localData['设置'].endlessMapRow || 20,
  endlessMapCol = this.localData['设置'].endlessMapCol || 25
  for (let i1 = 0; i1 < endlessMapRow; i1 ++) {
    map.push([])
    for (let i2 = 0; i2 < endlessMapCol; i2 ++) {
      map[i1].push("")
    }
  }
  return map
}

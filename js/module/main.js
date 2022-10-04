// 手指方向
import direction from './direction.js'
// 存放属性
import { state, addState }  from './state.js'
// 创建
import create from './create.js'
// 通用的方法
import general from './general.js'
// 行为
import action from './action.js'
// 功能
import functionality from './functionality.js'
// 统计与设置
import statisticsAndSettings from './statisticsAndSettings.js'


// 构建实例
export default class Main {
  constructor() {
    this.state = state
    this.newFirst()
  }
}

// 添加方法 通用
Object.assign(Main.prototype, {
  addState
})

// 使用
use(general)
use(create)
use(action)
use(functionality)
use(direction)
use(statisticsAndSettings)

// 把文件里面的所有方法放到实例里
// fileName = 文件名
function use(fileName) {
  // 将通用文件里面的所以方法放到main实例下面
  for (const key in fileName) {
    Object.assign(Main.prototype, {
      [`${key}`]: fileName[key]
    })
  }
}

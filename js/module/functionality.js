// 开始 做的事情有：
// 创建 蛇 元素
// 生成 果实 元素
function begin() {
  const s = this.state
  // 只要第一次按的时候才会执行开始事件
  s.start = false
  // 游戏开始状态
  s.gameStatus = true
  this.createSnake()
  this.createFruit()
  // 根据模式判断取哪种时间，无尽模式时间是固定的，闯关模式时间是根据关卡来的
  if (s.gameMode === '无尽模式') {
    s.seed = s.initialEndlessSpeed
  } else {
    s.seed = s.customsPassData.seed
  }
    // 判断手指方向
  this.direction((dir) =>{
    this.addState('dir', dir)
    // start不等于开始的时候，就开始
    // 防止多次执行开始方法
    if (!s.start) {
      this.snakeMove()
    }
    s.start = true
  })
}

// 第一次 new 要做的事
function newFirst() {
  const { modal_success, modal_error } = this.state,
  s = this.state,
  localData = this.getLocal()
  // 更改作用域
  const getBack_ = this.getBack.bind(this),
  restart_ = this.restart.bind(this)
  // 监听模态框点击按钮 绑定返回方法
  // 返回
  modal_success.querySelector('.content .getBack').addEventListener('click', getBack_)
  modal_error.querySelector('.content .getBack').addEventListener('click', getBack_)
  // 重新开始
  modal_error.querySelector('.content .restart').addEventListener('click', restart_)
  if (localData) {
    s.localData = localData
  }

  // 将取到的 cookie数据放到实例里面
  for (const key1 in s.localData) {
    for (const key2 in s.localData[key1]) {
      s[key2] = s.localData[key1][key2]
    }
  }

  // 无尽模式失败弹框没有返回按钮
  document.querySelector('.getBackNone').classList.add('none')
  // 渲染统计页面
  this.rendering()
  // 默认是无尽模式
  this.createMap(s.endlessMap())
  // 开始
  this.begin()
}

// 结束
function finish(text) {
  // 进行一些初始化
  const s = this.state
  // 游戏状态
  s.gameStatus = false
  if (s.targetEl) {
    s.targetEl.innerHTML = 0
  }
  s.presentEl.innerHTML = 0
  // 将document上的事件清空
  document.onkeydown = null
  // 这里要注意顺序，不然会卡出bug
  s.start = true
  alert(text)
}

// 成功弹框
function modal_success(type) {
  const { modal_success } = this.state
  if (type === '显示') {
    modal_success.classList.remove('none')
  } else {
    modal_success.classList.add('none')
  }
}

// 失败弹框
function modal_error(type, text) {
  const { modal_error } = this.state
  modal_error.querySelector('p').innerHTML = text || '很遗憾，失败了'
  if (type === '显示') {
    modal_error.classList.remove('none')
  } else {
    modal_error.classList.add('none')
  }
}

// 返回
function getBack() {
  const { customsPassWarp, map } = this.state
  customsPassWarp.classList.remove('none')
  this.optionCustomsPass()
  map.remove()
  this.modal_error('隐藏')
  this.modal_success('隐藏')
}

// 重新开始
function restart() {
  const s = this.state
  this.modal_error('隐藏')
  this.modal_success('隐藏')
  // 删除当前的地图
  // 后面会插入新的地图
  s.map.remove()
  // 判断模式选择选择哪一种地图
  if (s.gameMode !== '无尽模式') {
    this.createMap(s.customsPassData.map)
    s.targetEl.innerHTML = s.customsPassData.need
  } else {
    this.createMap(s.endlessMap())
  }
  this.begin()
}

// 改变本地数据、调用会自动更新数据
function changeLocalData() {
  const data = this.state.localData,
  s = this.state,
  grade = s.snakeAll.length - 1

  if (s.gameMode === '无尽模式') {
    // 判断得分是否是最高得分
    if (data['无尽模式'].gradeMax < grade) {
      // 如果是就覆盖最高得分
      data['无尽模式'].gradeMax = grade
      this.modal_error('显示', `游戏结束，得分为：${grade}</br>恭喜您突破了您的记录`)
    } else {
      this.modal_error('显示', `游戏结束，得分为：${grade}`)
    }
    // 游玩局数 + 1
    data['无尽模式'].gameNum += 1
  } else {
    data['闯关模式'].customsPassSchedule = s.customsPassSchedule
  }
  this.rendering()
  this.setLocal(data)
}

export default {
  begin,
  finish,
  modal_success,
  modal_error,
  getBack,
  restart,
  newFirst,
  changeLocalData
}
let id,
count = 0,
seed = 0
export function direction(callback) { // 方向
  let dir
  // 键盘按下
  document.onkeydown = (e) => {
    // 旧位置
    const usedDir = this.state.dir,
    isLen = this.state.snakeAll.length === 1,
    // 判断上下左右、绑定键盘
    isRight = e.code === 'ArrowRight' || e.code === 'KeyD',
    isUp = e.code === 'ArrowUp' || e.code === 'KeyW',
    isLift = e.code === 'ArrowLeft' || e.code === 'KeyA',
    isDown = e.code === 'ArrowDown' || e.code === 'KeyS'
    // 如果当前蛇的长度不等于一
    // 当前方向为左的话就禁止往右
    // 当前为下就禁止上、依次类推
    if (!isLen) {
      if (isRight && usedDir !== '左') {
        dir = '右'
        speedUp(this)
      } else if (isUp && usedDir !== '下') {
        dir = '上'
        speedUp(this)
      } else if (isLift && usedDir !== '右') {
        dir = '左'
        speedUp(this)
      } else if (isDown && usedDir !== '上') {
        dir = '下'
        speedUp(this)
      }
    } else {
      // 如果当前长度为一 上下左右都可以
      if (isRight) {
        dir = '右'
        speedUp(this)
      } else if (isUp) {
        dir = '上'
        speedUp(this)
      } else if (isLift) {
        dir = '左'
        speedUp(this)
      } else if (isDown) {
        dir = '下'
        speedUp(this)
      }
    }
    callback(dir)
  }
  // 键盘抬起
  document.onkeyup = () => {
    // 抬起时候清除加速的计时器,如果不到时间就不会加速
    clearInterval(id)
    // 每次抬起就初始化 count
    count = 0
    // 如果 !this.isSpeedUp 就是没有 加速，不需要恢复原先的速度
    if (!this.state.isSpeedUp) return
    // 恢复原先的速度
    this.state.seed = seed
    // 不在加速
    this.state.isSpeedUp = false
    // 清除加速时候的样式
    this.state.snakeAll.forEach(v => {
      v.classList.remove('speedup')
    })
    clearInterval(this.state.intervalId)
    this.snakeMove()
  }
}

// 加速
function speedUp(t) {
  // 只有开始状态才可以加速
  if (!t.state.gameStatus) return
  // 因为键盘长按事件会执行多次，所以需要判断只取第一次事件
  count ++
  if (count === 1) {
    // 这里会有一个定时器记录长按是否超过一秒，如果不到一秒抬起定时器会被清除
    id = setInterval(() => {
      // 先把原先的速度存起来
      seed = t.state.seed
      // 添加加速时候的样式
      t.addpeedup()
      // 再把新速度赋值
      t.state.seed /= t.state.speedUpTimes
      // 先把旧的计时器清除
      clearInterval(t.state.intervalId)
      // 重新执行移动事件
      t.snakeMove()
      // 定时器执行一次后清除
      clearInterval(id)
      // 在加速
      t.state.isSpeedUp = true
    }, t.state.delaySpeedUp)
  }
}

// 添加加速时候的样式
export function addpeedup() {
  this.state.snakeAll.forEach(v => {
    v.classList.add('speedup')
  })
}

export default {
  direction,
  addpeedup
}

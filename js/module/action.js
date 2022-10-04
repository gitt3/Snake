// 蛇、动
function snakeMove() {
  // 只要游戏状态开始的时候才可以执行这个事件
  if (!this.state.gameStatus) return
  const { seed, customsPassSchedule, customsPassData } = this.state
  // 具体操作
  const intervalId = setInterval(() => {
    changeDir(this).then(() => {
      // 成功回调
      clearInterval(intervalId)
      this.finish('成功')
      this.modal_success('显示')
      this.state.customsPassSchedule = customsPassSchedule > customsPassData.index ? customsPassSchedule : customsPassData.index
      this.changeLocalData()
    }).catch((err) => {
      // 如果失败就会执行这个回调函数、清除计时器
      clearInterval(intervalId)
      // 失败执行的方法
      this.finish('失败')
      // 只有闯关模式才会直接执行，是无尽模式需要额外判断
      this.state.gameMode === '闯关模式' ? this.modal_error('显示') : false
      this.changeLocalData()
    })
  }, seed)
  this.addState({
    // 计时器ID
    intervalId
  })
}

// 改变方向
function changeDir(tath) {
  // 这里运行的逻辑是：
  // 1.判断上下左右的值，相应的改变元素对应的索引，并且插入元素
  // 2.将每次‘蛇’头的索引存到数组里面的第一个，并且将每次‘蛇’增长的元素放到数组里面的最后一个
  // 3.如2所示，存放索引的数组和存放‘蛇’元素的数组就是一一对应关系
  return new Promise((reslove, reject) => {
    let { isSpeedUp, snakeAll, colIndAll, rowIndAll, rowAll, dir, topRowInd, topColInd, colIndMax, rowIndMax, fruitRow, fruitCol, fruitEl, need, presentEl, gameMode } = tath.state
    // 每次将最新的索引放到数组里面的第一个
    colIndAll.unshift(topColInd)
    rowIndAll.unshift(topRowInd)
    // 判断上下左右并改变对应的行和列的索引
    if (dir === '上') {
      tath.state.topRowInd --
    } else if (dir === '下') {
      tath.state.topRowInd ++
    } else if (dir === '左') {
      tath.state.topColInd --
    } else if (dir === '右') {
      tath.state.topColInd ++
    }
    // 判断蛇顶部索引是否超出地图上下左右
    // 无尽模式需要比对最新的，闯关模式需要比对当前的
    const left = (gameMode === '无尽模式' ? tath.state.topColInd : topColInd) < 0,
    right = (gameMode === '无尽模式' ? tath.state.topColInd : topColInd) >= colIndMax,
    top = (gameMode === '无尽模式' ? tath.state.topRowInd : topRowInd) < 0,
    bottom = (gameMode === '无尽模式' ? tath.state.topRowInd : topRowInd) >= rowIndMax
    if (left || right || top || bottom){
      // 在无尽模式下，超出地图边缘会去另一侧
      if (gameMode === '无尽模式') {
        if (left) {
          tath.state.topColInd = colIndMax - 1
        } else if (right) {
          tath.state.topColInd = 0
        } else if (top) {
          tath.state.topRowInd = rowIndMax - 1
        } else {
          tath.state.topRowInd = 0
        }
      } else {
        // 在非无尽模式下大于或者小于地图边缘游戏就会失败
        reject()
      }
    }

    // 最新索引 === 果实索引的时候
    if (colIndAll[0] === fruitCol && rowIndAll[0] === fruitRow) {
      // 添加蛇身体
      tath.addSnakeBody()
      // 删除果实元素
      fruitEl.remove()
      // 创建新的果实元素
      tath.createFruit()
      // 赋值新的长度
      presentEl.innerHTML = snakeAll.length - 1
      // 只有在加速的状态下才会执行这个事件
      if (isSpeedUp) {
        // 给加速的时候上色，新增的元素是默认元素，如果是加速状态新增需要重新上色
        tath.addpeedup()
      }
      // 闯关模式下，当目标分数 === 当前长度的时候，关卡通过
      if (need === snakeAll.length - 1 && gameMode === '闯关模式') {
        reslove()
      }
    }

    // 只要 !无尽模式 才有障碍物
    if (gameMode !== '无尽模式') {
      // 最近索引 === 障碍物的时候失败
      if (rowAll[topRowInd].querySelectorAll('.col')[topColInd].classList.contains('obstacle')) {
        reject()
      }
    }

    // 找到对应的行和列并且插入元素
    snakeAll.forEach((v, i) => {
      rowAll[rowIndAll[i]].querySelectorAll('.col')[colIndAll[i]].appendChild(v)
    })

    // 只保留自己用上的索引位置，多余的排除掉
    colIndAll.splice(snakeAll.length)
    rowIndAll.splice(snakeAll.length)

    // 如果撞到自己身上，游戏会失败
    rowIndAll.forEach((v, i) => {
      if (i !== 0 && colIndAll[i] === topColInd && v === topRowInd) {
        reject()
      }
    })
  })
}

export default {
  snakeMove
}

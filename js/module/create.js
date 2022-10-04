// 选择关卡
function optionCustomsPass() {
  this.state.presentEl.innerHTML = 0
  // 包关卡的盒子
  const customsPassWarp = document.querySelector('#customsPassWarp'),
  targetEl = document.querySelector('#target')
  let customsPass,
  need = 0
  // 每次清空里面的元素
  customsPassWarp.innerHTML = ''
  this.state.customsPassMap().forEach((v, i) => {
    // 渲染关卡
    customsPass = this.createEl('div', 'customsPass')
    if (!v.isPass) {
      customsPass.classList.add('noPass')
    }
    customsPass.innerHTML = `第${i + 1}关`
    customsPassWarp.appendChild(customsPass)
    // 绑定点击事件
    customsPass.onclick = () => {
      // 当点击关卡非第一个的时候判断上一个关卡是否通过
      if (i > this.state.customsPassSchedule) return
      v['index'] = i + 1
      this.createMap(v.map)
      customsPassWarp.classList.add('none')
      targetEl.innerHTML = v.need
      need = v.need
      this.addState({
        need,
        customsPassData: v
      })
      this.begin()
    }
  })
  this.addState({
    customsPassWarp,
    targetEl
  })
}

// 创建地图
function createMap(map) {
  const mapEl = this.createEl('div', 'map')
  let row, col
  if (this.state.gameMode === '无尽模式') {
    document.querySelector('.game').appendChild(mapEl)
  } else {
    document.querySelector('.emigrated').appendChild(mapEl)
  }
  // 遍历地图
  // 第一层遍历
  map.forEach((v, i1) => {
    row = this.createEl('div', 'row')
    // 第二层遍历
    v.forEach((vv, i2) => {
      col = this.createEl('div', 'col')
      if (vv === 'x') {
        col.classList.add('obstacle')
      }
      row.appendChild(col)
    })
    mapEl.appendChild(row)
  })
  this.addState({
    // 所有tr元素
    rowAll: mapEl.querySelectorAll('.row'),
    // 列的最大数量
    colIndMax: map[0].length,
    // 行的最大数量
    rowIndMax: map.length,
    map: mapEl
  })
}

// 创建蛇头
function createSnake() {
  const s = this.state,
  // 存放所有的 ‘蛇元素’
  snakeAll = [],
  // 创建 ‘蛇’ 元素

  snake = this.createEl('p', 'snake'),
  // 蛇头位置
  topRowInd = 0,
  topColInd = Math.floor(s.colIndMax / 2),
  // 定义初始位置
  rowIndAll = [topRowInd],
  colIndAll = [topColInd]

  // 将 元素 ‘蛇’ 放到随机初始位置
  s.rowAll[topRowInd].querySelectorAll('.col')[topColInd].appendChild(snake)
  snakeAll.push(snake)
  this.addState({
    rowIndAll,
    colIndAll,
    snakeAll,
    topColInd,
    topRowInd
  })
}

// 添加蛇身体
function addSnakeBody() {
  const s = this.state,
  snake = this.createEl('p', 'snake')
  s.snakeAll.push(snake)
}

// 生成果实
function createFruit() {
  const { rowIndMax, colIndMax, rowAll, rowIndAll, colIndAll } = this.state,
  // 创建‘果实’元素
  fruit = this.createEl('p', 'fruit'),
  { fruitRow, fruitCol } = createFruitInd()
  // 生成果实的坐标
  function createFruitInd() {
    let fruitRow, fruitCol
    function createFruitIndRecursion() {
      // 根据行和列的最大范围生成随机数
      fruitRow = Math.floor(Math.random() * rowIndMax)
      fruitCol = Math.floor(Math.random() * colIndMax)
      rowIndAll.forEach((v, i) => {
        // 规定‘果实’元素不能随机到蛇身体表格或者有障碍物的表格内
        if (fruitRow === v && fruitCol === colIndAll[i] || rowAll[fruitRow].querySelectorAll('.col')[fruitCol].classList.contains('obstacle')) {
          createFruitIndRecursion()
        }
      })
    }
    createFruitIndRecursion()
    // 把结果返回
    return { fruitRow, fruitCol }
  }

  // 将元素插入到行和列里面
  rowAll[fruitRow].querySelectorAll('.col')[fruitCol].appendChild(fruit)
  this.addState({
    fruitRow,
    fruitCol,
    fruitEl: fruit
  })
}

export default {
  createMap, 
  createSnake,
  createFruit,
  addSnakeBody,
  optionCustomsPass
}
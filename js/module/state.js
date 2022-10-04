import { customsPassMap, endlessMap } from './customsPassMap.js'

export const state = {
  // 速度
  seed: 200,
  // 方向
  dir: '下',
  // 防止多次执行开始事件
  start: false,
  // 关卡进度
  customsPassSchedule: 0,
  // 目标
  target: 0,
  // 当前分数的容器
  presentEl: document.querySelector('#present'),
  // 成功的弹出框元素
  modal_success: document.querySelector('#modal_success'),
  // 失败的弹出框元素
  modal_error: document.querySelector('#modal_error'),
  // 关卡地图
  customsPassMap,
  // 无尽地图
  endlessMap,
  // 游戏模式
  gameMode: '无尽模式',
  // 存放所有列位置
  colIndAll: [],
  // 存放所有行位置
  rowIndAll: [],
  // 果实列位置
  fruitCol: 0,
  // 果实行位置
  fruitRow: 0,
  // 果实元素
  fruitEl: undefined,
  // 地图元素
  map: undefined,
  // 存放所有行元素
  rowAll: [],
  // 行的最大数量
  rowIndMax: 0,
  // 列的最大数量
  colIndMax: 0,
  // 元素 ‘蛇’
  snakeAll: undefined,
  // 蛇顶部的列位置
  topColInd: 0,
  // 蛇顶部的行位置
  topRowInd: 0,
  // 定时器 ID
  intervalId: 0,
  // 延迟加速的时间(毫秒)
  delaySpeedUp: 500,
  // 加速的倍速
  speedUpTimes: 2.5,
  // 当前是否在加速
  isSpeedUp: false,
  // 游戏状态 false = 关闭 true = 开始
  gameStatus: false,
  // 储存在本地的数据
  localData: {
    '无尽模式': {
      // 最高分数
      gradeMax: 0,
      // 游戏局数
      gameNum: 0
    },
    '闯关模式': {
      // 当前关卡进度
      customsPassSchedule: 3
    },
    '设置': {
      // 初始无尽速度
      initialEndlessSpeed: 200,
      // 延迟加速的时间(毫秒)
      delaySpeedUp: 500,
      // 加速的倍速
      speedUpTimes: 2.5,
      // 无尽地图范围
      endlessMapRow: 20,
      endlessMapCol: 25
    }
  }
}

// 添加属性, 属性名、属性值
export const addState = function (property, val) {
  // 如果 property 为对象就把对象里面的数据放进去
  if (this.isType(property) === 'Object') {
    for (const key in property) {
      state[key] = property[key]
    }
    return
  }
  state[property] = val
}
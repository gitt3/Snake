import Main from './module/Main.js'

let main = new Main()

// 一个简陋路由
// 存放所有的路径
const router = ['/game', '/statistics', '/emigrated']
// 当页面载入的时候执行
location.href = location.origin + location.pathname + '#' + router[0]
changeRoute()

// 当路径变化的时候执行
window.onhashchange = function() {
  // 游戏模式
  main.addState({
    gameMode: location.hash === '#/game' ? '无尽模式' : '闯关模式'
  })
  // 每次切换就把 map 元素删除，因为页面里只能存在一个 map 元素
  if (document.querySelector('.map')) {
    document.querySelector('.map').remove()
  }
  // 判断模式
  if (location.hash === '#/game') {
    main.createMap(main.state.endlessMap())
    main.begin()
    document.querySelector('.getBackNone').classList.add('none')
    // 切换的时候把目标分数清空
    if (main.state.targetEl) main.state.targetEl.innerHTML = 0
  } else {
    // 渲染关卡
    main.optionCustomsPass()
    customsPassWarp.classList.remove('none')
    document.querySelector('.getBackNone').classList.remove('none')
  }
  // 每次切换需要清除计时器
  clearInterval(main.state.intervalId)
  changeRoute()
}

// 根据路径显示隐藏
function changeRoute() {
  var hash = location.hash;
  hash = hash.replace('#','')
  router.forEach(v => {
    document.getElementById(v).style.display = 'none'
    document.getElementById('nav_' + v).style.background = 'blue'
  })
  document.getElementById(hash).style.display = 'flex'
  document.getElementById('nav_' + hash).style.background = 'red'
}

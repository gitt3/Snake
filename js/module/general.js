// 创建元素
function createEl(el, name) {
  const El = document.createElement(el);
  if (name) {
    El.classList.add(name);
  }
  return El;
}

// 判断类型
function isType(data) {
  const type = Object.prototype.toString.call(data);
  return type.substring(8, type.length - 1);
}

// 将一些数据储存到本地、并且进行编码
function setLocal(obj) {
  localStorage.setItem('gluttonousSnakeLocalData', encodeURIComponent(JSON.stringify(obj)))
}

// 将数据从本地取出来，并且解码
function getLocal() {
  return JSON.parse(decodeURIComponent(localStorage.getItem('gluttonousSnakeLocalData')))
}

export default {
  createEl,
  isType,
  getLocal,
  setLocal
}

// 统计与设置
function rendering() {
  const s = this.state,
  data = s.localData
  // 渲染
  document.querySelector('.statistics').innerHTML = `
    <b>无尽模式：</b>
    <p>最高分数：${data['无尽模式'].gradeMax}</p>
    <p>游玩局数：${data['无尽模式'].gameNum}</p>
    <b>闯关模式：</b>
    <p>关卡通过数：${data['闯关模式'].customsPassSchedule}</p>
    <hr/>
    <b>设置：</b>
    <p>延迟加速的时间(毫秒)：<input type="text" value="${data['设置'].delaySpeedUp}" id="delaySpeedUp" /></p>
    <p>初始无尽速度(毫秒)：<input type="text" value="${data['设置'].initialEndlessSpeed}" id="initialEndlessSpeed" /></p>
    <p>加速的倍速：<input type="text" value="${data['设置'].speedUpTimes}" id="speedUpTimes" /></p>
    <p>无尽地图行数：<input type="text" value="${data['设置'].endlessMapRow}" id="endlessMapRow" />&nbsp;温馨提示，该项不要设置太大数值</p>
    <p>无尽地图列数：<input type="text" value="${data['设置'].endlessMapCol}" id="endlessMapCol" />&nbsp;温馨提示，该项不要设置太大数值</p>
    <button id="save">保存</button>
  `
  // 保存设置
  document.querySelector('#save').onclick = () => {
    for (const key in data['设置']) {
      const value = document.querySelector('#' + key).value
      data['设置'][key] = value
      s[key] = value
    }
    this.setLocal(data)
    alert('保存成功')
  }
}

export default {
  rendering
}

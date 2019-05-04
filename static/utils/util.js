// 格式化时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 随机生成 6 位验证码信息
const getSixCodeRandom = () => `${Math.floor(Math.random() * 900000 + 100000)}`;

// 倒计时
const countdown = ({ count, rate, callback, finishCallback }) => {
  let current = count;
  const timer = setInterval(() => {
    if (current > 1) {
      --current;
      callback && callback(current);
    } else {
      clearInterval(timer);
      finishCallback && finishCallback(count);
    }
  }, rate)
}

// 显示提示信息
const showSimpleToast = (title, duration = 2000) => {
  wx.showToast({
    title,
    icon: 'none',
    duration
  });
}

module.exports = {
  formatTime,
  getSixCodeRandom,
  countdown,
  showSimpleToast
}

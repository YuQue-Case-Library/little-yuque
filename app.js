const Towxml = require('/towxml/main'); 
const $api = require('/static/utils/api');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
    $api: $api
  },
  towxml: new Towxml()
})
// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    latitude: "",
    longitude: "",
    markers: []
  },

  onLoad: function() {
    wx.getLocation({
      type: "wgs84",
      success: ({ longitude, latitude }) => {
        this.setData({
          longitude,
          latitude,
          markers: [
            {
              id: 1,
              latitude,
              longitude
            }
          ]
        });
      }
    });

    this.getUserNetInfo();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  // 获取用户信息
  getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },

  // 获取用户的手机网络信息
  getUserNetInfo() {
    wx.request({
      url: "http://ip-api.com/json?lang=zh-CN",
      success: res => {
        const { city, query } = res.data;

        this.getUserWeatherInfo({
          city,
          ip: query
        });
      }
    });
  },

  // 获取用户所在地的天气信息
  getUserWeatherInfo(params) {
    wx.request({
      url: "https://www.yuque.com/api/groups/114852/books?offset=0&q=&type=",
      success(res) {
        console.log(res);
      }
    });
  },

  // 点击去注册
  toRegister() {
    wx.redirectTo({
      url: '/pages/register/register',
    })
  }
});

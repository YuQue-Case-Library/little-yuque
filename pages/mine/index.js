const { HOME_PAGE_PREFIX } = require('../../static/utils/constants.js');

Component({
  data: {
    avatarUrl: '',
    nickName: '',
    description: '',
    following: 0,
    followers: 0,
    homePageUrl: '',
    userToken: ''
  },

  ready() {
    // 获取当前用户的 token
    wx.getStorage({
      key: 'userToken',
      success: res => {
        this.setData({
          userToken: res.data
        })
      },
    })

    // 获取用户信息
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        const userInfo = res.data 
        if (userInfo) {
          this.setData({
            avatarUrl: userInfo.avatar_url,
            nickName: userInfo.name,
            description: userInfo.description,
            following: userInfo.following_count,
            followers: userInfo.followers_count,
            homePageUrl: `${HOME_PAGE_PREFIX}${userInfo.name}`
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      },
      fail: () => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },

  methods: {
    // 点击复制数据
    handleClipboardData(event) {
      const { clipType } = event.currentTarget.dataset

      if (clipType) {
        const clipData = this.data[clipType]
        if (clipData) {
          wx.setClipboardData({
            data: clipData,
            success() {
              wx.showToast({
                title: '复制数据成功!',
                icon: 'success',
                duration: 1500
              })
            }
          })
        }
      }
    },

    // 清除缓存数据
    handleClearEvent() {
      wx.showModal({
        title: '提示',
        content: '是否确定清空本地缓存数据',
        success: res => {
          if (res.confirm) {
            this.handleClear()
          }
        }
      })
    },
  
    // 清除缓存
    handleClear(callback) {
      wx.removeStorage({
        key: 'userToken',
        success() {
          wx.removeStorage({
            key: 'userInfo',
            success() {
              if (callback) {
                callback()
                return
              }
              wx.showToast({
                title: '缓存数据清空成功',
                icon: 'success',
                duration: 1500
              })
            },
            fail() {
              wx.showToast({
                title: '缓存数据清空失败',
                icon: 'fail',
                duration: 1500
              })
            }
          })
        },
        fail() {
          wx.showToast({
            title: '缓存数据清空失败',
            icon: 'fail',
            duration: 1500
          })
        }
      })
    },

    // 退出登录
    handleLogout() {
      wx.showModal({
        title: '提示',
        content: '是否确定清空缓存数据并退出登录',
        success: res => {
          if (res.confirm) {
            this.handleClear(() => {
              wx.redirectTo({
                url: '/pages/login/login'
              })
            })
          }
        }
      })
    },

    // 页面跳转
    handleNavigate(event) {
      const { url } = event.currentTarget.dataset
      wx.navigateTo({
        url,
      })
    }
  }
})

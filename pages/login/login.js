const app = new getApp()

Page({
  // 提交表单
  formSubmit(e) {
    const { userToken } = e.detail.value

    if(userToken !== '') {
      this.login({ userToken })
    }
  },

  // 登录
  login({ userToken }) {
    wx.setStorage({
      key: 'userToken',
      data: userToken,
      success() {
        app.globalData.$api({
          url: '/user',
          success({ data }) {
            if (data && data.data) {
              const userInfo = data.data || {}
              wx.setStorage({
                key: 'userInfo',
                data: userInfo,
                success: () => {
                  wx.redirectTo({
                    url: 'pages/dashboard/dashboard'
                  })
                }
              })
            }
          }
        })
      }
    })
  },
})
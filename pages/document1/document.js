const app = new getApp()

Component({
  data: {
    docNum: -1,
    docs: []
  },

  ready() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        const userInfo = res.data

        if (userInfo && userInfo.id) {
          // app.globalData.$api({
          //   url: `/users/${userInfo.id}/docs`,
          //   success: ({ data: resData }) => {
          //     if (resData && Array.isArray(resData.data)) {
          //       this.setData({
          //         docNum: resData.data.length,
          //         docs: resData.data
          //       })
          //     }
          //   }
          // })
        }
      }
    })
  }
})
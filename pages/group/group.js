const app = new getApp()

Component({
  data: {
    groupNum: 0,
    groups: []
  },

  ready() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        const userInfo = res.data

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: `/users/${userInfo.id}/groups`,
            success: ({ data: resData }) => {
              if (resData && Array.isArray(resData.data)) {
                this.setData({
                  groupNum: resData.data.length,
                  groups: resData.data
                })
              }
            }
          })
        }
      }
    })
  }
})
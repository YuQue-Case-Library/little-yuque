const app = new getApp()

Component({
  data: {
    repositoryNum: -1,
    repositories: []
  },

  ready() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        const userInfo = res.data

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: `/users/${userInfo.id}/repos`,
            success: ({ data: resData }) => {
              if (resData && Array.isArray(resData.data)) {
                this.setData({
                  repositoryNum: resData.data.length,
                  repositories: resData.data
                })
              }
            }
          })
        }
      }
    })
  },

  methods: {
    _filterBelong(item) {
      console.log(item)
      return item.namespace
    },
    toCreateRepo() {
      wx.navigateTo({
        url: '/pages/repository-add/repository-add'
      })
    }
  }
})
const app = new getApp()

Component({
  data: {
    groupNum: -1,
    groups: []
  },

  ready() {
    wx.showLoading()
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
    // 创建团队
    toCreateGroup() {
      wx.navigateTo({
        url: '/pages/group-add/group-add'
      })
    },

    // 获取团队所有知识库
    toGroupRepo(event) {
      const { goup: goupInfo } = event.currentTarget.dataset;
      const extraData = {
        groupId: goupInfo.id,
      }
      
      wx.navigateTo({
        url: `/pages/repo-list/index?data=${JSON.stringify(extraData)}`,
        success: () => {
          this.triggerEvent('changeGroup', extraData)
        }
      })
    }
  }
})
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
        url: '/pages/group/edit/index'
      })
    },

    // 获取团队信息
    toGroupDetail(event) {
      const { group } = event.currentTarget.dataset;
      const extraData = JSON.stringify({
        groupId: group.id,
        groupName: group.name,
        groupDesc: group.description
      })
      wx.navigateTo({
        url: `/pages/group/detail/index?data=${extraData}`
      })
    }
  }
})
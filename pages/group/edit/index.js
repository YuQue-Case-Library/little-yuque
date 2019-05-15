const app = new getApp()

Page({
  data: {
    publicArray: [
      {
        id: 0,
        name: "仅自己可见"
      },
      {
        id: 2,
        name: "互联网可见"
      }
    ],
    seletedPublicText: "仅自己可见",
    seletedPublic: 0
  },

  // 提交表单
  formSubmit(e) {
    const formData = e.detail.value
    const nameTrim = formData.name.trim()

    if (nameTrim === '') {
      wx.showToast({
        title: '请填写团队名称',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.handleCreateGroup({
        name: nameTrim,
        ...formData,
      })
    }
  },

  // 创建团队
  handleCreateGroup(dataObj) {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        const userInfo = res.data
        console.log(this.data)

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: '/groups',
            method: 'post',
            data: {
              ...dataObj,
              public: this.data.seletedPublic
            },
            success({ data }) {
              if (data.code === "validation") {
                wx.showToast({
                  title: data.message,
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '创建团队成功',
                  icon: 'success',
                  duration: 2000,
                  success: () => {
                    wx.redirectTo({
                      url: '/pages/group/list/index'
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  }
})
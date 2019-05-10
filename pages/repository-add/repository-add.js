const app = new getApp()

Page({
  data: {
    
  },

  // 提交表单
  formSubmit(e) {
    const { name, description } = e.detail.value
    const nameTrim = name.trim()

    if (nameTrim === '') {
      wx.showToast({
        title: '请填写团队名称',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.handleCreateGroup({
        name: nameTrim,
        description: description.trim(),
      })
    }
  },

  // 创建团队
  handleCreateGroup(dataObj) {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        const userInfo = res.data

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: '/groups',
            method: 'post',
            data: {
              ...dataObj,
              login: userInfo.login
            },
            success({ data }) {
              if (data.code === "validation") {
                wx.showToast({
                  title: data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  }
})
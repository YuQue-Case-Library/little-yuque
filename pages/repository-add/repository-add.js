const app = new getApp()

Page({
  data: {
    userInfo: {},
    ownerGroups: [],
    selectedGroupIndex: 0,

    repoTypes: [
      {
        id: "Book",
        name: "文档"
      },
      {
        id: "Book",
        name: "专栏"
      },
      {
        id: "Design",
        name: "画板"
      }
    ],
    selectTypeIndex: 0,

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
    selectPublicIndex: 0,
  },

  onReady: function() {
    wx.getStorage({
      key: "userInfo",
      success: res => {
        const userInfo = res.data

        this.setData({
          userInfo
        })

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: `/users/${userInfo.login}/groups`,
            success: ({ data }) => {
              if (data.code === "validation") {
                wx.showToast({
                  title: data.message,
                  icon: "none",
                  duration: 2000
                })
              } else if (Array.isArray(data.data)) {
                this.setData({
                  ownerGroups: [
                    {
                      id: userInfo.id,
                      name: userInfo.name
                    }
                  ].concat(
                    data.data.map(group => ({
                      ...group,
                      name: `（团队）${group.name}`
                    }))
                  )
                })
              }
            }
          })
        }
      }
    })
  },

  handleTypePick(e) {
    this.setData({
      selectTypeIndex: e.detail.value
    })
  },

  handlePublicPick(e) {
    this.setData({
      selectPublicIndex: e.detail.value
    })
  },

  handleGroupPick(e) {
    this.setData({
      selectedGroupIndex: e.detail.value
    })
  },

  // 提交表单
  formSubmit(e) {
    const formData = e.detail.value
    const { name, description } = formData
    const nameTrim = name.trim()

    if (nameTrim === "") {
      wx.showToast({
        title: "请填写团队名称",
        icon: "none",
        duration: 2000
      })
    } else {
      this.handleCreateGroup({
        ...formData,
        name: nameTrim,
        description: description.trim()
      })
    }
  },

  // 创建团队
  handleCreateGroup(dataObj) {
    wx.getStorage({
      key: "userInfo",
      success: res => {
        const userInfo = res.data
        const { publicArray, selectPublicIndex, repoTypes, selectTypeIndex, ownerGroups, selectedGroupIndex } = this.data
        const currentGroup = ownerGroups[selectedGroupIndex]
        const groupLogin = currentGroup.login || currentGroup.name

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: "/groups",
            method: "post",
            data: {
              ...dataObj,
              public: publicArray[selectPublicIndex].id,
              type: repoTypes[selectTypeIndex].id,
              login: dataObj.book_slug,
              namespace: `${groupLogin}\/${dataObj.book_slug}`
            },
            success({ data }) {
              if (data.code === "validation") {
                wx.showToast({
                  title: data.message,
                  icon: "none",
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '创建知识库成功',
                  icon: 'success',
                  duration: 2000,
                  success: () => {
                    wx.redirectTo({
                      url: '/pages/repository/repository'
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

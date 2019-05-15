const app = new getApp();

Component({
  properties: {
    groupId: {
      type: String,
      value: ''
    }
  },
  data: {
    repositoryNum: -1,
    repositories: []
  },

  ready() {
    wx.showLoading()
    wx.getStorage({
      key: "userInfo",
      success: res => {
        const userInfo = res.data;

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: `/users/${userInfo.id}/repos`,
            success: ({ data: resData }) => {
              if (resData && Array.isArray(resData.data)) {
                this.setData({
                  repositoryNum: resData.data.length,
                  repositories: resData.data
                });
              }
            },
          });
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
    });
  },

  methods: {
    // 创建知识库
    toCreateRepo() {
      wx.navigateTo({
        url: "/pages/repo/edit/index"
      });
    },

    // 查看知识库详情
    toRepoDetail(event) {
      const { repo: repoInfo } = event.currentTarget.dataset;
      const extraData = JSON.stringify({
        id: repoInfo.id,
        type: repoInfo.type,
        name: repoInfo.name,
        description: repoInfo.description,
      });
      wx.navigateTo({
        url: `/pages/repo/detail/index?data=${extraData}`
      });
    }
  }
});

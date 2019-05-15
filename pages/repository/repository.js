const app = new getApp();

Component({
  data: {
    repositoryNum: -1,
    repositories: []
  },

  ready() {
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
            }
          });
        }
      }
    });
  },

  methods: {
    // 创建知识库
    toCreateRepo() {
      wx.navigateTo({
        url: "/pages/repository-add/repository-add"
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
        url: `/pages/repository-detail/repository-detail?data=${extraData}`
      });
    }
  }
});

const app = new getApp();

Page({
  data: {
    repos: [],
    selectedRepoIndex: 0
  },

  onReady: function() {
    wx.getStorage({
      key: "userInfo",
      success: res => {
        const userInfo = res.data;

        if (userInfo && userInfo.id) {
          app.globalData.$api({
            url: `/users/${userInfo.id}/repos`,
            success: ({ data }) => {
              if (data.code === "validation") {
                wx.showToast({
                  title: data.message,
                  icon: "none",
                  duration: 2000
                });
              } else if (Array.isArray(data.data)) {
                this.setData({
                  repos: data.data.map(repo => {
                    if (repo.public === 0) {
                      return {
                        ...repo,
                        name: `🔐 ${repo.name}`
                      }
                    }
                    return repo
                  })
                });
              }
            }
          });
        }
      }
    });
  },

  handleRepoPick(e) {
    this.setData({
      selectedRepoIndex: e.detail.value
    })
  },
});

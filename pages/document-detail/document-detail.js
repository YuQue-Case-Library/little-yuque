const { gethashcode } = require('../../static/utils/util')

const app = new getApp();

Page({
  data: {
    repos: [],
    selectedRepoIndex: 0,
    repoInfo: {
      id: '',
      title: '',
      body: ''
    },
    params: {}
  },

  onLoad:function(options){
    this.setData({
      params: JSON.parse(options.data)
    })
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

          const { params } = this.data

          if (params.docId) {
            app.globalData.$api({
              url: `/repos/${params.repoId}/docs/${params.docId}`,
              success: ({ data }) => {
                if (data.code === "validation") {
                  wx.showToast({
                    title: data.message,
                    icon: "none",
                    duration: 2000
                  });
                } else if (data.data) {
                  console.log(data)
                }
              }
            });
          }
        }
      }
    });
  },

  handleRepoPick(e) {
    this.setData({
      selectedRepoIndex: e.detail.value
    })
  },

  handleSaveEvent() {

  },

  handleSendEvent() {
    setTimeout(() => {
      console.log(this.data)
      this.handleSendAction()
    }, 500)
  },

  handleSendAction() {
    const { repoInfo: { id, title, body }, selectedRepoIndex, repos } = this.data
    const currentRepo = repos[selectedRepoIndex]

    app.globalData.$api({
      url: `/repos/${currentRepo.namespace}/docs${id ? `\/${id}` : ''}`,
      method: id ? 'put' : 'post',
      data: {
        title,
        body,
        slug: gethashcode(),
        public: currentRepo.public,
        format: 'markdown',
      },
      success: ({ data }) => {
        if (data.code === "validation") {
          wx.showToast({
            title: data.message,
            icon: "none",
            duration: 2000
          });
        } else if (Array.isArray(data.data)) {
          wx.showToast({
            title: `${id ? '更新文档成功' : '创建文档成功'}`,
            icon: "success",
            duration: 2000
          });
        }
      }
    });
  },

  handleTitleBlur(event) {
    const { value } = event.detail
    const { repoInfo } = this.data
    if (value !== repoInfo.title) {
      this.setData({
        repoInfo: {
          ...repoInfo,
          title: value
        }
      })
    }
  },

  handleTextAreaBlur(event) {
    const { value } = event.detail
    const { repoInfo } = this.data
    if (value !== repoInfo.body) {
      this.setData({
        repoInfo: {
          ...repoInfo,
          body: value
        }
      })
    }
  }
});

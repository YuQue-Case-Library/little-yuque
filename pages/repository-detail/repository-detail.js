const app = new getApp()

Page({
  data:{
    repoInfo: {},
    columnList: [],
    columnsNum: 0,
    article: ''
  },
  onLoad:function(options){
    this.setData({
      repoInfo: JSON.parse(options.data)
    })
  },
  onReady:function(){
    const { id: repoId, type: repoType } = this.data.repoInfo

    if (repoType === 'Book') {
      app.globalData.$api({
        url: `/repos/${repoId}`,
        success: ({ data: resData }) => {
          if (resData && resData.data.toc) {
            this.setData({
              article: resData.data.toc
            });
          }
        }
      });
    } else {
      app.globalData.$api({
        url: `/repos/${repoId}/docs`,
        success: ({ data: resData }) => {
          if (resData && Array.isArray(resData.data)) {
            this.setData({
              columnsNum: resData.data.length,
              columnList: resData.data
            });
          }
        }
      });
    }
  },
})
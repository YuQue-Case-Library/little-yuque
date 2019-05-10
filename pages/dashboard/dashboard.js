Page({
  data:{
    tabActive: 'document',
    tabData: [
      {
        icon: 'file',
        value: 'document',
        text: '文档'
      },
      {
        icon: 'storehouse',
        value: 'repository',
        text: '知识库'
      },
      {
        icon: 'team',
        value: 'group',
        text: '团队'
      },
      {
        icon: 'user-h',
        value: 'me',
        text: '我的'
      }
    ]
  },

  // 切换 footer tab
  handleChangeTab(e) {
    const currentActive = e.currentTarget.dataset.index
    if (this.data.tabActive === currentActive) {
      return
    }
    
    this.setData({
      tabActive: currentActive
    })
  }
})
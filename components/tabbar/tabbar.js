
Component({
  properties: {
    tabIndex: {
      type: Number,
      value: 0
    },
  },
  data:{
    tabActive: 0,
    tabData: [
      {
        icon: 'file',
        value: 'document',
        text: '文档',
        url: '/pages/document/document'
      },
      {
        icon: 'storehouse',
        value: 'repository',
        text: '知识库',
        url: '/pages/repo-list/index'
      },
      {
        icon: 'team',
        value: 'group',
        text: '团队',
        url: '/pages/group/group'
      },
      {
        icon: 'user-h',
        value: 'me',
        text: '我的',
        url: '/pages/me/me'
      }
    ]
  },

  ready() {
    this.setData({
      tabActive: this.data.tabIndex
    })
  },

  methods: {
    // 切换 tab
    handleChangeTab(e) {
      const { index: currentActive } = e.currentTarget.dataset
      const { tabActive, tabData } = this.data
      if (tabActive === currentActive) {
        return
      }
      
      this.setData({
        tabActive: currentActive
      })

      wx.redirectTo({
        url: tabData[currentActive].url
      })
    }
  }
})
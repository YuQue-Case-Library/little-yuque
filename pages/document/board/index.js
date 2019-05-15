Component({
  data:{
  },
  methods: {
    // 新建文档
    toCreateDoc() {
      wx.navigateTo({
        url: '/pages/document/detail/index',
      })
    }
  }
})
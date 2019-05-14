const app = new getApp()

Component({
  data: {
    docNum: -1,
    docs: []
  },

  methods: {
    toCreateDoc() {
      wx.navigateTo({
        url: '/pages/document-detail/document-detail',
      })
    }
  }
})
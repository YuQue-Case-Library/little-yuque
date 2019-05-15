const app = new getApp()

Component({
  properties: {
    article: {
      type: String,
      value: ''
    }
  },
  data: {
    articleJson: {}
  },
  options: {
    styleIsolation: 'page-isolated'
  },
  ready() {
    this.setData({
      articleJson: app.towxml.toJson(this.data.article, 'markdown')
    })
  }
})
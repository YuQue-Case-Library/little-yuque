const app = new getApp()

Page({
  data:{
    groupInfo: {}
  },
  onLoad:function(options){
    let parseData = {}
    try {
      parseData = JSON.parse(options.data)
    } catch (error) {
      
    }
    this.setData({
      groupInfo: parseData
    })
  },
  onReady:function(){
    const { groupId } = this.data.groupInfo
    wx.showLoading()

    // 获取团队所有知识库
    app.globalData.$api({
      url: `/groups/${groupId}/repos`,
      success: ({ data: resData }) => {
        console.log(resData)
      }
    })

    // 获取团队成员信息
    app.globalData.$api({
      url: `/groups/${groupId}/users`,
      success: ({ data: resData }) => {
        console.log(resData)
      }
    })

    app.globalData.$api({
      url: `/groups`,
      success: ({ data: resData }) => {
        console.log(resData)
      }
    })
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
})
const { MOBILE_REG } = require('../../utils/constants.js');
const { getSixCodeRandom, countdown } = require('../../utils/util.js');

const resetTime = 60;
let sixCodeRandom = '';

Page({
  data:{
    mobile: '',
    vercode: '',
    vercodeText: '获取验证码',
    isVercodeLimit: false,
    vercodeFocus: false,
    sendCodeMessage: '',
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
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

  // 监听手机输入框事件
  bindMobileInput(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  // 获取验证码
  getVercode() {
    const { mobile, isVercodeLimit } = this.data;

    if (!isVercodeLimit) {
      if (!mobile) {
        this.showToast('请输入手机号');
      } else if (!MOBILE_REG.test(mobile)) {
        this.showToast('请输入合法的手机号');
      } else {
        sixCodeRandom = getSixCodeRandom();
        const timer = setTimeout(() => {
          clearTimeout(timer);

          this.setData({
            sendCodeMessage: `获取验证成功，您获取的验证码是 ${sixCodeRandom}`,
            vercodeFocus: true
          });

          countdown({
            count: resetTime,
            rate: 1000,
            callback: currentTime => {
              this.setData({
                isVercodeLimit: true,
                vercodeText: `${currentTime}s`
              });
            },
            finishCallback: () => {
              this.setData({
                isVercodeLimit: false,
                vercodeText: '重发验证码'
              });
            }
          });
        }, 800);
      }
    }
  },

  // 点击注册
  handleRegister() {
    const { mobile, vercode } = this.data;
    
    if (!mobile) {
      this.showToast('请输入手机号');
    } else if (!MOBILE_REG.test(mobile)) {
      this.showToast('请输入合法的手机号');
    } else if (sixCodeRandom !== vercode) {
      this.showToast('请输入正确的验证码');
    } else {
      
    }
  },

  // 显示提示信息
  showToast(title, duration = 2000) {
    wx.showToast({
      title,
      icon: 'none',
      duration
    });
  }
})
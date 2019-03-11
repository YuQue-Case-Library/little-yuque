const { MOBILE_REG } = require('../../static/utils/constants.js');

Page({
  data:{
    mobile: '',
    verCode: '',
    codeBtnText: '获取验证码',
    isCodeLimit: false,
    codeInputFocus: false,
    sendCodeMessage: '',
  },

  // 点击注册
  handleRegister() {
    const { mobile, verCode } = this.data;
    
    if (!mobile) {
      this.showToast('请输入手机号');
    } else if (!MOBILE_REG.test(mobile)) {
      this.showToast('请输入合法的手机号');
    } else if (sixCodeRandom !== verCode) {
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
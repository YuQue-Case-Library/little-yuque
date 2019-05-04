const { showSimpleToast } = require('../../static/utils/util.js');
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
      showSimpleToast('请输入手机号');
    } else if (!MOBILE_REG.test(mobile)) {
      showSimpleToast('请输入合法的手机号');
    } else if (sixCodeRandom !== verCode) {
      showSimpleToast('请输入正确的验证码');
    } else {
      
    }
  },
})
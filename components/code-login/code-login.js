const { getSixCodeRandom, countdown } = require('../../static/utils/util.js');

Component({
  data:{
    mobile: '',
    verCode: '',
    codeBtnText: '获取验证码',
    isCodeLimit: false,
    codeInputFocus: false,
    sendCodeMessage: '',
  },

  // 监听手机输入框事件
  bindMobileInput(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  // 获取验证码
  getVerCode() {
    const { mobile, isCodeLimit } = this.data;
    const resetTime = 60;
    let sixCodeRandom = '';

    if (!isCodeLimit) {
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
            codeInputFocus: true
          });

          countdown({
            count: resetTime,
            rate: 1000,
            callback: currentTime => {
              this.setData({
                isCodeLimit: true,
                codeBtnText: `${currentTime}s`
              });
            },
            finishCallback: () => {
              this.setData({
                isCodeLimit: false,
                codeBtnText: '重发验证码'
              });
            }
          });
        }, 800);
      }
    }
  },
})
const { getSixCodeRandom, countdown, showSimpleToast } = require('../../static/utils/util.js');
const { MOBILE_REG } = require('../../static/utils/constants.js');

Component({
  data:{
    mobile: '',
    verCode: '',
    codeBtnText: '获取验证码',
    isCodeLimit: false,
    codeInputFocus: false,
    sendCodeMessage: '',
  },

  methods: {
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
          showSimpleToast('请输入手机号');
        } else if (!MOBILE_REG.test(mobile)) {
          showSimpleToast('请输入合法的手机号');
        } else {
          sixCodeRandom = getSixCodeRandom();
          const sendCodeMessage = `获取验证成功，您获取的验证码是 ${sixCodeRandom}`;
          const timer = setTimeout(() => {
            clearTimeout(timer);

            showSimpleToast(sendCodeMessage);
  
            this.setData({
              sendCodeMessage,
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
  }

  

})
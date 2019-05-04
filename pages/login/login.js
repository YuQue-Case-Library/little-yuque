const app = new getApp();

Page({
  data:{
    // 表示登录方式  1 => 密码登录   2 => 验证码登录
    loginType: 1
  },

  // 切换登录方式
  handleSwitchLogin() {
    const { loginType } = this.data;

    if (loginType === 1) {
      this.setData({
        loginType: 2
      });
    } else if (loginType === 2) {
      this.setData({
        loginType: 1
      });
    }
  },

  // 提交表单
  formSubmit(e) {
    const loginData = e.detail.value;
    const { username, password } = loginData;

    if(username !== '' && password !== '') {
      this.login(loginData);
    }
  },

  // 登录
  login(loginData) {
    app.globalData.$api({
      url: `/users/${loginData.username}`,
      success({ data }) {
        wx.setStorage({
          key: 'userInfo',
          data: data.data,
          success(res) {
            
          }
        })
      }
    })
  },
})
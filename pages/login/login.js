const app = new getApp();

Page({
  data:{

  },
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
// 响应返回码以及对应信息
const response_code_msg = {
  400: '请求的参数不正确，或缺少必要信息',
  401: '需要用户认证的接口用户信息不正确',
  403: '缺少对应功能的权限',
  404: '数据不存在，或未开放',
  500: '服务器异常',
}

const baseUrl = 'https://www.yuque.com/api/v2'

const $api = apiParams => {
  const userToken = wx.getStorageSync('userToken')
  const { method = 'GET', header, url } = apiParams

  // 请求 header
  let customerHeader = {
    'X-Auth-Token': userToken,
  }

  if(['POST', 'PUT'].includes(method)) {
    customerHeader = {
      ...header,
      ...customerHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  return wx.request({
    ...apiParams,
    url: baseUrl + url,
    header: customerHeader,
    fail ({ data: { status } }) {
      wx.showToast({
        title: response_code_msg[status],
        icon: 'none',
        duration: 2000
      })
    },
    complete({ data: { status } }) {
      wx.hideLoading()
      const responseMsg = response_code_msg[status]

      if(typeof responseMsg !== 'undefined') {
        wx.showToast({
          title: responseMsg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
}

module.exports = $api
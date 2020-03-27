import axios from 'axios';
import { Message } from 'element-ui';
import Qs from 'qs';
// import store from '@/store';
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
  withCredentials: false // 部署到开发环境 为true 保证cookie在同一个作用域
  // withCredentials: false // 本地mock 数据的时候为false
  // 'Content-Type': 'application/x-www-form-urlencoded'
  // async: true,
  // crossDomain: true,
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers = { // mock 释放
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    config.data = Qs.stringify(config.data);
    // if (config.url.indexOf('login') === -1) { // 开发环境使用
    //   config.headers = {
    //     'token': localStorage.token
    //   }
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // const res = response.data;
    let res = response.data;
    if (typeof res !== 'object') { // mock 使用
      res = eval('(' + res + ')');
    }
    if (res.status !== '000000000') {
      // status以5开头，是登录注册的错误，提示其对应的名称
      // status以3开头，是业务校验的错误，提示其对应的名称
      if (res.status.indexOf('5') === 0 || res.status.indexOf('3') === 0) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        // 其他类型的错误提示操作失败
        Message({
          message: '操作失败，请稍后重试00',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject();
    } else {
      return res.result
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '操作失败，请稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject()
  }
)

export default service

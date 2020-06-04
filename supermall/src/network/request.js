import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: '请添加coderwhy002微信好友获取最新接口地址',
  timeout: 10000
})

  // 2.axios的拦截器
  // 2.1 关于请求拦截的作用
  instance.interceptors.request.use(config => {

    // 如果只是拦截不返回，
    return config
  }, err => {
    // console.log(err);
  })
  // 2.2 相应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
// 发送真正的网络请求
  return instance(config)
}


/* eslint-disable */
import axios from 'axios'


// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: `http://127.0.0.1:3333`,
  // 超时
  timeout: 50000
})
/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config) => {
  return config
}
// 请求拦截器
service.interceptors.request.use(
  requestConf,
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use((response) => {
  const res = response.data
  return res
}, (error) => {
  // return Promise.reject(error)
  // 当前访问路由
  const err = error.toString()
  return Promise.reject(error)
}
)

export default service

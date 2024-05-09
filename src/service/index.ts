// 导入用于配置请求的基础 URL 和超时时间的常量
import { BASE_URL, TIME_OUT } from './config'
// 导入自定义的请求类
import LSJRequest from './request'

/**
 * @description 创建请求实例
 * @param baseURL
 * 基础 URL
 * @param timeout
 * 超时时间
 * @param interceptors
 * 请求拦截器
 * 定义了一个请求拦截器，用于在每次请求发送前处理请求配置。在拦截器中，它会从 localStorage 中获取名为 'LOGIN_TOKEN' 的 token，如果存在的话，就将其添加到请求的头部 Authorization 中。
 * @return config
 */
const lsjRequest = new LSJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localStorage.getItem('LOGIN_TOKEN')
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = token
      }
      return config
    }
  }
})

/* 将创建的请求实例 lsjRequest 导出，以便在其他文件中使用。 */
export default lsjRequest

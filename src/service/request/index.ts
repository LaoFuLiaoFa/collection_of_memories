// 导入 Axios 模块
import axios from 'axios'
// 导入Axios 实例的类型声明和请求配置的类型声明
import type { AxiosInstance } from 'axios'
import type { LSJRequestConfig } from './type'

class LSJRequest {
  instance: AxiosInstance

  constructor(config: LSJRequestConfig) {
    // 创建 Axios 实例并传入配置
    this.instance = axios.create(config)

    // 请求和响应拦截器的设置
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  request<T = any>(config: LSJRequestConfig<T>) {
    // 单次请求的成功拦截处理
    // if (config.interceptors?.requestSuccessFn) {
    //   config = config.interceptors.requestSuccessFn(config as InternalAxiosRequestConfig)
    // }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 定义了 get 和 post 方法作为常用的 GET 和 POST 请求的快捷方式
  get<T = any>(config: LSJRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: LSJRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
}

export default LSJRequest

import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

/**
 * @description 针对AxiosRequestConfig配置进行扩展。
 * @param requestSuccessFn
 * 用于请求成功拦截器，接收一个 InternalAxiosRequestConfig 类型的参数，并返回一个同样类型的对象。
 * @param requestFailureFn
 * 用于请求失败拦截器，接收任意类型的参数，并返回任意类型的值。
 * @param responseSuccessFn
 * 用于响应成功拦截器，接收一个泛型 T 类型的响应对象，并返回相同类型的响应对象
 * @param responseFailureFn
 * 用于响应失败拦截器，接收任意类型的参数，并返回任意类型的值。
 * @return void
 */
export interface LSJInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

/**
 * @description 继承了 Axios 的请求配置 AxiosRequestConfig，并额外添加了一个 interceptors 属性。
 * @param interceptors
 * 类型为 LSJInterceptors，用于配置请求和响应的拦截器。
 * @return void
 */
export interface LSJRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: LSJInterceptors<T>
}

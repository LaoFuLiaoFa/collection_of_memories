/**
 * @description 查询模块
 */
import lsjRequest from '@/service/index'

/**
 * @description
 * @method get
 */
export function JWHselectmodule() {
  return lsjRequest.get({
    url: '/selectmodule'
  })
}

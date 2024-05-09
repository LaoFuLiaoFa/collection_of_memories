/**
 * @description 右侧抽屉页面的请求。
 * @Author: 李雪茹
 */
import lsjRequest from '@/service/index'

/**
 * @description 查询模块内信息。
 * @param null
 * @method get
 */

export function LXRselectmodule() {
  return lsjRequest.get({
    url: '/selectmodule'
  })
}
/**
 * @description 查询一级标题
 * @param {string}id 查询的模块id
 * @method post
 */
export function LXRselecttitle(formData: any) {
  return lsjRequest.post({
    url: '/selecttitle',
    data: formData
  })
}

/**
 * @description 询问问题
 * @param {string}id 一级标题的id
 * @method post
 */
export function LXRselectissue(formData: any) {
  return lsjRequest.post({
    url: '/selectissue',
    data: formData
  })
}

/**
 * @description 返回提示字段
 * @param {string}welcome_id 标题或问题的id
 * @method post
 */
export function LXRselectwelcome(formdata2: any) {
  return lsjRequest.post({
    url: '/selectwelcome',
    data: formdata2
  })
}
/**
 * @description 查询文章字数
 * @param {string}question_id 标题或问题的id
 * @method post
 */
export function LXRwordcount(formdata: any) {
  return lsjRequest.post({
    url: '/wordcount',
    data: formdata
  })
}
/**
 * @description 修改文章内容
 * @param {string}question_id 一级标题或问题的id
 * @param {string}essay 修改内容
 * @method post
 */
export function LXRupdateessay(formdata: any) {
  return lsjRequest.post({
    url: '/updateessay',
    data: formdata
  })
}
/**
 * @description 查询文章具体内容
 * @param {string}question_id 一级标题或问题的id
 * @method post
 */
export function LXRessay(formdata: any) {
  return lsjRequest.post({
    url: '/essay',
    data: formdata
  })
}

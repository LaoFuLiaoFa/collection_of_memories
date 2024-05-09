/**
 * @description 欢迎词
 */
import lsjRequest from '@/service/index'

/**
 * @description
 * @param {string} welcome_id
 * @method post
 */
export function JWHContent(welcome_id: string) {
  return lsjRequest.post({
    url: '/selectwelcome',
    params: { welcome_id }
  })
}
/**
 * @description 存用户回答
 */
/**
 * @description
 * @param {string} id
 * @param {string} issue
 * @method post
 */
export function JWHstorage(id: string, issue: string) {
  return lsjRequest.post({
    url: '/createuser',
    params: { id, issue }
  })
}
/**
 * @description 调用大模型
 */
/**
 * @description
 * @param {string} prompt
 * @param {string} id
 * @method post
 */
export function JWHIntelligent(prompt: string, id: string) {
  // console.log(id)
  const formdata = new FormData()
  formdata.append('id', id)
  formdata.append('prompt', prompt)
  return lsjRequest.post({
    url: '/chat',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: formdata
  })
}
/**
 * @description 询问问题
 */
/**
 * @description
 * @param {string} id
 * @method post
 */
export function JWHaskquestion(id: string) {
  return lsjRequest.post({
    url: '/selectissue',
    params: { id }
  })
}
/**
 * @description 存进大模型
 */
/**
 * @description
 * @param {string} id
 * @param {string} issue
 * @method post
 */
export function JWHstorageai(id: string, issue: string) {
  const formdata = new FormData()
  formdata.append('id', id)
  formdata.append('issue', issue)
  // const is = JSON.stringify(issue)
  return lsjRequest.post({
    url: '/createheat',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: formdata
  })
}
/**
 * @description 整合文章
 */
/**
 * @description
 * @param {string} question_id
 * @method post
 */
export function JWHsummarizeai(question_id: string) {
  return lsjRequest.post({
    url: '/conformity',
    params: { question_id }
  })
}
/**
 * @description 存整合文章
 */
/**
 * @description
 * @param {string} question_id
 * @method post
 */
export function JWHcunchu(question_id: string, essay: string) {
  console.log(question_id)
  const formdata = new FormData()
  formdata.append('question_id', question_id)
  formdata.append('essay', essay)
  // const es = JSON.stringify(essay)
  return lsjRequest.post({
    url: '/createessay',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: formdata
  })
}

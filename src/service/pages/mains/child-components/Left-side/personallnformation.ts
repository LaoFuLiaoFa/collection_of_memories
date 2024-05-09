import lsjRequest from '@/service'

//获取个人信息
export function ZHQgetPersonal() {
  const token = localStorage.getItem('LOGIN_TOKEN')
  return lsjRequest.get({
    url: '/user/selectInformation',
    headers: {
      Authorization: token // 将请求头内容传递给后端
    }
  })
}
//修改个人信息
export function Editperson(formState: FormData) {
  const token = localStorage.getItem('LOGIN_TOKEN')
  return lsjRequest.post({
    url: '/user/updateInformation',
    headers: {
      Authorization: token // 将请求头内容传递给后端
    },
    data: formState
  })
}

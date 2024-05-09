let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'https://ai.developer.nsu.edu.cn'
} else {
  // 开发环境
  BASE_URL = 'https://ai.developer.nsu.edu.cn'
}
// http://172.17.154.201:8080
// http://47.108.144.113:7824

// 10秒
export const TIME_OUT = 100000

export { BASE_URL }

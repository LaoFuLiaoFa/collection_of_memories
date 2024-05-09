<template>
  <div class="box" ref="containerRef">
    <div class="head-portrait">
      <div v-for="dialog in dialogs" :key="dialog.key" class="dialog-container">
        <component
          :is="dialog.component"
          :userMessage="dialog.type === 'user' && dialog.content"
          :aiMessage="dialog.type === 'ai' && dialog.content"
          :is-latest="dialog.isLatestInType"
          :show-intention-buttons="dialog.showIntentionButtons"
        ></component>
      </div>
    </div>
    <div v-for="(message, index) in messages">
      <a-alert
        v-if="visible"
        :message="message"
        type="success"
        closable
        :after-close="() => handleClose(index)"
        style="
          background-color: #a6a6a6;
          color: #fff;
          width: 60%;
          margin: 0 auto;
          border: 1px solid #fff;
          font-size: 30px;
        "
      />
    </div>
    <!-- <Button type="dashed" @click="hint">提示</Button> -->
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUpdate, onUpdated, reactive, ref, watch } from 'vue'
import Ai from './Content-page/Ai.vue'
import User from './Content-page/User.vue'
import { onMounted } from 'vue'
import axios from 'axios'
import {
  JWHContent,
  JWHstorage,
  JWHstorageai,
  JWHsummarizeai,
  JWHIntelligent,
  JWHcunchu
} from '@/service/pages/mains/child-components/Middle-content/Content'
import { aihint, aidefine } from '@/stores/index'
const visible = ref<boolean>(true)
const messages = ref<string[]>([])
const handleClose = (index: number) => {
  messages.value.splice(index, 1)
}
const containerRef = ref()
const scrollBottom = () => {
  const container = containerRef.value
  if (container) {
    container.scrollTop = container.scrollHeight
    // console.log(container.scrollTop)
    // console.log(container.scrollHeight)
  }
}
// 监听 aihint 的变化，并根据新的 welcomContent获取不同人物的首个提示
const welcomeStore = aihint() // 使用 useStore 获取 aihint 存储模块
const welcomContent = ref('') // 声明一个响应式引用用于存储欢迎内容
watch(
  () => welcomeStore.$state.welcom,
  async (newVal) => {
    await welcomeStore.getWelcomeMessage(newVal) // 调用存储模块中的获取欢迎信息的方法
    welcomContent.value = welcomeStore.welcom // 更新当前组件中的欢迎内容
    synthesizeAndPlay(welcomContent.value)
    // console.log('成功' + welcomContent.value)
  }
)
//监听问题id变化,并根据新的
//问题
const aidef = aidefine()
const aidefContent = ref('')
const aidefid = ref('')
const aidefstate = ref('')

//let xxxId = ref(window.localStorage.getItem('xxx') as string)
const xxId = window.localStorage.getItem('xxx') as string
/* console.log(xxxId)
setTimeout(() => {
  window.addEventListener('storage', (e) => {
    console.log(e)

    if (e.key === 'xxxId') {
      console.log('dayin')
      summarizeai()
    }
  })
}, 5000) */

watch(
  () => aidef.$state.aianswer,
  async (xxIde) => {
    await aidef.askquestion(xxId)
    aidefContent.value = aidef.aianswer //这里是问题内容
    // console.log(aidefContent.value)
    addDialog(Ai, 'ai', aidefContent.value)
    aidefid.value = aidef.answerid //这里是ai问题id
    localStorage.setItem('aidefid', aidefid.value)
    aidefstate.value = aidef.answerstate //这里是ai问题状态
    console.log(aidefstate.value)
    console.log(typeof aidefstate.value)
    if (aidefContent.value === '已到最后一个问题正在生成文章') {
      summarizeai()
    }
    //console.log('成功' + aidefContent.value)
  }
)
/* watch(aidefstate, (newValue, oldValue) => {
  if (aidefContent) {
    summarizeai()
  }
}) */
/* const hint = () => {
  // 获取 aiquestion store 的实例
  const welcomeStore = aihint()
  // 然后你可以调用其中的函数和访问数据
  //因为获取welcomeMessage是异步的,所以需要用then
  welcomeStore.getWelcomeMessage(issue_id).then(() => {
    const welcomeMessage = welcomeStore.welcom
    messages.value.push(welcomeMessage)
    synthesizeAndPlay(welcomeMessage)
  })
} */
onUpdated(() => {
  scrollBottom()
})
// let id = '2'
// //调用询问问题接口
// async function askquestion() {
//   // console.log(useraccount.value)
//   // console.log(password.value)
//   const aianswerResult = await JWHaskquestion(id)
//   //console.log(welcomResult)
//   if (aianswerResult.code == 200) {
//     const aianswer = aianswerResult.data.issue
//     addDialog(Ai, 'ai', aianswer)
//     //console.log(welcomResult.data)
//   } else {
//     /* empty */
//   }
// }
// 这里是提示,直接用语音进行提示
let audio: any
async function synthesizeAndPlay(welcomeMessage: string) {
  if (!welcomeMessage) {
    alert('Please enter some text to welcomeMessage.')
    return
  }

  try {
    const token = localStorage.getItem('LOGIN_TOKEN')
    // console.log(token)
    const apiUrl = `https://ai.developer.nsu.edu.cn/synthesizes?text=${encodeURIComponent(welcomeMessage)}`
    if (token) {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: token // 将请求头内容传递给后端
        }
      })
      // console.log(response.ok)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch synthesized audio. Status: ${response.status}`
        )
      }

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      // 将 Audio 实例赋值给全局变量 audio
      audio = new Audio(blobUrl)
      audio.play()
      messages.value.pop()
    }
  } catch (error) {
    console.error('Error fetching and playing synthesized audio:', error)
  }
}
//创建聊天框
interface Dialog {
  component: any
  type: string
  indexInType: number
  isLatestInType: boolean
  showIntentionButtons: boolean
  key: string
  content: string
}

const dialogs = ref<Dialog[]>([])
//增加聊天框,根据类型增加(user,ai)
const addDialog = (Component: any, type: string, content: string) => {
  const lastIndexInType = dialogs.value.filter(
    (dialog) => dialog.type === type
  ).length
  const isFirstAiDialog =
    type === 'ai' && !dialogs.value.some((dialog) => dialog.type === 'ai')
  const newDialog: Dialog = {
    component: Component,
    type,
    indexInType: lastIndexInType,
    isLatestInType: true,
    showIntentionButtons: isFirstAiDialog,
    key: `${type}-${lastIndexInType}`,
    content
  }

  dialogs.value
    .filter((dialog) => dialog.type === type)
    //设置user对话框如果不是最新对话框不显示结束按钮
    .forEach((dialog) => (dialog.isLatestInType = false))
  dialogs.value.push(newDialog)
  // if (dialogs.value) {
  //   scrollBottom()
  // }
}

const props = defineProps({
  userInput: String
})
//监听userinput的变化,存储到数据库并渲染到页面
watch(
  () => props.userInput,
  (newvalue, oldvalue) => {
    if (newvalue !== oldvalue && newvalue) {
      addDialog(User, 'user', newvalue)
      storage(newvalue) //将user内容存储到数据库
      console.log(aidefid.value)
      Intelligent(newvalue, aidefid.value)
    }
  }
)

//调用存储用户回答接口
async function storage(newvalue: string) {
  const userResult = await JWHstorage(aidefid.value, newvalue)
  if (userResult.code == 200) {
    // console.log(userResult.msg)
  } else {
    /* empty */
  }
}
//调用欢迎词接口
const welcom = ref<string>('')
let welcome_id = '1'
welcome()
async function welcome() {
  // console.log(useraccount.value)
  // console.log(password.value)
  const welcomResult = await JWHContent(welcome_id)
  //console.log(welcomResult)
  if (welcomResult.code == 200) {
    welcom.value = welcomResult.data
    addDialog(Ai, 'ai', welcom.value) //ai的欢迎词,正确
    //console.log(welcomResult.data)
    setTimeout(() => {}, 1000)
  } else {
    /* empty */
  }
}
//调用大模型接口
/* async function Intelligent(newvalue: string) {
  // console.log(useraccount.value)id
  // console.log(password.value)
  const answerResult = await JWHIntelligent(newvalue, id)
  //console.log(welcomResult)
  if (answerResult.code == 200) {
    console.log(answerResult.data)
    addDialog(Ai, 'ai', answerResult.data)
  } else {
  }
} */
//调用大模型接口,将user对话框的内容传给大模型处理
async function Intelligent(newvalue: string, id: any) {
  if (!newvalue) {
    alert('Please enter some text to synthesize.')
    return
  }

  try {
    // const token = localStorage.getItem('LOGIN_TOKEN')
    // console.log(token)
    console.log(newvalue)
    let over = ''
    for (var i = 0; i < newvalue.length; i++) {
      newvalue[i]
      over = over + newvalue[i]
    }
    // let result = over.slice(0, 50)
    const reaponse = await JWHIntelligent(over, id)
    console.log(reaponse)
    // const responseData = await reaponse.json()
    if (reaponse.code === '200') {
      addDialog(Ai, 'ai', reaponse.data)
      storageai(reaponse.data)
      console.log(reaponse.data)
    }

    // const apiUrl = `https://ai.developer.nsu.edu.cn/chat?prompt=${encodeURIComponent(newvalue)}&id=${id}`
    // if (token) {
    //   const response = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Access-Control-Allow-Origin': 'https://ai.developer.nsu.edu.cn',
    //       Authorization: token // 将请求头内容传递给后端
    //     }
    //   })
    //   // console.log(response.ok) c
    //   if (response.ok) {
    //     const responseData = await response.json()
    //     addDialog(Ai, 'ai', responseData.data)
    //     storageai(responseData.data)
    //     console.log(responseData.data)
    //   }
    // }
  } catch (error) {
    console.error('Error fetching and playing synthesized audio:', error)
  }
}
//存进大模型
async function storageai(storage: string) {
  const storageResult = await JWHstorageai(aidefid.value, storage)
  console.log(storageResult)
  if (storageResult.code == 200) {
    console.log(storageResult.msg)
  } else {
    /* empty */
  }
}
//创建一个让大模型总结的专门空值id
const idnull = '1'
//取出人物id,整合人物
const issueId = localStorage.getItem('issueId') as string

//整合文章
async function summarizeai() {
  console.log(issueId)
  const storageResult = await JWHsummarizeai(issueId)
  if (storageResult.code == 200) {
    //把整合的文章发给大模型进行总结,id传空
    Intelligent(storageResult.data, idnull)
    let over = ''
    for (var i = 0; i < storageResult.data.length; i++) {
      storageResult.data[i]
      over = over + storageResult.data[i]
    }
    addDialog(Ai, 'ai', over)
    console.log(over)
    cunchuResult(issueId, over)
    console.log(cunchuResult)
  } else {
    /* empty */
  }
}

// 存储大模型
async function cunchuResult(id: string, newvalue: string) {
  if (!newvalue) {
    alert('Please enter some text to synthesize.')
    return
  }

  try {
    // let result = newvalue.slice(0, 50)
    const reaponse = await JWHcunchu(id, newvalue)
    console.log(reaponse)
    // const responseData = await reaponse.json()
    if (reaponse.code === 200) {
      console.log(reaponse.data)
    }
    //   const token = localStorage.getItem('LOGIN_TOKEN')
    //   // console.log(token)
    //   const apiUrl = `https://ai.developer.nsu.edu.cn/createessay?essay=${encodeURIComponent(newvalue)}&question_id=${id}`
    //   if (token) {
    //     const response = await fetch(apiUrl, {
    //       method: 'POST',
    //       headers: {
    //         Authorization: token // 将请求头内容传递给后端
    //       }
    //     })
    //     console.log(response.ok)
    //   }
  } catch (error) {
    console.error('Error fetching and playing synthesized audio:', error)
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  margin: 0 auto;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  overflow-y: auto;
}
.head-portrait {
  display: flex;
  flex-direction: column;
  gap: 12px; /* 设置子元素之间的间距 */
}
</style>

<template>
  <div>
    <a-button
      v-for="(button, index) in buttons"
      :key="index"
      type="primary"
      size="large"
      :style="{ backgroundColor: button.styles.bgplay }"
      @click="handleOver"
      >结束话题</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { h } from 'vue'
import { RedditOutlined } from '@ant-design/icons-vue'
import { defineProps } from 'vue'
import { aidefine, aihint } from '@/stores/index'
//调用pinia里面的新的问题
const welcomeStore = aihint()
const questionStore = aidefine()
//取出issueId,这是选择人物的id
const issueId = localStorage.getItem('issueId') as string
const aidefid = localStorage.getItem('aidefid') as string
function handleOver() {
  //这里获得新提示
  welcomeStore.getWelcomeMessage(aidefid).then(() => {
    const welcomeMessage = welcomeStore.welcom
    //console.log(welcomeMessage) //这里已经确认调用的提示是正确的也能语音播放
    //console.log(issueId) //这里已经确认是把人物的id传给了pinia
  })
  //这里获得新提问
  questionStore.askquestion(issueId).then(() => {
    const questionanswer = questionStore.aianswer
    const questionanswerid = questionStore.answerid
    const questionanswerstate = questionStore.answerstate
    //console.log(questionanswer) //ai问题正确
    //console.log(questionanswerid) //ai问题id正确
    console.log(questionanswerstate) //ai问题状态正确
    console.log(typeof questionanswerstate) //ai问题状态正确
    //window.localStorage.setItem('xxx', questionanswerstate)
  })
}

const props = defineProps({
  content: String // 声明一个名为 content 的 prop，类型为字符串
})
// 定义按钮数据
const buttons = ref([
  {
    id: 1,
    styles: {
      bgplay: '#ffc364'
    },
    icons: {
      finish: h(RedditOutlined)
    },
    active: false // 初始状态为非激活状态
  }
])
</script>
<style scoped></style>

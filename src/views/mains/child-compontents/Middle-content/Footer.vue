<template>
  <div class="footer">
    <div v-if="showFirstBox">
      <a-row :gutter="[24, 16]">
        <a-col :span="3">
          <a-button
            type="primary"
            shape="circle"
            size="large"
            @click="toggleBox"
            style="
              width: 50px;
              height: 50px;
              border: 3px solid rgba(54, 136, 255, 1);
            "
            ghost
          >
            <template #icon>
              <AudioOutlined style="font-size: 30px" />
            </template> </a-button
        ></a-col>
        <a-col :span="16">
          <a-input
            v-model:value="inputValue"
            size="large"
            placeholder="请输入..."
        /></a-col>
        <a-col :span="5">
          <a-button
            type="primary"
            size="large"
            @click="onSendClick"
            style="background-color: rgba(255, 195, 100, 1); height: 50px"
            >发送</a-button
          >
        </a-col>
      </a-row>
    </div>
    <div class="box" v-else>
      <a-row>
        <a-col :span="3">
          <a-button
            shape="circle"
            size="large"
            style="width: 50px; height: 50px"
            @click="toggleBox"
          >
            <template #icon>
              <InsertRowBelowOutlined style="font-size: 30px" />
            </template>
          </a-button>
        </a-col>
        <a-col :span="21">
          <a-button
            size="large"
            block
            @click="onSendClick"
            class="voicebutton"
            :class="{ 'long-press': isLongPressed }"
            @mousedown="startLongPress"
            @mouseup="LongPress"
            @mouseleave="endLongPress"
          >
            <span v-if="isLongPressed" class="soundwave">
              <SoundWave />{{ buttonText }}<SoundWave />
            </span>
            <span v-else>
              {{ buttonText }}
            </span></a-button
          >
        </a-col>
      </a-row>

      <a-modal v-model:open="open" width="1000px" centered :closable="false">
        <template #footer>
          <a-button
            key="back"
            @click="handleCancel"
            size="large"
            style="background-color: rgba(255, 195, 100, 0.8)"
            >取消</a-button
          >
          <a-button
            key="submit"
            @click="handleOk"
            size="large"
            style="background-color: rgba(54, 136, 255, 0.6)"
            >发送</a-button
          >
        </template>
        <a-textarea
          style="font-size: 30px"
          v-model:value="voceValue"
        ></a-textarea>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AudioOutlined, InsertRowBelowOutlined } from '@ant-design/icons-vue'
import SoundWave from '../../child-compontents/Middle-content/Content-page/SoundWave.vue'

/* 20240430 增加3个引用js用于录音 */
import '//js.nsu.edu.cn/record/recorder-core.js'
import '//js.nsu.edu.cn/record/wav.js'
import '//js.nsu.edu.cn/record/pcm.js'
import * as rec from '../../../../utils/rec.js'
//import * as rec from '//js.nsu.edu.cn/record/rec.js'

//f_定义一个消息回调函数
const showAudioText = (data: string) => {
  // console.log('text', data)
  voceValue.value = data
}
//f_预初始化,如果返回非0说明失败
let initState = rec.initRecord(
  showAudioText,
  'wss://audio.developer.nsu.edu.cn/ws_rec/'
)
//console.log('initState', initState)

const showFirstBox = ref(true) // 初始显示第一个box
//换输入方式
const toggleBox = () => {
  showFirstBox.value = !showFirstBox.value
}
//语音输入状态
const buttonText = ref('请长按输入语音')
let isLongPressed = ref(false)
const startLongPress = () => {
  isLongPressed.value = true
  buttonText.value = ''
  //f_开始录音，可判断返回状态
  voceValue.value = ''
  rec.startRecord()
  //测试实时语音
  //open.value = true
}
const LongPress = () => {
  showModal()
  isLongPressed.value = false
  buttonText.value = '请长按输入语音'

  //f_结束录音，可判断返回状态
  rec.stopRecord()
}
const endLongPress = () => {
  isLongPressed.value = false
  buttonText.value = '请长按输入语音'
}
//语音输入确认框
const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
}
const handleOk = (e: MouseEvent) => {
  // console.log(e)
  // console.log(voceValue.value)
  onSendvoice()
  open.value = false
}
const handleCancel = () => {
  open.value = false
}
//输入框内的内容将会传给父组件mainpage
//mainpage会传给他的子组件content
//由content添加user对话框,传给他的子组件user渲染在user对话框里
const inputValue = ref('')
const emit = defineEmits(['inputValueChanged'])
const onSendClick = () => {
  emit('inputValueChanged', inputValue.value)
  inputValue.value = ''
}
const voceValue = ref('')
const onSendvoice = () => {
  emit('inputValueChanged', voceValue.value)
  console.log(voceValue.value)
}
</script>

<style scoped>
.box {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* height: 150px; */
  /* padding: 0 300px; */
  /* gap: 80px; */
  /* margin-top: 15px; */
  margin: 0 auto;
  text-align: center;
  z-index: 1;
}
.components-input-demo-size .ant-input {
  width: 100%;
  min-width: 800px;
  max-width: 1000px;
  height: 100px;
  font-size: 30px;
  border-radius: 15px;
}
.button {
  width: 150px;
  height: 100px;
  font-size: 30px;
  background: #ffc364;
  border-radius: 15px;
}
.voice {
  transform: scale(3);
  color: #aecaf3;
  border: 2px solid #aecaf3;
}
.voicebutton {
  /* width: 1000px; */
  /* height: 100px; */
  font-size: 30px;
  height: 50px;
  line-height: 30px;
  background: #06c293;
  color: rgb(255, 255, 255);
  border-radius: 15px;
}
.voicebutton:hover {
  background: #a6a6a6;
  color: #fff;
}
.soundwave {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cansle {
  background: #ffc364;
  color: #fff;
}
.send {
  background: #06c293;
  color: #fff;
}
</style>

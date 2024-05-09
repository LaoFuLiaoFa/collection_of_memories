<template>
  <div>
    <a-button
      type="primary"
      size="large"
      v-for="(button, index) in buttons"
      :key="index"
      :style="{
        backgroundColor: button.active
          ? button.styles.bgplay
          : button.styles.bgpause,
        borderRadius: '8px',
        color: '#fff'
      }"
      @click="toggleButtonStyle(button)"
      :icon="button.active ? button.icons.pause : button.icons.play"
    >
      <!-- <template #icon>
        <DownloadOutlined />
      </template> -->
    </a-button>
    <!-- <Button
      v-for="(button, index) in buttons"
      :key="index"
      type="primary"
      :style="{
        backgroundColor: button.active
          ? button.styles.bgplay
          : button.styles.bgpause,
        borderRadius: '8px',
        color: '#fff'
      }"
      @click="toggleButtonStyle(button)"
      :icon="button.active ? button.icons.pause : button.icons.play"
    >
    </Button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import { h } from 'vue'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import { defineProps } from 'vue'
const textToSynthesize = ref('')
const player = ref<HTMLAudioElement | null>(null)
const props = defineProps({
  content: String // 声明一个名为 content 的 prop，类型为字符串
})
// console.log(props.content)
// 定义按钮数据
const buttons = ref([
  {
    id: 1,
    styles: {
      bgplay: '#5da0ea',
      bgpause: '#ffc364'
    },
    icons: {
      play: h(CaretRightOutlined), // 播放图标
      pause: h(PauseOutlined) // 暂停图标
    },
    active: false // 初始状态为非激活状态
  }
])

// 点击按钮时切换样式的函数
const toggleButtonStyle = (button: { active: boolean; id: number }) => {
  try {
    // 如果按钮是激活状态，则暂停音频并切换到初始样式
    if (button.active) {
      pauseAudio()
    } else {
      // 如果按钮是非激活状态，则播放音频并切换到新样式
      synthesizeAndPlay(button)
    }
    // 切换按钮状态
    button.active = !button.active
  } catch (error) {
    console.error('Error toggling button style:', error)
  }
}
// 定义全局变量 audio
let audio: any
async function synthesizeAndPlay(buttonId: { active: boolean; id: number }) {
  const button = buttonId
  if (!props.content) {
    alert('Please enter some text to synthesize.')
    return
  }

  try {
    const token = localStorage.getItem('LOGIN_TOKEN')
    // console.log(token)
    const apiUrl = `http://47.108.144.113:7824/synthesizes?text=${encodeURIComponent(props.content)}`
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
      audio.addEventListener('ended', () => {
        // 在音频播放结束后，切换按钮样式
        button.active = !button.active
      })
    }
  } catch (error) {
    console.error('Error fetching and playing synthesized audio:', error)
  }
}
//暂停播放
const pauseAudio = () => {
  if (audio) {
    audio.pause() // 暂停音频播放
  } else {
    console.warn('Audio is not initialized or null.')
  }
}
</script>
<style scoped></style>

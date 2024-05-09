<template>
  <div class="Input_box">
    <div class="mask" v-if="recording"></div>
    <a-button
      class="Input_button"
      :class="{ 'input-red': !recording, 'input-white': recording }"
      >{{ recording ? '正在说话...' : '长按发送' }}
    </a-button>
    <div v-if="recording" class="speech-bubble">
      <!-- 显示声音波形的组件（VoiceWave） -->
      <VoiceWave v-show="hasAudioInput" :show="true" />
      <!-- 根据是否有音频输入显示不同提示 -->
      <p v-if="hasAudioInput" style="color: #4caf50; text-align: center">
        上滑取消发送
      </p>
      <p v-else style="color: #c84732; font-size: 20px">请说话</p>
      <p v-if="canceling"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { Ref } from 'vue'
import 'recorder-core/src/engine/wav.js'
import axios from 'axios'

const emit = defineEmits(['dataReceived'])
const hasAudioInput = ref(true) //是否显示动画
const cancel = ref(false) // 上滑并松手，确定取消录音
const canceling = ref(false) // 在上滑时用户上滑会取消
const recording = ref(false) //是否说话状态
// let startY = 0; // 用于判断上滑取消
</script>

<style scoped>
@import url('../../../../assets/css/voiceInputCss/VoiceInput.css');
</style>

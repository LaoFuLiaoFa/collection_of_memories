<template>
  <div class="time">{{ currentTime }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTime = ref<string>('')

// 生成当前时间
function generateTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 首次生成当前时间
generateTime()
</script>

<style scoped>
.time {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #56684f;
  padding-bottom: 2px;
}
</style>

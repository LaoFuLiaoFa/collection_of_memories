<template>
  <div>
    <Time />
    <div class="left">
      <a-avatar :size="100" class="ai"></a-avatar>
      <div class="chatBox chatBox-left">
        <div class="chatboxcontent">
          <div>
            <div
              class="custom-tooltip-content"
              :style="{ height: '100%', overflow: 'hidden' }"
            >
              <span class="content">
                {{ aiMessage }}
              </span>
            </div>
            <div class="custom-tooltip-button">
              <VoiceButton :content="aiMessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="intention" v-if="showIntentionButtons">
      <a-space wrap>
        <a-button
          type="primary"
          @click="toggleOpen"
          size="large"
          shape="round"
          style="background-color: #ffc364"
          >{{ figure }}</a-button
        >
        <a-button
          size="large"
          shape="round"
          style="background-color: #82b4fb; color: #fff"
          >{{ experience }}</a-button
        >
      </a-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Avatar as AAvatar, Popconfirm as APopconfirm } from 'ant-design-vue'
import Time from '../Content-page/Time.vue'
import VoiceButton from '../Content-page/VoiceButton.vue'
import { useOpenStore } from '@/stores/index'
import { JWHselectmodule } from '@/service/pages/mains/child-components/Middle-content/Ai'
const openStore = useOpenStore()
const toggleOpen = () => {
  openStore.controlOpen()
}
const props = defineProps<{
  aiMessage: string
  showIntentionButtons: boolean
}>()
//查询模块,将模块内容渲染到页面
const figure = ref<string>('')
const experience = ref<string>('')
selectmodule()
async function selectmodule() {
  const module = await JWHselectmodule()
  if (module.code == 200) {
    figure.value = module.data[0].module
    experience.value = module.data[1].module
  } else {
    /* empty */
  }
}
</script>
<style scoped>
.intention {
  width: 100%;
  margin: 10px 120px auto;
  font-size: 16px;
  color: #56684f;
  padding: 5px;
}
.left .ai {
  background-image: url('../../../../../assets/image/headportrait2.png');
  background-size: cover;
  background-position: center;
  min-width: 100px;
  height: 50px;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
}

.chatBox-left::before {
  content: '';
  width: 0;
  height: 0;
  position: relative;
  border: 12px solid;
  border-color: #3b64bc00 #ffffff #3b64bc00 #bc3b4a00;
  top: 10%;
}

.chatBox {
  display: flex;
}

.chatboxcontent {
  background: #ffffff;
  display: inline-block; /* 设置为内联块元素 */
  vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
  /* width: 260px; */
  padding: 10px;
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: 0 0 10px 3px rgba(204, 204, 204, 0.6);
}

.custom-tooltip-content {
  display: flex;
  font-size: 30px;
  max-width: 1800px;
  background: #ffffff;
  display: inline-block; /* 设置为内联块元素 */
  vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
  /* margin-top: 10px; */
  border-bottom: 1px solid #a8a8a8;
}
.content {
  /* text-overflow: ellipsis;  在文本溢出时显示省略号 */
  padding: 20px;
  text-align: justify;
  color: #000;
}
.custom-tooltip-button {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 12px;
  /* margin-bottom: 12px; */
  justify-content: space-around;
}
.left {
  margin: 0 auto;
  /*padding: 10px;*/
  width: 100%;
  height: 100%;
  display: flex;
}
</style>

<template>
  <div>
    <Time />
    <div class="right">
      <div class="chatBox chatBox-right">
        <div class="chatboxcontent">
          <div>
            <div
              class="custom-tooltip-content"
              style="height: 100%; overflow: hidden"
            >
              <span class="content">
                {{ userMessage }}
              </span>
            </div>
            <div class="custom-tooltip-button">
              <FinishButton v-if="isLatest" v-bind="$attrs" />
            </div>
          </div>
        </div>
      </div>
      <a-avatar :size="100" class="user"></a-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Avatar as AAvatar } from 'ant-design-vue'
import Time from '../Content-page/Time.vue'
import FinishButton from '../Content-page/FinishButton.vue'

const props = defineProps<{
  userMessage: string
  isLatest: boolean
}>()
</script>
<style scoped>
.chatBox-right::after {
  content: '';
  width: 0;
  height: 0;
  position: relative;
  border: 12px solid;
  border-color: #3b64bc00 #70707000 #3b64bc00 #ffffff;
  top: 10%;
}
.chatBox {
  display: flex;
}
.chatboxcontent {
  background: #ffffff;
  display: inline-block; /* 设置为内联块元素 */
  vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
  text-align: center;
  padding: 0 10px;
  max-width: 1800px;
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: 0 0 10px 3px rgba(204, 204, 204, 0.6);
}
.custom-tooltip-content {
  display: flex;
  font-size: 35px;
  max-width: 1770px;
  background: #ffffff;
  display: inline-block; /* 设置为内联块元素 */
  vertical-align: top; /* 垂直对齐方式，根据实际情况调整 */
  margin-top: 10px;
  border-bottom: 2px solid #b3b3b3;
}
.content {
  /* text-overflow: ellipsis;  在文本溢出时显示省略号 */
  color: black;
  margin: 0 auto;
  padding: 10px;
  text-align: justify;
}
.custom-tooltip-button {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 12px;
  margin-bottom: 12px;
  justify-content: space-around;
}
.right .user {
  background-image: url('../../../../../assets/image/headportrait.png');
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #cccc;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
  margin-right: 20px;
}
.right {
  margin: 0 auto;
  padding: 0 10px 10px 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}
.jwh {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #f5f5f5;
  background-image: url('./luge.jpeg');
  align-items: center;
}
</style>

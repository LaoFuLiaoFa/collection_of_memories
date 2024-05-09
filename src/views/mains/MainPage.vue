<!--
    * @FileDescription: 登录页面。
    * @Author: 李思佳
    * @Date: 2024年4月28日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年4月28日
-->
<template>
  <a-layout class="main">
    <a-layout-sider :style="siderStyle" width="300" style="position: relative">
      <personallnformation></personallnformation>
      <a-button
        size="large"
        type="link"
        block
        shape="round"
        @click="logout"
        style="
          color: #000;
          font-size: 20px;
          position: absolute;
          bottom: 5vh;
          left: 0;
        "
        >退出登录</a-button
      >
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="contentStyle">
        <Content :userInput="userInput" />
      </a-layout-content>
      <a-layout-footer :style="footerStyle">
        <Footer @inputValueChanged="handleInputValueChanged" class="footer" />
      </a-layout-footer>
    </a-layout>

    <!-- <a-layout-sider :style="siderStyle"> -->
    <!-- <a-button type="primary" @click="showDrawer">Open</a-button> -->
    <a-float-button
      @click="openStore.controlOpen()"
      style="top: 50%; font-size: 24px; width: 55px; height: 55px"
    >
      <template #icon>
        <LeftCircleTwoTone
          two-tone-color="#FFC364"
          :style="{ fontSize: '50px' }"
        />
      </template>
    </a-float-button>
    <a-style-provider hash-priority="high">
      <DrawerPage v-model:open="openStore.isOpen"></DrawerPage>
    </a-style-provider>

    <!-- </a-layout-sider> -->
  </a-layout>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Content from '@/views/mains/child-compontents/Middle-content/Content.vue'
import Footer from '@/views/mains/child-compontents/Middle-content/Footer.vue'

import { LeftCircleTwoTone } from '@ant-design/icons-vue'

import personallnformation from '@/views/mains/child-compontents/Left-side/PersonalInformation.vue'
import DrawerPage from '@/views/mains/child-compontents/Right-drawer/DrawerPage.vue'
import { useOpenStore } from '@/stores/index'
const openStore = useOpenStore()
const router = useRouter()
const contentStyle: CSSProperties = {
  textAlign: 'left',
  minHeight: 100,
  lineHeight: '50px',
  color: '#fff',
  backgroundColor: '#f5f5f5'
}
const siderStyle: CSSProperties = {
  position: 'relative',
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  background: 'rgba(255, 195, 100, 1)'
}
const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#ededed'
}
const logout = () => {
  router.push('/LoginPage')
}
//从子组件拿来的输入框内容
const userInput = ref('')
const handleInputValueChanged = (value: string) => {
  userInput.value = value
  // console.log(userInput.value)
}
</script>

<style scoped>
.main {
  height: 100vh;
}

.login-out {
  position: absolute;
  bottom: 2vh;
  left: 5px;
  right: 5px;
  margin: 0 auto;
  background: rgba(255, 195, 100, 1);
  color: black;
  font-size: 20px;
  height: 50px;
}
:deep.ant-float-btn .ant-float-btn-body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* transition: all 0.2s; */
}
:deep .ant-float-btn .ant-float-btn-body .ant-float-btn-content {
  overflow: hidden;
  text-align: center;
  min-height: 40px;
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 2px 4px; */
}
:deep.ant-float-btn
  .ant-float-btn-body
  .ant-float-btn-content
  .ant-float-btn-icon {
  text-align: center;
  /* margin: auto; */
  width: 50px;
  font-size: 18px;
  line-height: 1;
}
.footer {
  overflow: hidden;
}
</style>

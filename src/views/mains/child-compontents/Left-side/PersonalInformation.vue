<template>
  <a-card hoverable class="card-container">
    <img
      class="avatar"
      :width="160"
      :height="160"
      alt="一个头像"
      src="../../../../assets/image/head-photo.jpg"
    />
    <a-typography-title :level="5" style="color: white; font-size: 30px">{{
      name
    }}</a-typography-title>
    <div class="personal-information">
      <p class="ant-input">性别：{{ sex }}</p>
      <p class="ant-input">年龄：{{ age }}岁</p>
      <p class="ant-input">地址：{{ address }}</p>
    </div>
    <EditPersonal key="button" @data-updated="handleDataUpdated" />
  </a-card>
</template>

<script setup lang="ts">
import EditPersonal from './EditPersonal.vue'
import { ref } from 'vue'
import { ZHQgetPersonal } from '@/service/pages/mains/child-components/Left-side/personallnformation'
// 使用 ref 声明响应式数据
const name = ref('这是一个人名')
const sex = ref('女')
const age = ref('18岁')
const address = ref('成都市xx区')
// 接收子组件传递的数据,更新数据
const handleDataUpdated = (data: any) => {
  // console.log('Received updated data from child component:', data)
  name.value = data.name
  sex.value = data.sex
  age.value = data.age
  address.value = data.contion
}
// 获取数据
const amendMessage = async () => {
  const res = await ZHQgetPersonal()
  const resData = res.data[0]
  // console.log(resData)
  name.value = resData.name
  sex.value = resData.sex
  age.value = resData.age
  address.value = resData.contion
}
amendMessage()
</script>

<style scoped>
.personal-information {
  width: 80%;
  color: white;
  text-align: left;
  margin: auto 32px;
  line-height: 44px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 200px;
}
.personal-information::-webkit-scrollbar {
  width: 8px;
}

.personal-information::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.personal-information::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
.card-container {
  margin: 0px 10px;
  background-color: rgba(255, 195, 100, 1);
  border: none;
}
.avatar {
  border-radius: 50%;
}
.ant-input {
  font-size: 30px;
}
</style>

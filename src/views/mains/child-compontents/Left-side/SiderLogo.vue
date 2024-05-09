<!--
    * @FileDescription: 页面的头部组件。
    * @Author: 李思佳
    * @Date: 2024年4月18日
    * @LastEditors: 李思佳
    * @LastEditTime: 2024年4月18日
-->
<template>
  <div class="logo-div">
    <img
      src="../../../../assets/image/logo-font.png"
      alt="成都东软学院logo图片"
      class="logo"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.logo-div {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}

.logo {
  height: 40px;
  margin: 10px;
}
</style>

<template>
  <div class="music">
    <div class="item one"></div>
    <div class="item two"></div>
    <div class="item three"></div>
    <div class="item four"></div>
    <div class="item five"></div>
    <div class="item six"></div>
    <div class="item seven"></div>
    <div class="item eight"></div>
    <div class="item nine"></div>
    <div class="item ten"></div>
    <div class="item elevent"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.music {
  /* width: 200px;
  height: 100px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  position: absolute;
  width: 8px;
  border-radius: 6px;
  background-color: #ffffff;
}
.music .one {
  height: 18px;
  transform: translateX(-100px);
}
.music .two {
  height: 53px;
  transform: translateX(-80px);
}
.music .three {
  height: 36px;
  transform: translateX(-60px);
}
.music .four {
  height: 70px;
  transform: translateX(-40px);
}

.music .five {
  height: 30px;
  transform: translateX(-20px);
}

.music .six {
  height: 40px;
  transform: translateX(0px);
}
.music .seven {
  height: 50px;
  transform: translateX(20px);
}
.music .eight {
  height: 42px;
  transform: translateX(40px);
}
.music .nine {
  height: 36px;
  transform: translateX(60px);
}
.music .ten {
  height: 53px;
  transform: translateX(80px);
}
.music .elevent {
  height: 53px;
  transform: translateX(100px);
}
@keyframes radius-animation {
  100% {
    height: 10px;
    border-radius: 50%;
    filter: contrast(2);
  }
}
.music .one {
  animation: radius-animation 0.3s ease;
}
.music .two {
  animation: radius-animation 0.6s ease;
}
.music .three {
  animation: radius-animation 0.57s ease;
}
.music .four {
  animation: radius-animation 0.52s ease;
}
.music .five {
  animation: radius-animation 0.4s ease;
}
.music .six {
  animation: radius-animation 0.3s ease;
}
.music .seven {
  animation: radius-animation 0.7s ease;
}
.music .eight {
  animation: radius-animation 0.4s ease;
}
.music .nine {
  animation: radius-animation 0.25s ease;
}
.music .ten {
  animation: radius-animation 0.3s ease;
}
.music .elevent {
  animation: radius-animation 0.22s ease;
}
.music .item {
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
</style>

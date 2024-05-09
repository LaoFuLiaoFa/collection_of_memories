<template>
  <a-spin tip="Loading..." :spinning="spinning">
    <div class="big-box">
      <h2 class="page-title">大模型自传系统登录</h2>
      <div class="login-box">
        <div class="avatar-container">
          <img
            src="../../assets/image/head-photo.jpg"
            alt="这是动漫风的一个老年人的头像"
          />
        </div>
        <div class="wrapper">
          <div class="input-data">
            <input type="text" required v-model="useraccount" />
            <div class="underline"></div>
            <label>用户名</label>
          </div>

          <div class="input-data">
            <input
              type="text"
              required
              v-on:keyup.enter="logIn"
              v-model="password"
            />
            <div class="underline"></div>
            <label>密 码</label>
          </div>

          <div class="button-div" @click="logIn">
            <nav>
              <ul>
                <li>
                  登 录
                  <span></span><span></span><span></span><span></span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { LSJLoginRequest } from '@/service/pages/login'

const router = useRouter()

const useraccount = ref<string>('')
const password = ref<string>('')
const spinning = ref<boolean>(false)

async function logIn() {
  // console.log(useraccount.value)
  // console.log(password.value)
  const loginResult = await LSJLoginRequest(useraccount.value, password.value)
  // console.log(loginResult);
  if (loginResult.code == 200) {
    // console.log(loginResult.data)
    router.push('/MainPage')
    spinning.value = true
    localStorage.setItem('LOGIN_TOKEN', loginResult.data.token)
    message.success('登录成功')
    spinning.value = false
  } else {
    message.warning(`${loginResult.msg}`)
  }
}
</script>

<style scoped></style>

<style scoped>
.big-box {
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  align-items: center;
  background: url('../../assets/image/bc.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  place-items: center;
}

.page-title {
  text-align: center;
  padding-top: 6%;
  color: #fff;
  font-size: 40px;
}

/* 登录框 */
.login-box {
  opacity: 1;
  border-radius: 37px;
  background: rgba(51, 51, 51, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.25);
  width: 40%;
  height: 45%;
  opacity: 0.9;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.3s;
}

/* 头像 */
.avatar-container {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wrapper {
  width: 80%;
}

.input-data {
  position: relative;
  width: 100%;
  font-size: 20px;
  height: 40px;
  margin-bottom: 10%;
  margin-top: 5%;
}

.input-data input {
  color: #fff;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid rgba(255, 195, 100, 1);
  transition: border-color 0.3s; /* 添加过渡效果 */
}

.input-data input:focus,
.input-data input:valid {
  outline: none;
}

/* 输入框获得焦点时 */
.input-data input:focus ~ label,
/* 输入框的值为合法时 */
.input-data input:valid ~ label {
  transform: translateY(-25px);
  font-size: 15px;
  color: rgba(255, 195, 100, 1);
}

.input-data label {
  position: absolute;
  bottom: 10px;
  left: 0px;
  color: rgba(255, 195, 100, 1);
  pointer-events: none;
  transition: all 0.3s ease;
  outline: none;
}

.input-data .underline {
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 100%;
  background-color: rgba(255, 195, 100, 1);
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.input-data input:focus ~ .underline,
.input-data input:valid ~ .underline {
  /* 沿X轴放大 */
  transform: scaleX(1);
}

.button-div {
  padding-top: 5%;
}

nav ul li {
  --c: rgba(255, 195, 100, 1);
  color: var(--c);
  height: 45px;
  border: 3px solid var(--c);
  border-radius: 35px;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  font-size: 20px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
}

nav ul li:hover {
  color: #000;
}

nav ul li span {
  position: absolute;
  width: 25%;
  height: 100%;
  background-color: var(--c);
  border-radius: 50%;
  transform: translateY(150%);
  left: calc((var(--n) - 1) * 25%);
  transition: 0.5s;
  transition-delay: calc((var(--n) - 1) * 0.1s);
  z-index: -1;
}

nav ul li:hover span {
  /* 沿Y轴上移并放大 */
  transform: translateY(0) scale(2);
}

nav ul li span:nth-child(1) {
  --n: 1;
}

nav ul li span:nth-child(2) {
  --n: 2;
}

nav ul li span:nth-child(3) {
  --n: 3;
}

nav ul li span:nth-child(4) {
  --n: 4;
}

/* 定义动画 */
@keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

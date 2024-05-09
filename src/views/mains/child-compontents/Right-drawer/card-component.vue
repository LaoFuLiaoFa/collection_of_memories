<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <a-card
    hoverable
    class="card"
    :style="`background-color:${backgroundColor} ;margin-right: 30px ; width: 390px ; height:362px ; margin-bottom: 30px;border: 2px solid black;`"
  >
    <div class="card-content">
      <div class="content" @click="onClose">
        <a-avatar :size="64" style="margin-bottom: 10px" :src="avatar" />
        <a-button type="link" block style="color: rgb(232 154 63)">
          <slot></slot>
        </a-button>
        <span style="margin-bottom: 10px">字数：{{ count }} /字</span>
        <a-typography-paragraph
          style="font-size: 20px"
          :ellipsis="{ rows: 2, expandable: false, symbol: 'more' }"
          :content="essay"
        />
      </div>
      <div class="btn">
        <a-button
          type="primary"
          @click="showEditModal"
          style="
            border-radius: 58px;
            font-size: 26px;
            width: 129px;
            height: 58px;
          "
          :disabled="isDisabled"
          >编辑</a-button
        >

        <a-button
          type="primary"
          style="
            border-radius: 58px;
            background-color: rgba(255, 255, 255, 1);
            color: rgba(69, 153, 122, 1);
            opacity: 1;
            border: 1px solid rgba(180, 219, 205, 1);
            font-size: 26px;
            width: 129px;
            height: 58px;
          "
          @click="showModal"
          >预览</a-button
        >
      </div>
    </div>
  </a-card>
  <a-modal
    v-model:open="openEdit"
    title="编辑"
    width="100%"
    wrap-class-name="all-modal"
    @ok="handleEditOk"
    @cancel="editCancle"
    ok-text="保存"
    cancel-text="取消"
    style="text-align: center"
  >
    <a-textarea
      contenteditable
      style="font-size: 30px; height: 100%; height: 100%"
      v-model:value="editEssay"
    >
      {{ editEssay }}
    </a-textarea>
  </a-modal>
  <a-modal
    v-model:open="open"
    title="预览"
    width="100%"
    wrap-class-name="all-modal"
    :footer="null"
    style="text-align: center"
    :bodyStyle="{ overflowY: 'scroll' }"
  >
    <p style="font-size: 30px; text-align: left">{{ essay }}</p>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from 'vue'
import { aihint, aidefine } from '@/stores/index'
import avatar from '../../../../assets/image/avatar.png'
import {
  LXRselectissue,
  LXRselectwelcome,
  LXRwordcount,
  LXRupdateessay,
  LXRessay
} from '@/service/pages/mains/child-components/Right-drawer/DrawerPage'
import { AiIssue, useOpenStore } from '@/stores/index'
const Open = useOpenStore()
console.log(Open.isOpen)

watch(
  () => Open.isOpen,
  async () => {
    console.log(Open.isOpen)
    const formdata = new FormData()
    formdata.append('question_id', props.issueId)
    const wordcount = await LXRwordcount(formdata)
    // console.log('字数' + wordcount.data)
    if (wordcount.code === '200') {
      count.value = wordcount.data
    } else {
      count.value = 0
    }
    const essayRes = await LXRessay(formdata)
    // console.log(essayRes.data)
    if (essayRes.code === '200') {
      editEssay.value = essayRes.data
      essay.value = essayRes.data
    } else {
      essay.value = '还未生成内容'
      editEssay.value = essay.value
    }
  }
)
const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'rgba(255, 255, 255, 1)'
  },
  issueId: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    required: false
  }
})

const openEdit = ref<boolean>(false)
const open = ref<boolean>(false)

const showEditModal = () => {
  openEdit.value = true
}
const showModal = () => {
  open.value = true
}
const editEssay = ref('')
const updateText = async (event: { target: { textContent: string } }) => {
  // 更新可编辑文本的内容
  editEssay.value = event.target.textContent
}

// const updateText = (event: Event) => {
//   // 确保 event.target 不为 null
//   if (event.target instanceof HTMLParagraphElement) {
//     // 更新可编辑文本的内容
//     editEssay.value = (event.target as HTMLParagraphElement).textContent;
//   }
// }
const handleEditOk = async (e: MouseEvent) => {
  const formdata = new FormData()
  formdata.append('question_id', props.issueId)
  formdata.append('essay', editEssay.value)
  const editRes = await LXRupdateessay(formdata)
  // console.log(editRes.data)
  essay.value = editRes.data
  openEdit.value = false
  // console.log(e)
}
const editCancle = async () => {
  // console.log(essay.value)
  editEssay.value = essay.value
  openEdit.value = false
}
const handleOk = (e: MouseEvent) => {
  // console.log(e)
  open.value = false
}
const emit = defineEmits(['closeDrawer'])
async function onClose() {
  //这里把props.issueId存起来结束话题的时候用
  localStorage.setItem('issueId', props.issueId) //给增加问题用
  localStorage.setItem('aidefid ', props.issueId) //给增加提示用
  //这里获得选择人物后的第一句提示
  const welcomeStore = aihint()
  welcomeStore.getWelcomeMessage(props.issueId).then(() => {
    const welcomeMessage = welcomeStore.welcom
    //console.log(welcomeMessage) 这里已经确认调用的提示是正确的也能语音播放
    //console.log(props.issueId) 这里已经确认是把人物的id传给了pinia
  })
  //这里获得选择人物后的第一句提问
  const questionStore = aidefine()
  questionStore.askquestion(props.issueId).then(() => {
    const questionanswer = questionStore.aianswer
    const questionanswerid = questionStore.answerid
    const questionanswerstate = questionStore.answerstate
    //console.log(questionanswer) ai问题正确
    //console.log(questionanswerid) ai问题id正确
    //console.log(questionanswerstate) ai问题状态正确
  })
  open.value = false
  emit('closeDrawer', open.value) // 发射一个自定义事件，告知父组件关闭抽屉
  if (props.issueId) {
    const formdata = new FormData()
    formdata.append('id', props.issueId)
    // console.log('查询问题的id：' + formdata.get('id'))
    //const question = await LXRselectissue(formdata)
    // console.log('询问问题：' + question.data.id)
    const qaId = ref()
    //qaId.value = question.data.id.toString()
    const formdata2 = new FormData()
    formdata2.append('welcome_id', qaId.value)
    //const welcomeRes = await LXRselectwelcome(formdata2)
    //console.log('问题是：' + welcomeRes.data)
    //const aiAnswer = AiIssue()
    //aiAnswer.issue = welcomeRes.data
  } else {
    console.error('props.issueId为空')
  }
}
const count = ref()
const essay = ref()
onMounted(async () => {
  const formdata = new FormData()
  formdata.append('question_id', props.issueId)
  const wordcount = await LXRwordcount(formdata)
  // console.log('字数' + wordcount.data)
  if (wordcount.code === '200') {
    count.value = wordcount.data
  } else {
    count.value = 0
  }
  const essayRes = await LXRessay(formdata)
  // console.log(essayRes.data)
  if (essayRes.code === '200') {
    editEssay.value = essayRes.data
    essay.value = essayRes.data
  } else {
    essay.value = '还未生成内容'
    editEssay.value = essay.value
  }
})
</script>
<style scoped>
/* @import url(''); */
:global(.ant-modal .ant-modal-title) {
  font-size: 30px !important;
}
:global(.ant-modal .ant-modal-close-x) {
  font-size: 30px !important;
}
:global(.ant-btn) {
  font-size: 30px;
  height: 56px;
  padding: 4px 15px;
  border-radius: 6px;
}
.card {
  width: 300px;
}
.card-content .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  bottom: 20px;
  left: 2px;
}
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
<style>
:deep .ant-modal-title {
  margin: 0;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 30px;
  line-height: 1.5;
  word-wrap: break-word;
}
:root {
  font-size: 30px;
}
.all-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>

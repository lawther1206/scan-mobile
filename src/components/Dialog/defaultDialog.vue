<template>
  <div>
    <Dialog title="默认对话框" @visible="handleClose" @confirm="handleConfirm">
      <el-input v-model="state.text" style="width: 100%"></el-input>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Dialog from './index.vue'

const state = reactive({
  text: ''
})

onMounted(() => {})

// 对话框的默认值
const show = ref(true)

const emits = defineEmits(['visible', 'confirm'])

const handleClose = () => {
  emits('visible')
}

const handleConfirm = () => {
  emits('confirm', state.text)
}
</script>

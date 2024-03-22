<template>
  <el-dialog
    v-model="show"
    :title="props.title"
    :width="props.width"
    :close-on-click-modal="false"
    :draggable="true"
    @close="closeDialogEnd()"
  >
    <el-input v-model="state.text"></el-input>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '对话框'
  },
  width: {
    type: String,
    default: '50%'
  }
})

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

const closeDialogEnd = () => {
  emits('visible')
}
</script>

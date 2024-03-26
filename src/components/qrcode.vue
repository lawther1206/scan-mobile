<template>
  <div class="qrcode">
    <div id="reader"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const cameraId = ref('')
const devicesInfo = ref('')
const html5QrCode = ref(null)

onMounted(() => {
  getCameras()
})

onUnmounted(() => {
  stop()
})

const emits = defineEmits(['getResult', 'setError'])

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      // 如果有2个摄像头，1为前置的
      if (devices && devices.length) {
        if (devices.length > 1) cameraId.value = devices[1].id
        else cameraId.value = devices[0].id
        devicesInfo.value = devices
        start()
      }
    })
    .catch((err) => {
      emits('setError', err)
    })
}

const start = () => {
  html5QrCode.value = new Html5Qrcode('reader')
  html5QrCode.value
    .start(
      cameraId.value,
      {
        fps: 15, // 设置每秒多少帧
        qrbox: { width: 300, height: 150 } // 设置取景范围
      },
      (decodedText, decodedResult) => {
        console.log('扫描的结果', decodedText, decodedResult)
        let params = {
          decodedText,
          decodedResult
        }
        emits('getResult', params)
        if (decodedText) stop()
      },
      (errorMessage) => {
        // 暂无扫描结果
        emits('setError', errorMessage)
      }
    )
    .catch((err) => {
      emits('setError', err)
    })
}

const stop = () => {
  html5QrCode.value
    .stop()
    .then((ignore) => {
      // 关闭
      emits('setError', ignore)
    })
    .catch((err) => {
      // 关闭
      emits('setError', err)
    })
}
defineExpose({ getCameras })
</script>

<style lang="scss" scoped>
.qrcode {
  position: relative;
  height: 100%;
  width: 100%;
  background: rgba($color: #000000, $alpha: 0.48);
}
#reader {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>

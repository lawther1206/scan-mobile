<template>
  <div class="page-box">
    <div class="qr-container">
      <div class="qr-box">
        <div id="reader"></div>
      </div>
    </div>
    <div class="result">{{ result }}</div>
    <div class="btn-box" v-if="iconFlag">
      <div @click="getCameras" class="scan-icon"><el-image :src="scanIcon"></el-image></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import scanIcon from '@/assets/scan.png'

const cameraId = ref('')
const devicesInfo = ref('')
const html5QrCode = ref(null)
const result = ref('')
// 控制图标的展示隐藏
const iconFlag = ref(true)

onMounted(() => {})

onUnmounted(() => {
  stop()
})

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      console.log('摄像头信息', devices)
      if (devices && devices.length) {
        // 如果有2个摄像头，1为前置的
        if (devices.length > 1) cameraId.value = devices[1].id
        else cameraId.value = devices[0].id
        devicesInfo.value = devices
        start()
      }
    })
    .catch((err) => {
      console.log('获取设备信息失败', err) // 获取设备信息失败
    })
}
const start = () => {
  html5QrCode.value = new Html5Qrcode('reader')
  console.log('html5QrCode', html5QrCode)
  iconFlag.value = false
  html5QrCode.value
    .start(
      cameraId.value,
      {
        fps: 20, // 设置每秒多少帧
        qrbox: { width: 250, height: 150 } // 设置取景范围
      },
      (decodedText, decodedResult) => {
        console.log('扫描的结果', decodedText, decodedResult)
        result.value = decodedText
        if (decodedText) {
          stop()
        }
      },
      (errorMessage) => {
        console.log('暂无扫描结果', errorMessage)
      }
    )
    .catch((err) => {
      console.log(`Unable to start scanning, error: ${err}`)
    })
}
const stop = () => {
  html5QrCode.value
    .stop()
    .then((ignore) => {
      iconFlag.value = true
      console.log('QR Code scanning stopped.', ignore)
    })
    .catch((err) => {
      iconFlag.value = true
      console.log('Unable to stop scanning.', err)
    })
}
</script>

<style scoped>
.page-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.qr-container {
  position: relative;
  width: 100%;
  height: 90%;
}
.qr-box {
  height: 100%;
}

#reader {
  top: 50%;
  left: 0;
}

.btn-box {
  padding: 12px;
  color: #fff;
  font-size: 28px;
  position: fixed;
  bottom: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.scan-icon {
  width: 45px;
  height: 45px;
}
</style>

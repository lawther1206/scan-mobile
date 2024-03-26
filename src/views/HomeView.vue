<template>
  <div class="scan">
    <QrScan ref="qrcode" @getResult="getResult" @setError="setError" />

    <el-card v-if="result && open" class="result">
      <div class="result-text">
        {{ result }}
      </div>
    </el-card>

    <el-card class="btn-tool" @click="clickQr" v-if="open">
      <div class="tool">
        <el-image class="icon-left" fit="fill" :src="scan" />
        <h2 class="custom-title">开始扫码</h2>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import QrScan from '@/components/qrcode.vue'
import { ElMessage } from 'element-plus'
import scan from '@/assets/scan.png'

const open = ref(true)
const result = ref('')

const qrcode = ref(null)

var browser = {
  // 判断浏览器内核
  versions: (function () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      weixin: u.indexOf('MicroMessenger') > -1 //是否微信 （2015-01-22新增）
    }
  })()
}

const clickQr = () => {
  // 点击签到时判断该浏览器内核，谷歌、苹果、火狐、微信可以打开
  if (browser.versions.webKit || browser.versions.weixin || browser.versions.gecko) {
    qrcode.value?.getCameras()
    open.value = false
  } else {
    ElMessage('该浏览器不支持，请打开主流浏览器：谷歌、火狐，或微信内打开')
  }
}

const getResult = (res) => {
  result.value = res
  open.value = true
}

const setError = (e) => {}
</script>
<style lang="scss" scoped>
.scan {
  height: 100vh;
}
.btn-tool {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  .tool {
    display: flex;
    align-items: center;
    .icon-left {
      width: 35px;
      margin-right: 10px;
    }
    .custom-title {
      line-height: 35px;
    }
  }
}
.result {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  .result-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
    max-width: 500px;
    min-height: 300px;
  }
}
</style>

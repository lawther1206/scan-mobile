import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'
// import Dialog from '@/components/Dialog/index.vue'
import { showDialog } from '@/utils/showDialog'

const app = createApp(App)

// 注册全局组件
// app.component('my-dialog', Dialog)

app.use(ElementPlus).use(createPinia()).use(router).mount('#app')

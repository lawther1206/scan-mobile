import { h, createApp, defineAsyncComponent } from 'vue'
import type { App } from 'vue'
import ElementPlus from 'element-plus'

export function showDialog(url: string, options: any) {
  const GlobalDialog = defineAsyncComponent(() => import(url))
  return new Promise((resolve, reject) => {
    // 每次创建之前把之前的销毁
    let flag = document.getElementById('myDialogId')
    if (flag) flag.remove()
    // 创建节点
    const mountNode = document.createElement('div')
    mountNode.setAttribute('id', 'myDialogId')
    // 将节点插入到body内
    document.body.appendChild(mountNode)
    // 创建vue实例
    const app: App<Element> = createApp({
      render() {
        return h(GlobalDialog, {
          // 配置项
          ...options,
          // 事件
          onConfirm: (data: any) => {
            resolve(data)
            mountNode.remove()
          },
          onVisible: () => {
            mountNode.remove()
            reject()
          }
        })
      }
    })
    // 由于内部使用了el-dialog所以必须挂载否则解析错误
    app.use(ElementPlus)
    // 挂载节点
    app.mount(mountNode)
  })
}

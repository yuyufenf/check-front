import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
//导入element-plus相关资源
import ElementPlus from 'element-plus' //全组件库
import 'element-plus/dist/index.css' //组件库css样式
import * as ElementPlusIconVue from '@element-plus/icons-vue' //导入组件库图标
import zhCN from 'element-plus/dist/locale/zh-cn.mjs' //导入组件库中文语言包
//导入pinia持久化相关资源
import { createPinia } from 'pinia' //导入pinia方法
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //导入存储插件
const pinia = createPinia() //创建实例
pinia.use(piniaPluginPersistedstate)//将插件添加到势力


//注册起始页
// createApp(App).use(router).mount('#app')
const app = createApp(App)
//注入路由，pinia和element
app.use(router).use(pinia).use(ElementPlus, {
    locale: zhCN,
})
//注入element图标
for (const [name, component] of Object.entries(ElementPlusIconVue)) {
    app.component(name, component);
}
//手动挂载到id为app的dom
app.mount('#app')
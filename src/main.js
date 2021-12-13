import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入css
import './assets/Css/global.css'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

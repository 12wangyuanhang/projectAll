import { createApp, render } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import vueRouter from './router/index'
import dialog from './components/dialog/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import CityData from './utils/index'
import pinia from './store'
import Particles from "particles.vue3";
import dialogDrag from './utils/tools/dialog-drag'
import imgPreview from './components/img-preview'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// console.log(dialogDrag)
app.directive('dialogDrag', dialogDrag);

app.use(pinia).use(dialog).use(imgPreview).use(CityData).use(Particles).use(vueRouter).use(ElementPlus,{
    size: 'small'
}).mount('#app')

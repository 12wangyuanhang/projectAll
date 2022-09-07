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
import waves from './utils/tools/waves'
import imgPreview from './components/img-preview'
// import DataVVue3 from '@kjgl77/datav-vue3'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'animate.css';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// console.log(dialogDrag)
app.directive('dialogDrag', dialogDrag);
app.directive('waves', waves);

app.use(pinia).use(dialog).use(imgPreview).use(CityData).use(Particles).use(vueRouter).use(ElementPlus,{
    size: 'default'
}).mount('#app')

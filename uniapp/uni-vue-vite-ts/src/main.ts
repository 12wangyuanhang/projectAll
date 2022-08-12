import { createSSRApp } from "vue";
import App from "./App.vue";
import router from './router/index'
import Vant,{ NavBar } from 'vant';
import 'vant/lib/index.css';
export function createApp() {
  const app = createSSRApp(App);
  app.use(router);
  app.use(Vant);
  return {
    app,
  };
}

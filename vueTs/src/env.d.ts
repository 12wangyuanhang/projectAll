/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@authing/vue-ui-components';

declare module "particles.vue3";

declare module 'sortablejs';

declare module 'three/examples/jsm/libs/tween.module.min.js'

declare module '@/components/img-preview/bem'
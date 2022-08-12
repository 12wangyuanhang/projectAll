import { createVNode, render, h } from 'vue';
import type {App} from 'vue';
import Dialog from './Dialog.vue';
function createDialog(opt:any,app:App){
    return new Promise((resolve, reject) => {
        const appBox:HTMLElement | null = document.getElementById('app')
        opt.callback = (data:any) => {
            resolve({
                data
            })
        }
        opt.show = true;
        let container = document.createElement('div')
        const vm = createVNode(Dialog,opt)
        vm.appContext = app._context;
        // app.directive('dialogDrag', {
        //     mounted(el){
        //         console.log(el, '1234')
        //     }
        // });
        render(vm, container);
        document.body.appendChild(container);
    })
}

export default (app:App) => {
    app.config.globalProperties.$dialog = (opt:any) => createDialog(opt, app);
}
import { render, createVNode } from 'vue';
import type { App, VNode } from 'vue';
import Main from './index.vue';

const getImgPreview = (datas = [], index = 0, ops = {}, app:App) => {
    let div = document.createElement('div');
    let options = {
        datas,
        index:index,
        isOnlyShow:true,
        ops: Object.assign({
            closeOnClickModal: false,
            beforeClose: null,
            click: null,
            modal: true,
        }, ops)
    };
    let vm:VNode = createVNode(Main, options);;
    vm.appContext = app._context;
    render(vm, div);
    document.body.appendChild(div);
    // console.log(vm)
}

export default (app:App) =>{
    app.config.globalProperties.$ImagePreview = (datas = [], index = 0, ops = {}) => getImgPreview(datas, index, ops, app)
}
import { render, createVNode, getCurrentInstance, ref } from 'vue';
import type { App, Ref } from 'vue';
import template from './test2.vue';
// import { messageTypes } from '../../types/message';
// console.log(messageTypes)
const messageTypes = ['success', 'info', 'warning', 'error'] as const;
import { proviteTools } from '../../utils'
let ids:string[] = [];
const tools = proviteTools();
let num = 1;
let shows:Ref[] = [];
let duration = 3000;
const myMessage:any = (attr:any) => {
    const div = document.createElement('div');
    const id = 'message_' + num++;
    const obj:any = {
        id,
        ids:ids,
        type:'info',
        num:num,
        duration,
    };
    // console.log(obj,34656)
    if(tools.checkType(attr) == 'string'){
        Object.assign(obj, {
            message: attr,
            type: 'info'
        })
    } else {
        Object.assign(obj, attr)
    }
    if(obj.duration !== undefined && obj.duration !== null)duration = obj.duration
    obj.show = ref(true);
    let vNode = createVNode(template, obj);
    render(vNode, div);
    document.body.appendChild(div);
    shows.push(obj.show)
    ids.push(id)
    // console.log(duration,456)
    
    return {
        close:()=>{
            // obj.show = false;
            obj.show.value = false;
            ids.splice(num-1, 1)
            console.log(obj.show.value)
        },
        closeAll:()=>{
            shows.forEach((item)=>{
                item.value = false;
            })
            // num = 1;
        }
    }
}

messageTypes.forEach((type) => {
    myMessage[type] = (str:string) => {
        myMessage({
            type: type,
            message: str
        })
    }
})

export default myMessage
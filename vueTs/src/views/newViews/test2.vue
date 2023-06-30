<script lang="tsx">
    import { defineComponent, h, resolveComponent, computed, ref, onMounted, nextTick, watch } from 'vue';
    import type { VNode, Component } from 'vue';
    import { WarningFilled, InfoFilled, CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue';
    import * as iconAll from '@element-plus/icons-vue';
    import { ElIcon } from 'element-plus'
    import { definePropType } from '../../types/message'
    import { proviteTools } from '../../utils'
    export default defineComponent({
        props:{
            message: {
                type: [String, Function],
            },
            icon: {
                type: String as any,
            },
            type: {
                type: String,
                default: () => 'info'
            },
            show: {
                type: Object,
                default: () => true,
            },
            id: {
                type: String,
                default: ()=>'message_1',
            },
            ids: {
                type: Array as any,
            },
            duration: {
                type: Number,
                default:() => 3000
            },
            num: {
                type: Number,
            }
        },
        components: {
            ...iconAll,
            ElIcon
        },
        setup(props){
            const tools = proviteTools();
            const messageFlag = ref(true);
            const { type, icon, show, id, ids, message, duration, num } = props
            const _messageDefaultIcon:any = {
                success: 'CircleCheckFilled',
                warning: 'WarningFilled',
                error: 'CircleCloseFilled',
                info: 'InfoFilled',
            }
            const setIcon = () => {
                let iconName = '';
                if(icon&&tools.checkType(icon) == 'function'){
                    return icon()
                } else if (icon&&tools.checkType(icon) == 'string') {
                    iconName = icon
                } else {
                    iconName = _messageDefaultIcon[type]
                }
                return <el-icon>{h(resolveComponent(iconName))}</el-icon>
            }
            const lastTop = ref(20)
            if(ids.length){
                const lastMessage = document.getElementById(ids[ids.length-1])
                lastTop.value = lastMessage!.offsetHeight + lastMessage!.offsetTop + 20
            }
            nextTick(()=>{
                const element:any = document.querySelector('.'+id);
                let num2 = 1;
                element.addEventListener('animationend', () => {
                    if(num2 == 2){
                        console.log(num2, 'num2')
                        messageFlag.value = false
                    }
                    num2++
                })
            })
            if(duration !== 0){
                let timer:any = setTimeout(()=>{
                    // obj.show = false
                    show.value = false;
                    ids.splice(num!-1, 1)
                    clearTimeout(timer)
                    timer = null;
                }, duration)
            }
            // watch(()=>show.value,(val)=>{
            //     messageFlag.value = false
            // },{
            //     deep:true
            // })
            const resultMessageDom = (type?:string) => {
                return (
                    <div class={'message_' + type}>
                        {setIcon()}
                        <div class="content">{message}</div>
                    </div>
                )
                if(type == 'success'){
                    return (
                        <div class="message_success">
                            <el-icon><CircleCheckFilled /></el-icon>
                            <div class="content">这是message success</div>
                        </div>
                    )
                } else if (type == 'warning') {
                    return (
                        <div class="message_warning">
                            <el-icon><WarningFilled /></el-icon>
                            <div class="content">这是message success</div>
                        </div>
                    )
                } else if (type == 'error') {
                    return (
                        <div class="message_error">
                            <el-icon><CircleCloseFilled /></el-icon>
                            <div class="content">这是message success</div>
                        </div>
                    )
                } else {
                    return (
                        <div class="message_info">
                            <el-icon><InfoFilled /></el-icon>
                            <div class="content">这是message success</div>
                        </div>
                    )
                }
            }

            return ()=> (
                <>
                    {
                        messageFlag.value?(<div style={{top: lastTop.value + 'px'}} id={id} class="pos_fixed">
                            <div class={[id,'animate__animated', show.value?'animate__backInDown':'animate__backOutUp']}>
                                {
                                    resultMessageDom(type)
                                }
                            </div>
                        </div>):null
                    }
                </>
            )
        }
    })
</script>

<style lang="scss" scoped>
    .pos_fixed {
        width: fit-content;
        max-width: 45%;
        position: fixed;
        border-color: #e1f3d8;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .content {
            padding: 0 10px;
        }
    }
    .message_success {
        background-color: #f0f9eb;
        padding: 15px 19px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 5px;
        color: #67c23a;
    }
    .message_warning {
        background-color: #fdf6ec;
        padding: 15px 19px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 5px;
        color: #e6a23c;
    }
    .message_error {
        background-color: #fef0f0;
        padding: 15px 19px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 5px;
        color: #f56c6c;
    }
    .message_info {
        background-color: #f4f4f5;
        padding: 15px 19px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 5px;
        color: #909399;
    }
</style>
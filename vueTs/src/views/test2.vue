<template>
    <div>
        <el-config-provider :locale="locale2">
        <el-color-picker :model-value="''" style="vertical-align: middle" />
        </el-config-provider>
        <!-- <div>
            <Test3 :name="name" />
        </div>         -->
        <img style="width:200px" @click="openPreview(0)" src="https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg" alt="">
        <h2>{{config.layout.name}}</h2>
        <div class="befferBox"></div>
        <el-button @click="getRef()">3333</el-button>
        <el-button @click="getTable">table</el-button>
        <el-icon>
            <!-- <Timer /> -->
            <component :is="'Timer'"></component>
        </el-icon>
        <div class="box">
            <div>12344</div>
            <div>1234</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <!-- <HelloWorld :ref="helloWorld" class="abc"/> -->
    <!-- <CheckDark /> -->
    <!-- <Test1 /> -->
    <!-- <el-input  v-model="name"/> -->
    <!-- <el-input  v-model="input1"/> -->
    <!-- <div ref="iconBox" :style="{width:'30px',height:'30px',}"></div> -->
    <!-- <el-input v-model="input1" ref="iconBox"></el-input> -->
    <!-- <decoration-1 :color="['pink','yellow']" style="width:200px;height:50px;" /> -->
    
</template>

<script lang="tsx">
    import HelloWorld from "../components/HelloWorld.vue";
    import CheckDark from "../components/checkDark.vue";
    import Test1 from "../components/test1.vue";
    import Test3 from "./test3.vue";
    import Test4 from "./test4.vue";
    import Table from "./table.vue";
    import { ref,resolveComponent,h,Ref, render, getCurrentInstance } from 'vue';
    import { Aim } from '@element-plus/icons-vue';
    import CD from '../utils/pkgManage/index'
    import { useConfig } from '../store/config'
    // import { Decoration1, Decoration2 } from '@kjgl77/datav-vue3'
    // import utils from '../utils'
    export default {
        components:{
            HelloWorld,
            CheckDark,
            Test1,
            Aim,
            Test4,
            Table,
            // Decoration1
        },
        setup(){
            



            // console.log(utils())
            const obj = ref({
                placeholder:"Please input", 
                clearable:true
            })
            const config = useConfig();
            // console.log(config.layout)
            const helloWorld = ref(null)
            const { proxy }:any = getCurrentInstance();
            console.log(proxy.$resultCityData('QHD'))
            const iconBox = ref<any>(null);
            let datas = [
                { thumbUrl: `https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg`, url: `https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg` },
            ]
            const openPreview = (index = 0) => {
                proxy.$ImagePreview(datas, index, {
                    closeOnClickModal: true,
                    click:(data:any, index:any)=>{
                        proxy.$message.success('点击事件'+index)
                    },
                    beforeClose:()=>{
                        proxy.$message.success('关闭回调')
                    }
                });
            }
            // const setCompnent = () => {
            //     return (<el-icon>{h(resolveComponent('AddLocation'))}</el-icon>)
            // }
            // const div = document.createElement('div')
            // render(setCompnent(),div)
            const locale1 = ref({
                name: 'zh-cn',
                el: {
                    colorpicker: {
                        confirm: '确定',
                        clear: '清空',
                    },
                },
            })
            const locale2 = ref({
                name: 'en',
                el: {
                    colorpicker: {
                        confirm: 'Confirm',
                        clear: 'Clear',
                    },
                },
            })
            const getRef = async () => {
                // iconBox.value.ref.type = 'password'
                // const temp = locale1.value
                // locale1.value = locale2.value
                // locale2.value = temp
                // console.log(locale1.value)
                // console.log(locale2.value)
                let sd = new CD();
                console.log(sd.getData(), 4313);
                const action = await proxy.$dialog({
                    component:Test4,
                    dialogDrag:true,
                    props:{
                        abc:123,
                    }
                })
                console.log(action)
            }
            const getTable = async () => {
                const action = await proxy.$dialog({
                    component:Table,
                    width:'800px',
                    props:{
                        abc:123,
                    }
                })
            }
            const name = ref('')
            const input1 = ref('')
            return {
                config,
                name,
                input1,
                iconBox,
                getRef,
                locale2,
                locale1,
                helloWorld,
                getTable,
                openPreview,
            }
        }
    }
</script>

<style lang="scss" scoped>
.befferBox {
    width: 50px;
    height: 50px;
    &::before {
        content:'';
        width: 10px;
        height: 10px;
        display: inline-block;
        background-color: blue;
    }
}
.box {
    display: flex;
    height: 500px;
    flex-wrap: wrap;
    justify-content: flex-start;
    z-index: 1;
    // background-color: blue;
    
    >div {
        flex: 0 1 18%;
        // border: 1px solid blue;
        // box-shadow: 0px 0px 10px 5px blue;
        margin: 10px;
        position: relative;
        justify-content: center;
        &::after {
            content: '';
            position: absolute;
            top: 0;
            background-color: #999;
            left: 0;
            right: 0;
            bottom: 0;
            // background-color: #fff;
            opacity: 0.1;
            z-index: -1;
            filter: blur(3px);
        }
    }
}
</style>
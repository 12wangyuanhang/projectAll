<template>
    <div id="box-card">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>Card name</span>
                    <el-button class="button" text>Operation button</el-button>
                </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
    </div>
    <div class="1234">

    </div>
    <el-button size="large" @click="Printpart('box-card')">打印</el-button>
    <el-button @click="startRecord" v-if="!flag" type="primary">开始录制</el-button>
    <el-button type="danger" @click="stopRecord" v-else>停止录制</el-button>
    <record-video background="https://avuejs.com/images/face.png"  @data-change="dataChange" ref="videoRef"/>
</template>

<script lang="tsx" setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import type { Ref } from 'vue';
import recordVideo from '@/components/video/index.vue';
import { nextTick } from 'process';
const videoRef:any = ref(null);
const flag = ref(false);
const { proxy }:any = getCurrentInstance();
function Printpart(id_str:any):void//id-str 内容中的id
{
    var el:HTMLElement|null = document.getElementById(id_str);
    let styleArr:Array<any> = [];
    Object.assign(styleArr, document.getElementsByTagName('style'));
    
    var iframe:any = document.createElement('IFRAME');
    var doc:any = null;
    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
    
    document.body.appendChild(iframe);
    doc = iframe.contentWindow.document;
    for(let i = 0;i<styleArr.length;i++){
        const style = document.createElement('style');
        style.innerHTML = styleArr[i].innerHTML;
        doc.getElementsByTagName('head')[0].appendChild(style);
    }
    let div = document.createElement('div');
    div.innerHTML = el?.innerHTML + ''
    doc.body.appendChild(div)
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
}

function startRecord() {
    flag.value = true;
    proxy.$message.success('开始录制')
    videoRef.value.startRecord();
}
function stopRecord() {
    flag.value = false;
    proxy.$message.success('请看控制台视频文件的base64')
    videoRef.value.stopRecord();
}
function dataChange(data:any) {
    console.log(data);
}
onMounted(()=>{
    console.log(videoRef.value,1234)
})
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}
</style>
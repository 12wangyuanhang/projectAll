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
</template>

<script lang="tsx" setup>
import {} from 'vue';

function Printpart(id_str:any):void//id-str 内容中的id
{
    var el:HTMLElement|null = document.getElementById(id_str);
    let styleArr:Array<any> = [];
    Object.assign(styleArr, document.getElementsByTagName('style'));
    
    var iframe:any = document.createElement('IFRAME');
    var doc = null;
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
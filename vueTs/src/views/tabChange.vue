<template>
    <div>
        <!-- <div class="title-list">
            <div @click="changeTab(index)" v-for="(item,index) in tabList" :key="index">
                {{item.title}}
            </div>
        </div>
        <div class="sub-list" v-for="(item,index) in tabList" :key="index">
            <div v-if="flag == index">
                <div v-for="jtem in item.list" :key="jtem.name">{{jtem.name}}</div>
            </div>
        </div> -->
        <div id="divBox"  class="box">

        </div>
        <div id="divBoxTwo" class="boxTwo">

        </div>
    </div>
</template>

<script lang="tsx" setup>
    import { onMounted, ref, nextTick } from 'vue';
    import test3 from '@/views/test3.vue';
    import type { Ref } from 'vue';
    import useElementSize from '@/utils/tools/useElementSize';
    console.log(test3);
    const flag = ref(0) as Ref<number>;
    const tabList = ref([
        {
            title: '苹果',
            list: [
                {
                    name: 'qwe'
                },{
                    name: 'rty'
                }
            ]
        },{
            title: 'HUAWEI',
            list: [
                {
                    name: '234'
                },{
                    name: '345'
                }
            ]
        },{
            title: 'IQOO',
            list: [
                {
                    name:'asd'
                },{
                    name:'ghj'
                }
            ]
        },
    ])
    nextTick(()=>{
        useElementSize('divBox')
        useElementSize('divBoxTwo')
    })
    onMounted(()=>{

    })
    const changeTab = (val:number) => {
        flag.value = val;
    }
    // const save = (index, record) => {
    //     if(editableData.[index].name.length> 6){
    //         ELMessage.error('名字长度不能大于6')
    //         return
    //     }
    //     // TODO
    // }
</script>

<style lang="scss" scoped>

.box {
    background-color: blue;
    width: 300px;
    height: 300px;
    margin: 100px;
}
.boxTwo {
    background-color: red;
    width: 300px;
    height: 300px;
    margin: 100px;
}
.title-list {
    display: flex;
    background-color: #f6f6f6;
    height: 60px;
    justify-content: space-around;
}
.sub-list {
    width: 100%;
    >div {
        display: flex;
        height: 50px;
        justify-content: space-evenly;
        background-color: aqua;
    }
}
</style>
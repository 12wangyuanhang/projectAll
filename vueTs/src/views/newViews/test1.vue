<template>
    <h1>123</h1>
</template>

<script setup lang="tsx">
import {} from 'vue';
let pathList = [
    '/a/b',
    '/a/2/c',
    '/d/c'
]

const handleObj = (pathList:any) => {
    const answer:any = {};
    let i = 0;
    let key = '';
    while(i<pathList.length){
        console.log(pathList[i])
        let newArr = pathList[i].split('/');
        newArr.shift();
        let temp = answer;
        newArr.forEach((s:any)=>{
            temp[s]
            // if(!temp[s]) temp[s] = {};
            // temp = temp[s];
        })
        i++
    }
    console.log(answer)
}
handleObj(pathList)

let a = {
    'a':{
        '2':{
            "c":{},
        },
        "b":{}
    },
    "d":{}
}
</script>

<style>

</style>
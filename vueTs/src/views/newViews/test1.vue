<template>
    <h1>123</h1>
    <el-input ></el-input>
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
        // console.log(pathList[i])
        let newArr = pathList[i].split('/');
        newArr.shift();
        let temp = answer;
        newArr.forEach((s:any)=>{
            if(!temp[s]) temp[s] = {};
            temp = temp[s];
        })
        i++
    }
    // console.log(answer)
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




let arr2 = [
    {
        "name": "1332",
        "key": "q",
        "span": 6
    },
    {
        "name": "1332",
        "key": "z",
        "span": 6
    },
    {
        "name": "1332",
        "key": "x",
        "span": 6
    },
    {
        "name": "1332",
        "key": "g",
        "span": 12
    },
    {
        "name": "1332",
        "key": "c",
        "span": 12
    },
    {
        "name": "1332",
        "key": "x",
        "span": 12
    }
]
const getNewArr = (arr:any) => {
    let newArr:any = []
    let u = 0;
    function handleArr(arr:any, u:number) {
        console.log(112, u)
        let num = 0;
        let lenArr = []
        for(let i = u; i<arr.length;i++){
            if(num != 24 && num < 24){
                num += parseInt(arr[i].span);
                lenArr.push(i)
                if(num == 24){
                    let s = []
                    for(let j=0;j<lenArr.length;j++){
                        s.push(arr.splice(lenArr[i],1))
                    }
                    newArr.push(s);
                    u = 0
                    handleArr(arr, i);
                    return
                }
            } else {
                u = i;
                handleArr(arr, u)
                return
            }
        }
        console.log(num, arr, 1234)
    }
    handleArr(arr, u)
    return newArr
}
console.log(getNewArr(arr2))
</script>

<style>

</style>
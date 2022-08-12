<template>
  <div>
    <h1>12345555</h1>
    <el-button @click="doCancel">1234</el-button>
    <ElTooltip :content="'去一边去'">
        <span>
            <el-icon>
                <Timer />
            </el-icon>
            {{'去一边去'}}
        </span>
    </ElTooltip>
  </div>
</template>

<script lang="tsx">
import { onMounted } from 'vue';
import { useConfig } from '../store/config'
    enum TestArr {
        'userInfo' = '1234',
        'password' = '4567',
        'name' = '2',
        'age' = "3",
    }
    export default {
        props:{
            props:{
                type: Object
            }
        },
        setup(props:any,{ emit }:any){
            const config = useConfig();
            console.log(config, 'config');
            config.changeName('李四')
            // console.log(props.props)
            const doCancel = () => {
                emit('doCancel', {abc: 123})
            }
            onMounted(()=>{
                console.log(TestArr)
            })
            return {
                doCancel,
                config
            }
        }
    }
</script>

<style>

</style>
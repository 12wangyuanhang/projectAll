<template>
    <div class="loginBox">
        <Guard :appId="appId" :config="config" @login="onLogin"></Guard>
    </div>
</template>

<script lang="ts">
import { Guard } from "@authing/vue-ui-components";

// 引入 CSS 样式
import "@authing/vue-ui-components/lib/index.min.css";

export default {
    components: {
        Guard,
    },
    data: () => ({
        // 替换你的 AppId
        appId: "62b04be21d3b807b833129d7",
        config: {
            isSSO: true,
        },
    }),
    watch:{
        "$route.path":{
            handler(val:any, oldVal:any){
                console.log(val, oldVal);
            },
            deep:true,
            immediate: true
        }
    },
    methods: {
        onLogin(userInfo: any) {
            console.log(userInfo);
        },
    },
};
</script>
<style lang="scss" scoped>
.loginBox {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <div
        v-loading="loading"
        v-if="loading"
        element-loading-text="Loading..."
        element-loading-background="rgba(0, 0, 0, 0.5)"
        class="dialogBox"
    ></div>
    <div
        v-dialogDrag="dialogDrag"
    >
        <el-dialog
            v-if="open"
            :top="top"
            :title="title"
            v-model="open"
            :show-close="true"
            :width="width"
            :close-on-click-modal="false"
            :before-close="hanldeClose"
        >
        <component
            :is="component"
            @doCancel="doCancel"
            :props="props"
        ></component>
    </el-dialog>
    </div>
</template>


<script lang="tsx">
import { ref, reactive } from "vue";
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        dialogDrag: {
            type: Boolean,
            default: false,
            require:true,
        },
        title: {
            type: String,
            default: () => "弹窗",
        },
        width: {
            type: String,
            default: "500px",
        },
        component: {
            type: Object,
        },
        props: {
            type: Object,
        },
        top: {
            type: String,
            default: () => "15vh",
        },
        callback: {
            type: Function,
        },
    },
    setup(props: any, emit: any) {
        const hanldeClose = (done: any) => {
            done();
        };
        const loading = ref(false);
        // (() => {
        //     loading.value = true;
        //     setTimeout(() => {
        //         loading.value = false;
        //     }, 2000);
        // })();
        const open = ref(props.show);
        const doCancel = (data: any) => {
            open.value = false;
            props.callback(data);
        };
        return {
            hanldeClose,
            doCancel,
            open,
            loading,
        };
    },
};
</script>

<style lang="scss" scoped>
.dialogBox {
    width: 100%;
    height: 100%;
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 999999;
    // .el-dialog__body {
    //     padding: 0;
    // }

    // .el-loading-mask {
    //     z-index: 9999;
    // }
}

</style>
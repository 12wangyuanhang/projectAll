<template>
    <!-- <div class="dark"> -->
        <el-header>
            <el-button @click="openDreawer" type="primary">Primary</el-button>
        </el-header>
        <el-drawer v-model="drawer2" :direction="direction">
            <template #header>
                <h4>Special Effect Select</h4>
            </template>
            <template #default>
                <div>
                    <el-radio-group v-model="radio" @change="radioChange">
                        <el-radio :label="3">爱心</el-radio>
                        <el-radio :label="6">波纹</el-radio>
                        <el-radio :label="9">星星拖尾</el-radio>
                        <el-radio :label="0">关闭特效</el-radio>
                    </el-radio-group>
                </div>
            </template>
            <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">cancel</el-button>
                <el-button type="primary" @click="confirmClick">confirm</el-button>
            </div>
            </template>
        </el-drawer>
        <router-view></router-view>
    <!-- </div> -->
</template>


<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { getLoveSpecial, cancelSpecial, getFireworks, getFairyDustCursor } from './utils/tools/special'
import Test from './utils/tools/test'
import { ElMessageBox } from 'element-plus';
import CD from './utils/pkgManage/index'
const direction = ref('ltr')
const drawer2 = ref(false);
const radio = ref()
const specialEffectObj = {
    '3': getLoveSpecial,
    '6': getFireworks,
    '9': getFairyDustCursor,
    '0': cancelSpecial
}
const openDreawer = () => {
    drawer2.value = true;
}
const radioChange = (val) => {
    // let sd = new CD();
    // console.log(sd.getData(), 4313);
    console.log()
    // Test.getLoveSpecial()
    nextTick(()=>{
        specialEffectObj[val]()
    })
    // console.log(val)
}
function cancelClick() {
  drawer2.value = false
}
function confirmClick() {
    drawer2.value = false

}
</script>


<style lang="scss">
#app {
    height: 100%;
    width: 100%;
}

.waves-ripple {
    position: absolute;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    pointer-events: none;
    user-select: none;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    opacity: 1;
}

.waves-ripple.z-active {
    opacity: 0;
    -webkit-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    transition: opacity 1.2s ease-out, transform 0.6s ease-out;
}
* {
    margin: 0;
    padding: 0;
}

html,body {
    height: 100%;
    width: 100%;
}
</style>

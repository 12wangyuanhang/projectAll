<template>
    <div class="avue-video" :style="styleName">
        <div :class="b('border')">
            <span :style="borderStyleName"></span>
            <span :style="borderStyleName"></span>
            <span :style="borderStyleName"></span>
            <span :style="borderStyleName"></span>
        </div>
        <img :style="imgStyleName" :class="b('img')" :src="background" />
        <video :class="b('main')" ref="main" autoplay muted></video>
    </div>
</template>

<script lang="tsx" setup>
import { ref, computed, defineProps, onMounted, Ref, defineEmits, defineExpose } from 'vue';
import RecordVideo from './video';

const emit = defineEmits(['data-change']);

const videoObj:any = ref(null);

const main:Ref = ref(null);

const props = defineProps({
    background: {
        type: String
    },
    width: {
        type: [Number, String],
        default: 500
    }
})
const setPx = (size:number|string) => {
    return size + 'px';
}
const b = (cls:string) => {
    return 'avue-video__' + cls;
}
// computed
const styleName = computed(()=>{
    return {
        width: setPx(props.width)
    }
})
const imgStyleName = computed(()=>{
    return {
        width: setPx(Number(props.width) / 2)
    }
})

const borderStyleName = computed(()=>{
    return {
        width: setPx(Number(props.width) / 15),
        height: setPx(Number(props.width) / 15),
        borderWidth: setPx(5)
    }
})

// methods
function init () {
    videoObj.value = new RecordVideo(main.value);
    console.log(videoObj.value, '123')
    const videoPromise = videoObj.value.init();
    console.log(videoPromise)
    videoPromise
    .then(() => {
        videoObj.value.mediaRecorder.addEventListener('stop', getData, false);
    })
}
function startRecord () {
    videoObj.value.startRecord()
}
function stopRecord () {
    videoObj.value.stopRecord();
}
function getData () {
    const blob = new Blob(videoObj.value.chunks, {
        type: 'video/mp4'
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.addEventListener('loadend', () => {
    var video_base64 = reader.result;
        emit('data-change', video_base64)
    });
}
onMounted(()=>{
    init()
})
defineExpose({
    startRecord,
    stopRecord
})
</script>

<style lang="scss">
.avue-video {
    width: 500px;
    position: relative;
    overflow: hidden;
    .avue-video__border {

    }
    .theme-default-content:not(.custom) img {
        max-width: 100%;
    }
    .avue-video__img {
        width: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .avue-video__main {
        width: 100%;
    }
    .avue-video__border span:first-child {
        left: 15px;
        top: 15px;
        border-right: 0;
        border-bottom: 0;
    }
    .avue-video__border span:nth-child(2) {
        right: 15px;
        top: 15px;
        border-left: 0;
        border-bottom: 0;
    }
    .avue-video__border span {
        position: absolute;
        width: 30px;
        height: 30px;
        border-width: 4px;
        color: #0073eb;
        border-style: solid;
    }
    .avue-video__border span:nth-child(3) {
        bottom: 15px;
        left: 15px;
        border-right: 0;
        border-top: 0;
    }
    .avue-video__border span:nth-child(4) {
        bottom: 15px;
        right: 15px;
        border-left: 0;
        border-top: 0;
    }
}
</style>
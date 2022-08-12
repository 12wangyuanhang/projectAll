<template>
    <div class="image-preview" v-if="isShow">
        <div class="image-preview_mask" v-if="ops.modal" @click="close"></div>
        <span
            class="el-image-viewer__btn el-image-viewer__close"
            @click="close"
        >
            <el-icon><CircleClose /></el-icon>
        </span>
        <span
            class="el-image-viewer__btn el-image-viewer__prev"
            @click="handlePrev()"
            v-if="isRrrow"
        >
            <el-icon><ArrowLeft /></el-icon>
        </span>
        <span
            class="el-image-viewer__btn el-image-viewer__next"
            @click="handleNext()"
            v-if="isRrrow"
        >
            <el-icon><ArrowRight /></el-icon>
        </span>
        <div class="image-preview__box" ref="box">
            <el-carousel
                ref="carousel"
                :show-indicators="false"
                :initial-index="index"
                :interval="0"
                arrow="never"
                @change="handleChange"
                indicator-position="none"
                :style="{'height':'100%',width:'90%'}"
            >
                <el-carousel-item
                    @click.self="ops.closeOnClickModal ? close() : ''"
                    v-for="(item, indexs) in datas"
                    :key="indexs"
                >
                    <component
                        @click="handleClick(item, indexs)"
                        :id="'avue-image-preview__' + indexs"
                        :src="item.url"
                        :style="[styleName, styleBoxName]"
                        ref="item"
                        @mousedown="move"
                        controls="controls"
                        :is="getIsVideo(item)"
                        v-if="getIsVideo(item)"
                        ondragstart="return false"
                    ></component>
                    <div
                        v-else
                        @click="handleClick(item, indexs, true)"
                        :id="'avue-image-preview__' + indexs"
                        class="image-preview__file"
                    >
                        <span>
                            <i class="el-icon-document"></i>
                            <p>{{ item.name }}</p>
                        </span>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="el-image-viewer__btn el-image-viewer__actions">
            <div class="el-image-viewer__actions__inner">
                <el-icon @click="subScale"><ZoomOut /></el-icon>
                <el-icon @click="addScale"><ZoomIn /></el-icon>
                <i class="el-image-viewer__actions__divider"></i>
                <i class="el-image-viewer__actions__divider"></i>
                <i class="el-image-viewer__actions__divider"></i>
                <el-icon @click="rotate = rotate - 90"><RefreshLeft /></el-icon>
                <el-icon @click="rotate = rotate + 90"><RefreshRight /></el-icon>
            </div>
        </div>
    </div>
</template>
<script lang="tsx" setup>
import create from "./tool";
import { reactive, ref, defineProps, computed, toRaw } from 'vue';
import type{Ref} from 'vue'
interface datasItem {
    thumbUrl:string,
    url:string,
    type?:string
}

const typeList = {
    img: /\.(gif|jpg|jpeg|png|webp|GIF|JPG|PNG)/,
    video: /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/
};
const props = defineProps(['datas', 'index', 'ops', 'isOnlyShow']);

const left = ref(0);
const top = ref(0);
const scale = ref(1);
const rotate = ref(0);
const isShow = ref(props.isOnlyShow);
const isFile = ref(false);
const carousel = ref<Ref|null>(null);
const item = ref<Ref|null>(null);



const index = ref(toRaw(props.index));


const styleBoxName = computed(()=>{
    return {
        marginLeft: left.value+'px',
        marginTop: top.value+'px',
    };
})
const styleName = computed(()=>{
    return {
        transform: `scale(${scale.value}) rotate(${rotate.value}deg)`,
        maxWidth: "100%",
        maxHeight: "100%",
    }
})
const imgList = computed(()=>{
    return props.datas.map((ele:datasItem) => ele.url);
})
const imgLen = computed(()=>{
    return imgList.value.length;
})
const isRrrow = computed(()=>{
    return imgLen.value != 1;
})

const stopItem = () => {
    left.value = 0;
    top.value = 0;
    item.value.forEach((ele:any) => {
        ele.pause && ele.pause();
    });
};
// 上一个
const handlePrev = () => {
    carousel.value.prev();
    index.value = carousel.value.activeIndex;
    stopItem();
}

// 下一个
const handleNext = () => {
    carousel.value.prev();
    index.value = carousel.value.activeIndex;
    stopItem();
}

const isMedia = (item:datasItem) => {
    return typeList.img.test(item.url) || typeList.video.test(item.url);
}

const getIsVideo = (item:datasItem) => {
    let url = item.url;
    let type = item.type;
    if (typeList.video.test(url) || type == "video") {
        return "video";
    } else if (typeList.img.test(url) || type == "img") {
        return "img";
    }
    return;
}

const subScale = () => {
    if (scale.value != 0.2) {
        scale.value = parseFloat((scale.value - 0.2).toFixed(2));
    }
}

const addScale = () => {
    scale.value = parseFloat((scale.value + 0.2).toFixed(2));
}

const handleChange = () => {
    scale.value = 1;
    rotate.value = 0;
}

const move = (e:any) => {
    //获取目标元素s
    //算出鼠标相对元素的位置
    let disX = e.clientX;
    let disY = e.clientY;
    let scale = 2;
    document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left1 = e.clientX - disX;
        let top1 = e.clientY - disY;
        disX = e.clientX;
        disY = e.clientY;
        //移动当前元素
        left.value = left.value + left1 * scale;
        top.value = top.value + top1 * scale;
    };
    document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

const handleClick = (item:datasItem, index:number, df = false) => {
    if (typeof props.ops.click == "function") {
        props.ops.click(item, index);
    } else if (df) {
        window.open(item.url);
    }
}

const close = () => {
    isShow.value = false;
    if (typeof props.ops.beforeClose == "function") {
        props.ops.beforeClose(props.datas, index.value);
    }
    // this.$destroy();
    // this.$el.remove();
}

</script>

<style lang="scss">
    .image-preview {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all .5s;
        z-index: 9998;
        .image-preview_mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
        }
        .el-image-viewer__btn {
            z-index: 1024;
        }
        .image-preview__box {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .el-image-viewer__close {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
    }
    .el-image-viewer__actions {
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: #606266;
        border-color: #fff;
        border-radius: 22px;
    }
    .el-carousel__container {
        height: 100%!important;
        .el-carousel__item  {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    
    .el-image-viewer__actions__inner {
        width: 100%;
        height: 100%;
        text-align: justify;
        cursor: default;
        font-size: 23px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .el-image-viewer__actions__inner {
        width: 100%;
        height: 100%;
        text-align: justify;
        cursor: default;
        font-size: 23px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .el-image-viewer__prev {
        transform: translateY(-50%);
        left: 40px;
    }
    .el-image-viewer__next, .el-image-viewer__prev {
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
        top: 50%;
    }
    .el-image-viewer__btn {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        opacity: .8;
        cursor: pointer;
        box-sizing: border-box;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png" /> -->
	<!-- <van-nav-bar
	  title="标题"
	  left-text="返回"
	  left-arrow
	  @click-left="onClickLeft"
	/> -->
	<van-nav-bar >
		<template #left>
			<img class="normal-top-logo" src="https://css99tel.cdndm5.com/v202208081802/dm5/images/mobile/top-main-logo.png" alt="">
		</template>
		<template #right>
			<van-icon name="search" size="18" />
		</template>
	</van-nav-bar>
	<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		<van-swipe-item class="van-swipe-item" v-for="item in swiperImgArr" :key="item.target_id">
			<img :src="item.image_url" alt="">
		</van-swipe-item>
	</van-swipe>
	<view class="tab-box">
		<view class="tab-item">
			<van-icon name="bars" color="#9F79EE"  size="26" /><view>分类</view>
		</view>
		<view class="tab-item">
			<van-icon name="bar-chart-o" color="#1989fa" size="26" /><view>排行</view>
		</view>
		<view class="tab-item">
			<van-icon name="fire" size="26" color="#9F79EE" /><view>动态漫</view>
		</view>
		<view class="tab-item">
			<van-icon name="shop-o" color="#1989fa" size="26" /><view>任务</view>
		</view>
		<view class="tab-item">
			<van-icon name="like" color="#9F79EE" size="26" /><view>送会员</view>
		</view>
	</view>
	<view class="container-mh">
		<van-tag round plain type="primary">更多</van-tag>
		<van-row gutter="20" justify="space-around">
		  <van-col v-for="item in 6" span="6">
			  
		  </van-col>
		</van-row>
	</view>
	<!-- <van-sticky position="bottom">
	  <van-tabbar v-model="active">
	    <van-tabbar-item badge="3">
	      <span>自定义</span>
	      <template #icon="props">
	        <img :src="props.active ? icon.active : icon.inactive" />
	      </template>
	    </van-tabbar-item>
		<van-tabbar-item icon="home-o">首页</van-tabbar-item>
	    <van-tabbar-item icon="search">标签</van-tabbar-item>
	    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
	  </van-tabbar>
	</van-sticky> -->
    <!-- <view class="text-area">
      <text class="title">{{ title }}</text>
		<Button type="primary">主要按钮</Button>
		<Button type="success">成功按钮</Button>
    </view> -->
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted,watch } from 'vue'
import type {Ref} from 'vue';
import http from '../../http/index';
const active:Ref = ref(0);
const swiperImgArr:Ref = ref([]);
const homeData:Ref = ref([]);
const title = ref('Hello')
const onClickLeft = () => {
	
}
const getHomeData = () => {
	http.get('/v2/pweb/home').then((res)=>{
		let data = res.data;
		swiperImgArr.value = data.banners
	})
}
watch(active.value,()=>{
	
})
onMounted(()=>{
	http.get('/v2/pweb/daily/topics?pos=2').then((res)=>{
		let data = res.data.topics;
	})
	getHomeData();
})
</script>

<style lang="scss">
	.normal-top-logo {
		height: 27px;
		vertical-align: top;
		margin-top: 7px;
	}
	.my-swipe {
		overflow: hidden;
		width: 100%;
		height: 12.5rem;
		.van-swipe-item {
			width: 100%;
			>img {
				width: 100%;
				height: 100%;
			}
			// color: #fff;
			// font-size: 20px;
			// line-height: 150px;
			// text-align: center;
			// background-color: #39a9ed;
		}
	}
	.tab-box {
		padding: 1rem 0;
		display: flex;
		justify-content: space-around;
		.tab-item {
			text-align: center;
		}
	}
</style>

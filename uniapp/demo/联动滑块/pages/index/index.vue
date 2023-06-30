<template>
	<view class="u-wrap">
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
			 :scroll-into-view="itemId">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
				 @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.left_name || ''}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item , index) in tabbar" :key="index">
						<view class="item-title">
							<text>{{item.right_name}}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in item.rooms" :key="index1">
								<view class="item-menu-name">{{item1.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0, // tab标题的滚动条旧位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				tabbar: [], // 渲染的数据，放在最后供你们测试
				arr: [], // 储存距离顶部高度的数组
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null // 定时器
			}
		},
		created(){
			this.getInitData();
		},
		onReady() {},
		methods: {
			// 获取初始化数据
			getInitData(){
				uni.request({
					url: '/v1/building?community_id=1517783810073170000&limit=5',
					// data: {
					// 	community_id:1517783810073170000,
					// 	limit: 1,
					// },
					header: {
						// 'Content-Type': 'application/x-www-form-urlencoded'
						 'Content-Type': 'application/json'
					},
					success: async (res) => {
						console.log(res.data)
						if(res.data.success){
							// res.data.data.forEach(async (item, index)=>{
								
							// 	item.left_name = item.name;
							// 	item.right_name = item.community.name;
							// 	console.log(item,1234)
							// 	this.tabbar[index] = JSON.parse(JSON.stringify(item))
							// 	console.log(this.tabbar)
							// });
							let resData = res.data.data
							for(let i = 0; i<resData.length; i++){
								let item = resData[i]
								// 错误处理
								try {
									item.rooms = await this.getSecondData(item.id);
								} catch(e){
									item.rooms = [];
								}
								item.left_name = item.name;
								item.right_name = item.community.name;
								this.tabbar[i] = item
								console.log(2)
							}
							this.$nextTick(()=>{
								this.getMenuItemTop();
							})
							// promise.all进行数据加载
							// let proData = res.data.data.map((item)=>{
							// 	return this.getSecondData(item.id, item)
							// })
							// Promise.all(proData).then((res)=>{
							// 	// 最终数据处理
							// 	this.tabbar = res.data.data.map((item, index)=>{
							// 		item.left_name = item.name;
							// 		item.right_name = item.community.name;
							// 		item.rooms = res[index];
							// 		return item
							// 	})
							// })
						}
					}
				})
			},
			// 获取房间数据
			getSecondData(id){
				return new Promise((resolve)=>{
					uni.request({
						url: "/v1/building/getbyid?id=" + id,
						success: (res) => {
							if(res.data.success){
								// 空处理
								res.data.data.rooms && res.data.data.rooms.length ? resolve(res.data.data.rooms) : []
							} else {
								resolve([])
							}
						}
					})
				})
			},
			/**
			* 获取右边菜单每个item到顶部的距离
			* 储存到 arr 数组里面用于后面滚动判断
			*/
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if(!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return ;
						}
						console.log(rects, 'rectsrects')
						rects.forEach((rect) => {
							// 视情况而定，这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							// this.arr.push(rect.top - rects[0].top);
							this.arr.push(rect.top)
							resolve();
						})
					}).exec()
				})
			},
			/**
			* 获取一个目标元素的高度
			* @elClass 元素的类名
			* @dataVal 储存高度的对象
			*/
			 getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			/**
			* 观测元素相交状态
			* 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
			* 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
			*/
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			/**
			* 设置左边菜单的滚动状态
			* @index 传入的 ID
			*/
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			/**
			* 点击左边的栏目切换
			* @index 传入的 ID
			*/
			async swichMenu(index) {
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function(){
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			/**
			* 右边菜单滚动
			* 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
			*/
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if(this.timer) return ;
				if(!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					// let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					// scrollHeight为右边菜单头部位置
					let scrollHeight = e.detail.scrollTop + 20;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return ;
						}
					}
				}, 10)
			}
		},
 
	}
</script>

<style>
	.u-wrap {
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	
	.u-search-box {
		padding: 18rpx 30rpx;
	}
	
	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}
	
	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 500;
		background: #fff;
	}
	
	/* .u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #06A446;
		height: 52rpx;
		left: 0;
		top: 29rpx;
	} */
	
	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.class-item:last-child {
		min-height: 100vh;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		/* margin-top: 8rpx; */
		font-weight: normal;
		padding: 20rpx 8rpx;
		width: 100%;
		height: 30rpx;
		background-color: aliceblue;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 27.5%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 15rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>

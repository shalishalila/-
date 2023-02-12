<template>
	<view>
		<view class="headers">
			<view  @click="qrLogin">
				<image src="../../static/account/a16.png" mode="widthFix" class="img"></image>
				<zwy-popup :ishide='isshow' width="636rpx" height="700rpx" radius="8rpx">
					<view class="content">
							<image :src="qrImage" mode="widthFix"></image>
							<view style="textAlign:center;lineHeight:64rpx;">网易云扫码登录</view>
							
					</view>
				</zwy-popup>
			</view>
			<p>账号</p>
			<view class="">
				<image src="../../static/mine-image/r.png" mode="widthFix" class="img"></image>
			</view>
		</view>
		<scroll-view scroll-y class="page-content" >
			<!-- 未登录 -->
			<view class="empty-user" v-if="!userInfo.hasLogin">
				<view>
					尽享海量音乐
				</view>
				<navigator url="../subPages/login/login" class="btn">立即登录</navigator>
			</view>
			<!-- 已登录 -->
			<template v-if="userInfo.hasLogin">
				<view class="userinfo-box flex-box">
					<view class="avator">
						<!-- <image :src="userInfo.profile.avatarUrl" mode="" class="img"></image> -->
						<view class="no-img">
							上传头像
						</view>
					</view>
					<view class="flex-item">
						<view class="fl">
							<view class="name">
								<!-- {{userInfo.profile.nickname}} -->
							</view>
							<view class="level">
								lv{{detail.level || 1}}
							</view>
						</view>
						<image src="@/static/account/a_03.png" mode="" class="sign fr"></image>
					</view>
				</view>
				显示已登录的头像信息
				<view class="nav-bar flex-box">
					<view class="flex-item">
							{{detail.eventCount || 0 }}
							<view class="txt">
								动态
							</view>
					</view>
					<view class="flex-item">
							{{detail.follows || 0 }}
							<view class="txt">
								关注
							</view>
					</view>
					<view class="flex-item">
							{{detail.followeds || 0 }}
							<view class="txt">
								粉丝
							</view>
					</view>
					<view class="flex-item">
							<!-- 字体图标 -->
							<view class="txt">
								编辑资料
							</view>
					</view>
				</view>
			</template>
			<!-- 广告位 -->
			<view class="ad-bar" :class="{bgf:!userInfo.hasLogin}">
				<image src="../../static/account/a_07.png" mode="widthFix" class="img"></image>
			</view>
			<!-- 商城列表 -->
			<view class="mall-bar flex-box">
				<view class="flex-item">
					<image src="@/static/account/a_m1.png" mode="widthFix" class="icon"></image>
					消息
				</view>
				<view class="flex-item">
					<image src="@/static/account/a_m1.png" mode="widthFix" class="icon"></image>
					商城
					<view class="txt">
						29元包邮
					</view>
				</view>
				<view class="flex-item">
					<image src="@/static/account/a_m1.png" mode="widthFix" class="icon"></image>
					演出
					<view class="txt">
						天鹅湖
					</view>
				</view>
				<view class="flex-item">
					<image src="@/static/account/a_m1.png" mode="widthFix" class="icon"></image>
					个性换肤
				</view>
			</view>
			<!-- uni列表 -->
			<uni-list>
				<uni-list-item title="口袋彩铃" thumb="/static/account/a_16.png" size="mini" />
				<uni-list-item title="我的订单" thumb="/static/account/a_19.png" size="mini" />
				<uni-list-item title="创作者中心" thumb="/static/account/a_09.png" size="mini" />
				<uni-list-item title="设置" thumb="/static/account/a_21.png" size="mini"/>
				<uni-list-item title="夜间模式" thumb="/static/account/a_23.png" size="mini" 
				:showSwitch="true" @switchChange="switchChange"/>
				<uni-list-item title="定时开关" thumb="/static/account/13.png" size="mini" />
				<uni-list-item title="音乐闹钟" thumb="/static/account/13.png" size="mini" />
				<uni-list-item title="在线听歌" thumb="/static/account/14.png" size="mini" />
				<uni-list-item title="优惠券" thumb="/static/account/15.png" size="mini" />
				<uni-list-item title="分享音乐" thumb="/static/account/16.png" size="mini" />
				<uni-list-item title="关于" thumb="/static/account/17.png" size="mini" />
			</uni-list>
			<!-- 退出登录 -->
			<view class="logout" v-if="userInfo.hasLogin" @click="alertLogOut">
				退出登录
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {apiUserDetail,apiQrLogin,apiLogOut} from '@/apis/index.js'
	 // import {apiUserDetail} from '@/apis/index.js'
	export default {
		data() {
			return {
				detail: {},
				statusCode:'',
				isshow:false,
				qrImage:''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {
			// this.getDetail()
		},
		onShow() {
			// this.getDetail()
		},
		methods: {
				...mapMutations(['storeLogout']),
				//开关
				switchChange(e){
					console.log(e)
					uni.showToast({
						title:"value" + e.value
					})
				},
			
				//二维码登录
				qrLogin(){
					let n = 1
					const road = ['key','create','check']
						let timerStamp = {timerStamp:Date.now()}
						let nothing = {}
					apiQrLogin(road[0],nothing,timerStamp).then(({data})=>{
						let params = {"key":data.unikey}
						apiQrLogin(road[1],params,timerStamp).then(({data})=>{
							this.isshow = true
							this.qrImage = data.qrimg	
							
								// uni.showToast({
							// 	image:`${data.qrurl}`
							// })
							let timer = setInterval(()=>{
								n++
								
								apiQrLogin(road[2],params,timerStamp).then(res=>{
									if(res.code === 800){
										alert('二维码已过期，请重新获取')
										clearInterval(timer)
									}
									if(res.code === 803){
										uni.setStorageSync('userInfo',JSON.stringify(res.cookie))
										clearInterval(timer)
										this.isshow = false
										uni.switchTab({
											url:"/pages/index/index"
										})
									}
								})
							},3000)
						})
						
					})
				},
				//用户详情
				// getDetail(){
				// 	const profile = this.userInfo.profile;
				// 	if(!profile || !profile.userId){
				// 		return false;
				// 	}
				// 	const params = {
				// 		uid:profile.userId
				// 	}
				// 	apiUserDetail(params).then(res=>{
				// 		console.log('detail:',res)
				// 		this.detail = res.data;
				// 	})
					
				// },
				//账号退出
				alertLogOut(){
					
					uni.showModal({
						title:'网易云音乐',
						content:'是否退出当前帐号？',
						cancelColor:"red",
						success:(res)=>{
							if(res.confirm){
								uni.removeStorageSync('userInfo');
								// this.confirmLogOut();
							} else if (res.cancel){
								
							}
						}
					})
				},
				//注销
				// confirmLogOut(){
				// 	apiLogOut().then(res=>{
				// 		//清除前端的用户信息
				// 		this.storeLogOut();
				// 		//跳转到首页
				// 		uni.navigateTo({
				// 			url:'/pages/index/index'
				// 		})
				// 	})
				// }
		}
	}
</script>

<style lang="scss">
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
		}
		
		.image {
			width: 100%;
			
		}
	.headers {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		font-weight: 700;
		justify-content: space-between;
		padding: 0 10rpx;
		border-bottom: 2rpx solid gray;

		.img {
			vertical-align: middle;
			width: 50rpx;
			height: 40rpx;

			&.left {
				margin-left: 10rpx;
			}
		}
	}

	page {
		color: #333;

	}

	.scan-box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .8);
		transform: translateX(100%);
		transition: transform 0.05s;

		&.active {
			transform: translateX(0)
		}
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top: 44px; // h5 无状态栏
		bottom: 100rpx;
		/* #endif */
		background: #f8f8f8;
	}

	.mt16 {
		margin-top: 16rpx;
	}

	.bgf {
		background: #fff;
	}

	.empty-user {
		background: #fff;
		padding-top: 40rpx;
		text-align: center;
		line-height: 50rpx;

		.btn {
			width: 710rpx;
			height: 80rpx;
			margin: 22rpx auto 0;
			text-align: center;
			line-height: 80rpx;
			border: 2rpx solid #cdcdcd;
			border-radius: 80rpx;
			font-size: 32rpx;
		}
	}

	.userinfo-box {
		padding-top: 46rpx;

		.avator {
			width: 120rpx;
			height: 120rpx;
			margin: 0 32rpx;
			border-radius: 120rpx;
			color: #fff;
			background: #d6d8da;
			overflow: hidden;
		}

		.img {
			width: 100%;
			height: 100%;
		}

		.name {
			color: #302f30;
			line-height: 68rpx;
			font-weight: 600;
		}

		.sign {
			width: 128rpx;
			height: 52rpx;
			margin-top: 16rpx;
			margin-right: 32rpx;
			border-radius: 52rpx;
		}

		.level {
			width: 100rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
			color: #838080;
			background: #d7d3d4;
			transform: scale(0.8);
		}
	}

	.nav-bar {
		margin-top: 38rpx;
		text-align: center;
		font-weight: 600;

		.flex-item {
			height: 80rpx;
			border-right: 1rpx solid #cdcacb;

			&:last-child {
				border: 0;
			}
		}

		.txt {
			color: #939293;
			font-weight: 400;
		}
	}

	.ad-bar {
		padding-top: 32rpx;

		.img {
			display: block;
			width: 686rpx;
			height: 120rpx;
			margin: 0 auto;
		}
	}

	.mall-bar {
		padding-top: 38rpx;
		padding-bottom: 20rpx;
		text-align: center;
		font-weight: 600;
		font-size: 26rpx;
		background: #fff;
		line-height: 35rpx;

		.icon {
			display: block;
			width: 48rpx;
			height: 48rpx;
			margin: 0 auto 24rpx;
		}

		.txt {
			color: #999;
			font-weight: 400;
			font-size: 24rpx;
			transform: scale(0.84);
		}
	}

	.line-item {

		.icon {
			float: left;
			width: 35rpx;
			height: 32rpx;
			margin-top: 30rpx;
			margin-right: 36rpx;
		}
	}

	.logout {
		display: block;
		height: 100rpx;
		margin-top: 16rpx;
		text-align: center;
		line-height: 100rpx;
		color: #333;
		background: #fff;
	}
</style>

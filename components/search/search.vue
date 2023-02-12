<template>
	<view  :class="{show: isShow}" v-if="isShow">
			<view class="headers">
				<input type="text" value="nihaoa" v-model="searchTxt" :focus="isFocus" class="input" 
				@input="inputSearch" @confirm="addSearchHistory">
				
				<view class="cancel" @click="close()">
					取消
				</view>
				
				<view class="right">
				<image src="../../static/search/1.png" mode="widthFix" ></image>
				</view>
			</view>
			<!-- 搜索页内容 -->	
			<scroll-view scroll-y="true" >
				<!-- 没有输入的情况下，展示广告位 -->
				<template v-if="!searchTxt.trim().length">
					<!-- 广告位 -->
					<image class="top-ad" src="@/static/search/s_03.png" mode="widthFix"></image>
					<!-- 搜索历史 -->
					<view class="history-list" v-if="historyList.length">
						<view class="title-bar flex-box">
							<view class="title">
								搜索历史
							</view>
							<image class="icon"  src="@/static/search/3.png" mode="widthFix"
							@click="clearSearch"></image>
						</view>
						<scroll-view scroll-x class="list scroll-view">
							<view class="item" v-for="(item,index) in historyList" :key="index">
								<view class="desc">
									{{item}}
								</view>
							</view>
						</scroll-view>
					</view>
					<!-- 热搜版 -->
					<view class="hot-list">
						<view class="title-bar flex-box">
								<view class="title">
									热搜榜
								</view>
						</view>
						<view class="list">
							<view class="item flex-box" v-for="(item,index) in hotList" :key="index">
								<view class="num" :class="{on: index<3}">
									{{index + 1}}
								</view>
								<view class="flex-item">
									<view class="flex-box con">
										<view class="tit">
											{{item.searchWord}}
										</view>
										<view class="count">
											{{item.score}}
										</view>
										<image class="icon" :src="item.iconUrl" mode="widthFix"></image>
									</view>
									<view class="desc">
										{{item.content}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<!-- 已经输入的情况下展示一下视图	 -->
				<view class="suggest-list" v-if="searchTxt.trim().length">
					<view class="suggest">
						搜索{{searchTxt.trim()}}
					</view>
					<view class="item flex-box" v-for="(item,index) in suggestList" :key="index">
						<view class="icon iconfont">
							
						</view>
						<view class="word flex-item">
							{{item.keyword}}
						</view>
					</view>
				</view>
				<view></view>
			</scroll-view>
		</view>
</template>

<script>	

				let self = null
				//防抖
	function  debunce(fn,wait=500){
			var timeout = null
			return function(){
				if(timeout !== null){
					clearTimeout(timeout)
				}
				timeout = setTimeout(fn,wait);
			}
	}
	
	import {apiGetSearchHot,apiSearchSuggest} from '@/apis/index.js'
	export default {
		data() {
			return {
				isShow:false,		//是否显示探索
				searchTxt:'',		//探索内容
				isFocus:false,  	 //光标是否定位
				historyList:[],       //搜索历史
				hotList:[],
				suggestList:[]
			}
		},
		created() {
			self = this
		},
		methods: {
				open(){
					this.isShow = true;
					this.isFocus = true;
					this.getHotList();
					this.getSearchHistoryList();
				},
				//关闭搜索页
				close() {
					this.isShow = false;
					this.isFocus = false;
					this.$emit('close');
				},
				getHotList(){
					if(this.hotList.length > 0){
						return false;
					}
					apiGetSearchHot().then(res=>{
						this.hotList = res.data
						console.log('hotlist',res)
					})
				},
				//搜索列表
				inputSearch: debunce(()=>{
					if(self.searchTxt.trim()){
						const params = {
							type:'mobile',
							keywords:self.searchTxt.trim()
						}
						apiSearchSuggest(params).then(res=>{
							console.log(res)
							self.suggestList = res.result.allMatch;
						})
					}
					
				}),
				//搜索历史
				addSearchHistory(){
					const txt = this.searchTxt.trim()
					if(txt){
						//检查关键字是否已存在
						const tempIndex = this.historyList.indexOf(txt)
						if(tempIndex !== -1){
							//	删除旧的
							this.historyList.splice(tempIndex,1)
						}
						//	添加
							this.historyList.unshift(txt)
							
							//持久存储
							uni.setStorageSync('searchList',JSON.stringify(this.historyList))
					}
				},
				//读取搜索历史
					getSearchHistoryList(){
						const value = uni.getStorageSync('searchList');
						if(value){
								this.historyList = JSON.parse(value);
							}
					},
				//清除搜索历史
				clearSearch(){
					uni.showModal({
						title:'',
						content:'确认清除全部历史记录？',
						success: (res) => {
							if(res.confirm){
								uni.setStorageSync('searchList','');
								this.historyList = []
							} else if (res.cancel){
								return true
							}
						}
					})
				}
		}
	}
</script>

<style lang="scss" >
			.headers{
				display: flex;
				height: 100rpx;
				line-height: 100rpx;
				align-items: center;
				vertical-align: middle;
				background-color: #fff;
				border-bottom: 2rpx solid gray;
				font-size: 10rpx;
				image{
				
					width: 100%;
				}
					.input{
						height: 85rpx;
						width: 520rpx;
						border: 6rpx solid green;
						border-radius: 45rpx;
						margin-left: 66rpx;
					}
					.cancel{
						padding: 0 20rpx;
						font-size: 26rpx;
						font-weight: 700;
					}
					.right{
						height:60rpx;
						width: 45rpx;
						
					}
					
			}
			.top-ad{
				display:block;
				width:686rpx;
				height:110rpx;
				margin: 24rpx auto 0;
			}
			.history-list {
				padding-top:14rpx;
				.list {
					height: 106rpx;
					padding-top:20rpx;
					margin-bottom: 30rpx;
					white-space: nowrap;
					.item {
						position: relative;
						display: inline-block;
						height: 64rpx;
						padding:0 30rpx;
						margin-right:20rpx;
						text-align: center;
						line-height: 64rpx;
						border-radius: 64rpx;
						color:#323232;
						background: #f8f8f8;
						&:first-child{
							margin-left:40rpx;
						}
					}
				}
			}
		.title-bar{
			height:68rpx;
			padding: 0 36rpx;
			justify-content: space-between;
			align-items:center;
			font-size: 26rpx;
			font-weight: 600;
			color:#333;
			.icon{
				width:36rpx;
				height:36rpx;
				margin-right:10rpx;
			}
		}
		.hot-list{
			.item{
				align-items: center;
				height:120rpx;
			}
			.con{
				align-items: center;
			}
			.num{
				width:84rpx;
				text-align: center;
				line-height: 120rpx;
				color:#999;
				font-size: 24rpx;
				font-weight: 600;
				&.on{
					color:#ff3a3a;
				}
			}
			.tit{
				margin-right:20rpx;
				color:#333;
				line-height: 48rpx;
				font-size: 32rpx;
				font-weight: 600;
			}
			.count{
				margin-right:20rpx;
				color:#ccc;
				line-height: 48rpx;
				font-size: 24rpx;
				transform: scale(0.84);
			}
			.icon{
				width:56rpx;
				height:20rpx;
			}
			.desc{
				color:#999;
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
		.suggest-list{
			.suggest{
				position:relative;
				height:96rpx;
				margin-left:32rpx;
				line-height:96rpx;
				color:#6578a0;
				&:before{
					position:absolute;
					content: '';
					right:0;
					bottom:0;
					width:100%;
					border-top: 1px solid #e6e6e6;
					transform: scaleY(0.5);
				}
			}
			.item{
				height:90rpx;
				line-height: 90rpx;
				color:#222;
			}
			.icon{
				width:72rpx;
				color:#aaa;
				text-align:center;
			}
			.word{
				position:relative;
				&:before{
					position:absolute;
					content: '';
					right:0;
					bottom:0;
					width:100%;
					border-top: 1px solid #e6e6e6;
					transform: scaleY(0.5);
				}
			}
		}
		
</style>

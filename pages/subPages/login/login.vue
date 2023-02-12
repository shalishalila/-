<template>
	<view>
		<view>
			<view class="login-form">
				<input type="text" class="input-row" v-model="account" maxlength="11" 
				placeholder="请输入账号" />
				<input type="password" class="input-row" v-model="password" maxlength="11" 
				placeholder="请输入密码" />
				<button type="bytton" class="btn login-btn" @click="login">登录</button>
				<view class="bot flex-box">
					<navigator class="sign" hover-class="none">立即注册</navigator>
					<navigator class="forget" hover-class="none">忘记密码?</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {apiLogin} from '../../../apis/index.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
			account:'',
			password:''
			}
		},
		methods: {
			...mapMutations(['storeLogin']),
			login(){
				if(!this.account){
					this.alert('账号不能为空')
					return false
				}
				if(!this.password){
					this.alert('密码不能为空')
					return false;
				}
				//去掉输入框左右两边的空格
				const account = this.account.trim();
				const password = this.password.trim()
				//检查密码长度/正则表达式复习
				if(password.length<6){
					this.alert('密码最短为6个字符')
					return false
				}
				//检查完毕，登录中
				uni.showLoading({
					title:'登陆中....'
				})
				//调用接口
				const params = {
					userName:account,
					password:password
				}
				apiLogin(params).then(res=>{
					
					//如果登录失败
					if(res.data.code!==200){
						this.alert(res.errMsg);
						return false
					}
					//登录成功 把登录信息保存vuex并跳转到首页
					const temp = {
						token:res.data.account.token,
						profile:res.data.profile
					}
					//把登录信息保存在vuex并跳转到首页
						this.storeLogin(temp)
					//跳转
					uni.switchTab({
						url:"/pages/index/index"
					})
				})
			},
			
			alertModal(msg){
				uni.showModal({
					content:'msg',
					showCancel:false
				})
			},
			alert(msg){
				uni.showToast({
					icon:'none',
					title:msg
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-row {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid #E04B28;
		color: #6c6c6c;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
	}

	.login-form {
		padding-top: 220rpx;
	}

	.login-btn {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid #E04B28;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
		color: #fff;
		background: #E04B28;
	}

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		justify-content: space-between;
	}

	.sign {
		color: #E04B28;
	}

	.auth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		bottom: 100rpx;
		left: 0;
		width: 100%;

		.auth-image {
			width: 50px;
			height: 50px;
			border: 1px solid #dddddd;
			border-radius: 50px;
			margin: 0 20px;
			background-color: #ffffff;
			overflow: hidden;
		}

		.img {
			width: 30px;
			height: 30px;
			margin: 10px;
		}

		input {
			outline: none;
			border: none;
			list-style: none;
		}
	}

	.log-btn {
		margin: 0;
		padding: 0;
		background: #fff !important;
		height: 48px;

		&::after {
			background-color: transparent;
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
</style>

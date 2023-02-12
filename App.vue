<script>
	import {mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						console.log(res)
						//将用户信息保存到vuex
						this.storeLogin(JSON.parse(res.data))
					}
				})
		},
		onShow: function() {
			console.log('App Show')
			//广告显示的时间 10分钟
			let adShowTime = 10*60*1000;
			//当前时间
			let nowTime = (new Date()).getTime();
			//开始隐藏的时间
			let leaveTime = this.$store.state.leaveTime;
			
			//开始比较
			if((nowTime - leaveTime) >=adShowTime){
				console.log('show ad');
				//跳转到开屏页
				uni.navigateTo({
					url:'/pages/ad/ad'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['storeLogin'])
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import 'common/css/common.scss';
	@import 'common/css/iconfont.css';
</style>

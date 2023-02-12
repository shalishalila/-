import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)


	//提取playlist数据 放入vuex
	let storePlayList = [];
	try{
		const value = uni.getStorageSync('playList');
		if(value){
			storePlayList = JSON.parse(value);
		}
	}	catch (e){}
const store = new Vuex.Store({
	state:{
		userInfo:{
			hasLogin:false
		},
		leaveTime:0,			//记录app隐藏的开始时间
		playList:storePlayList,		//播放列表
		
	},
	mutations:{
		//记录app隐藏的开始时间
				storeLeaveTime(state, payload) {
					let curTime = (new Date()).getTime();
					state.leaveTime = curTime;
				},
			//保存用户信息
			storeLogin(state,payload){
				const temp = {
					hasLogin:true,
					token:payload.token,
					profile:payload.profile
				}
				state.userInfo = temp;
				
				//用户信息持久化到storage
				uni.setStorageSync('userInfo',JSON.stringify(state.userInfo));
			},
			//清除用户信息
			storeLogOut(state){
				const temp = {
					hasLogin: false,
					token:'',
					profile : {}
				}
				state.userInfo = temp;
				//清除storage
				uni.removeStorageSync('userInfo');
			},
			//保存播放列表
			storePlayList(state,payload){
				state.playList = payload;
				console.log('state的数据是',state.playList )
				//持久化存储
				uni.setStorageSync('playList',JSON.stringify(payload))
			}
	},
	actions:{
		
	}
})
export default store
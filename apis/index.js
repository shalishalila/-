	import request from '../utils/request.js'
	
	//获取轮播图数据
	export function apiGetBanner(data){
		return request.request({
			url:'/banner',
			data
		})
	}
	
	//推荐歌单
	export function apiGetRecommendSongs(data){
		return request.request({
			url:'/personalized',
			data
		})
	}
	export function  apiGetTopAlbum(data){
		return request.request({
			url:'/album/newest',
			data
		})
	}
	
	export function  apiGetRelatedVideo(data){
		return request.request({
			url:'/related/allvideo',
			data
		})
	}
	export function apiGetNavList(data){
		return request.request({
			url:'/video/group/list',
			data
		})
	}
	
	export function apiLogin(data){
		return request.request({
			url:'/test/login',
			method:'POST',
			data
		})
	}
	
	export function apiQrLogin(road,data,timerStamp,qrimg){
		return request.request({
			url:`/login/qr/${road}?timerStamp=${Date.now()}&qrimg=true`,
			data,
			withcredentials: true,
			qrimg:true
		})
	}
	
	export function apiUserDetail(data){
		return request.request({
			url:'/user/detail',
			method:'GET',
			data
		})
	}
	
	export function apiLogOut(data){
		return request.request({
			url:'/logout',
			method:'GET',
			data
		})
	}
	//广告接口
	export function apiAdMock(data){
		return request.request(({
			url:'/adMock',
			method:'GET',
			data
		}))
	}
	
	//热搜版
	export function apiGetSearchHot(data){
		return request.request({
			url:'/search/hot/detail',
			method:'GET',
			data
		})
	}
	
	//搜索接口
	export function apiSearchSuggest(data){
		return request.request({
			url:'/search/suggest',
			method:'GET',
			data
		})
	}
	//歌单详情
	  export function  apiAlbumDetail(data){
		  return request.request({
			  url:'/playlist/detail',
			  method:'GET',
			  data
		  })
	  }
	  
	  //	歌曲链接
	  export function apiGetSongUrl(data){
		  return request.request({
			  url:'/song/url',
			  method:'GET',
			  data
		  })
	  }
	  
	  //获取歌曲详情
	  export function apiGetSongDetail(data){
		  return request.request({
			  url:'/song/detail',
			  method:'GET',
			  data
		  })
	  }
	
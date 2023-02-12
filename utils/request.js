	/**
	 * 请求组件封装
	 * @param {Object} url 请求地址
	 * @param {Object} data 请求参数
	 * @param {Object} method  请求方法
	 * @param {Object} contentType  请求内容类型 1=json 2 =form
	 */
	
	function  request({url,data,method='get',contentType=1}) {
			let header = {
				'content-Type' : contentType ===1 ? 'application/json' : 'application/x-www-form-urlencoded'
			};
			let baseUrl = 'http://localhost:3000';
			
			
			return new Promise((resolve,reject)=>{
				uni.request({
					url:baseUrl + url,
					data,
					method,
					header,
					success:(res)=>{
						
						if(res.statusCode ===200){
							//请求成功
							resolve(res.data)
						} else {
							uni.showToast({
								icon:'none',
								title:'未登录或登录超时',
								duration:1500
							})
						}
						
					},
					fail:(err)=>{
						console.log('err',err)
						uni.showToast({
							icon:'none',
							title:err.errMsg,
							duration:1500
						})
						reject(err);
					}
				})
			})
	}
	
	
	export default{
		request
	}
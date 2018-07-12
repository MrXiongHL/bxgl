import axios from 'axios'

import Url from '../config/urlConfig.js'
import querystring from 'querystring'

//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
	//在请求发出之前进行一些操作
	if(config.data.querystring) {
		config.data = querystring.stringify(config.data);
	}
	//console.log(config.data)
	return config
}, function(error) {
	//Do something with request error
	return Promise.reject(error)
});

//添加一个响应拦截器
axios.interceptors.response.use(function(res) {
	//在这里对返回的数据进行处理
	return res
}, function(error) {
	//Do something with response error
	return Promise.reject(error)
})

const getData = (data) => {
	axios({
		method: data.methodType,
		url: Url.httpUrl + data.url,
		data: data.data,
		responseType: data.dataType || 'json',
	}).then(function(res) {
		data.succFoo(res)
	}).catch(error => {
		data.errorFoo(error)
	});
}

export {
	getData
}
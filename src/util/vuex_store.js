import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		asideClose: false,
		themeColor:'',//主题背景
		active:'',//当前路由
		mainView: [], //存储路由视图
	},
	mutations: {
		setActive:function(state,data){
			state.active = data.active
		},
		setAsideClose: function(state, data) {
			state.asideClose = data.asideClose
		},
		setThemeColor:function(state,data){
			state.themeColor = data.themeColor
		},
		setMainView:function(state,data){
			state.mainView.push(data)
			console.log(state.mainView)
		}
	}
})
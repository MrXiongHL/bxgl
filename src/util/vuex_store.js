import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		asideClose: false,
		themeColor: '', //主题背景
		active: '', //当前路由
		mainView: [], //存储路由视图,
		//historyMainView: [] //历史路由
	},
	mutations: {
		setActive: function(state, data) {
			state.active = data.active
			//router.push
			//设置路由并跳转
			//			data.router.push({
			//				path: data.active,
			//			})
		},
		setAsideClose: function(state, data) {
			state.asideClose = data.asideClose
		},
		setThemeColor: function(state, data) {
			state.themeColor = data.themeColor
		},
		setMainView: function(state, data) {
			state.mainView = data.mainView
		},
		openRoute: function(state, data) {
			//设置当前访问路由
			state.active = data.dt.index
			//router.push
			//设置路由并跳转
			//			data.router.push({
			//				path: data.dt.index,
			//			})

			//清除历史记录内item.index == data.dt.index的旧路由
//			state.historyMainView = state.historyMainView.filter(function(item) {
//				return item.index != data.dt.index
//			})
			//更新
			//state.historyMainView.push(data.dt)

			//当前打开的所有路由
			let isOpen = (state.mainView || []).filter(function(item) {
				return item.index == data.dt.index
			})
			if(isOpen.length > 0) {
				return
			}

			state.mainView.push(data.dt)
			console.log("mainView"+state.mainView.length)
		}
	}
})
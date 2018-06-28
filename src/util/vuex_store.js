import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		routerArr: [], //存储路由history
		routerIndex: '', //当前路由,
		asideClose: false,
		tables: {
			selectTable: '',
			tables: []
		}, //index_main-table
	},
	mutations: {
		setAsideClose: function(state, data) {
			state.asideClose = data.asideClose
		},
		setDefault: function(state, data) {
			state.routerArr = data.routerArr
			state.routerIndex = data.routerIndex
			state.tables.selectTable = data.selectTable
			state.tables.tables = data.tables;
		},
		setTables: function(state, data) {
			state.tables.tables = data.tables;
			state.tables.selectIndex = data.selectTable
		},
		setSelectTable: function(state, data) {
			state.tables.selectTable = data.selectTable
		},
		removeRouterArr: function(state, data) {
			state.routerArr = data.routerArr
		},
		setRouterArr: function(state, data) {

			let has = state.routerArr.indexOf(data.url)
			//console.log(has,data.url,state.routerArr)
			if(has == -1) { //路由不存在则打开
				state.routerArr.push(data.url)
				state.routerIndex = data.url
				//push_router
				data.router.push({
					path: `/${data.mainUrl}/${data.url}`,
				})
				//index_main-data
				state.tables.tables.push({
					title: data.title,
					index: data.url,
					content: '',
					closable: true
				})
			} else {
				state.routerIndex = data.url
			}
			//选中-tabs
			state.tables.selectTable = state.routerIndex
			//改变路径不跳转
			window.location.href = data.urlLocatoin + state.routerIndex
		},
		setRouterIndex: function(state, data) {
			state.routerIndex = data.url
			state.tables.selectTable = state.routerIndex
			window.location.href = data.urlLocatoin + state.routerIndex
		}
	}
})
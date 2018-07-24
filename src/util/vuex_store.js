import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const storeA = { //test
	namespaced: true,
	state: {
		title: 'storeA-标题'
	},
	mutations: {
		setTitle: function(state, data) {
			state.title = data.title
		}
	},
	getters: {
		getTitle: function(state, getters, rootState) {
			return function(d) {
				return state.title + d
			}
		},
		getTitle2: (state, getters, rootState) => (d) => {
			return state.title + d
		}
	}
}

export default new Vuex.Store({
	modules: {
		storeA,
	},
	state: {
		routerArr: [], //存储路由history
		asideClose: false,
		tables: {
			selectTable: '',
			tables: []
		},
		historyTables: [], //index_main-table
	},
	mutations: {
		setAsideClose: function(state, data) {
			state.asideClose = data.asideClose
		},
		setDefault: function(state, data) {
			state.routerArr = data.routerArr
			state.tables.selectTable = data.selectTable
			state.tables.tables = data.tables;
		},
		setTables: function(state, data) {
			state.tables.tables = data.tables;
			state.tables.selectTable = data.selectTable
		},
		setSelectTable: function(state, data) {
			state.tables.selectTable = data.selectTable
		},
		removeRouterArr: function(state, data) {
			state.routerArr = data.routerArr
		},
		setRouterArr: function(state, data) {

			let has = state.routerArr.indexOf(data.dt.index)
			//console.log(has,data.url,state.routerArr)
			if(has == -1) { //路由不存在则打开
				state.routerArr.push(data.dt.index)
				//push_router
				let rt = {
					path: data.mainUrl ? `/${data.mainUrl}/${data.dt.index}` : `/${data.dt.index}`,
				};
				if(data.dt.isFirst) {
					data.router.replace(rt)
				} else {
					data.router.push(rt)
				}
				//index_main-data
				state.tables.tables.push(data.dt)
				state.historyTables.filter(arr => arr.index == data.dt.index).length <= 0 ? state.historyTables.push(data.dt) : ''
			}
			//选中-tabs
			state.tables.selectTable = data.dt.index
			//改变路径不跳转
			window.location.href = data.urlLocatoin + data.dt.index
		},
		setRouterIndex: function(state, data) { //设置当前菜单和浏览器路径
			state.tables.selectTable = data.url
			window.location.href = data.urlLocatoin + data.url
		}
	}
})
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		locationUrl: 'd', //浏览器url变化
		tables: {
			selectIndex:0,
			tables:[]
		}, //index_main-table
	},
	mutations: {
		setUrl: function(state, data) {
			console.log(data)
			state.locationUrl = data.url
		},
		getUrl: function(state, data) {
			console.log(data)
			return state.locationUrl
		},
		setTables: function(state, data) {
			state.tables.tables = data.tables;
			state.tables.selectIndex = data.selectIndex
		},
		getTables: function(state, data) {
			return state.tables;
		},
		setTablesIndex:function(state,data){
			state.tables.selectIndex = data.selectIndex
		}
	}
})
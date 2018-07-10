<template>
	<div>
		<el-tabs v-model="tables.selectTable" type="border-card" @tab-remove="removeTab" @tab-click="selectTab">
			<el-tab-pane :key="item.name" v-for="(item, index) in tables.tables" :closable="item.closable" :name="item.index">
				<!--<component :is="item.content"></component>-->
				<span slot="label"><i :class="item.icon"></i> {{item.title}}</span>
			</el-tab-pane>
		</el-tabs>
		<router-view></router-view>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		name: 'index-main',
		data() {
			return {

			}
		},
		created: function() {},
		computed: {
			...mapState({
				tables: state => state.tables,
				routerArr: state => state.routerArr
			}),
		},
		methods: {
			selectTab: function(tab) {
				let tbI = tab.index
				let tbN = tab.name
				let tabPN = tab.paneName
				let tabTitle = tab.label
				this.$store.commit({
					type: 'setRouterIndex',
					url: tbN,
					urlLocatoin: '#/index/'
				})
				//console.log(this.tables.selectTable, '-----', tab.index, tab.name, tab.paneName)
			},
			removeTab: function(name) {
				//console.log(name)

				let tabs = this.tables.tables;
				let activeName = this.tables.selectTable;
				if(activeName === name) {
					tabs.forEach((tab, index) => {
						if(tab.index === name) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.index;
							}
						}
					});
				}
				this.$store.commit({
					type: 'setTables',
					tables: tabs.filter(tab => tab.index !== name),
					selectTable: activeName
				})
				this.$store.commit({
					type: 'setRouterIndex',
					url: activeName,
					urlLocatoin: '#/index/'
				})

				this.$store.commit({
					type: 'removeRouterArr',
					routerArr: this.routerArr.filter(tab => tab !== name),
				})

			}
		}
	}
</script>

<style>
	i.iconfont {
		font-size: inherit;
	}
	
	.el-tabs {
		/*height: 100% !important;*/
		box-sizing: border-box !important;
		/*border: none;*/
		border-bottom: none !important;
		box-shadow: none !important;
		/*position: relative;
		padding-top: 38px;*/
	}
	
	.el-tabs .el-tabs__header {
		padding-left: 10px;
		padding-right: 10px;
	}
	
	.el-tabs__nav-next, .el-tabs__nav-prev {
		height: 39px !important;
		line-height: 39px !important;
		bottom: 0 !important;
		top: 0 !important;
	}
	/*去除关闭标签时出现蓝色边框*/
	
	.el-tabs .el-tabs__item:focus.is-active.is-focus:not(:active) {
		-webkit-box-shadow: none !important;
		box-shadow: none !important;
	}
	/*.el-tabs .el-tabs__new-tab {
		box-sizing: border-box;
		margin-top: 11px;
	}*/
	/*.el-tabs .el-tabs__header {
		position: absolute;
		width: 100%;
		top: 0px;
		border-top: 1px solid #e4e7ed;
	}*/
	
	.el-tabs .el-tabs__content {
		/*height: 100%;*/
		height: 0px;
		padding: 0;
		overflow: auto;
	}
</style>
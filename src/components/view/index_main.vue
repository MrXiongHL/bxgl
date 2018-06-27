<template>
	<div>
		<el-tabs v-model="editableTabsValue" type="border-card" editable @tab-remove="removeTab" @tab-add="addTab" @tab-click="selectTab">
			<el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :closable="item.closable" :name="item.name">
				<!--<component :is="item.content"></component>-->
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
				editableTabsValue: '2',
				editableTabs: [{
					title: 'Tab 1',
					name: '1',
					content: 'User',
					closable: false,
				}, {
					title: 'Tab 2',
					name: '2',
					content: 'User',
					closable: true,
				}],
				tabIndex: 2
			}
		},
		created: function() {
			//			if(this.tables.tables.length > 0) {
			//				console.log('tables1', this.tables.selectIndex)
			//				this.editableTabs = this.tables.tables
			//				this.editableTabsValue = this.tables.selectIndex + ''
			//			} else {
			//				this.$store.commit({
			//					type: 'setTables',
			//					tables: this.editableTabs,
			//					selectIndex: this.editableTabsValue
			//				})
			//				console.log('tables2', this.tables.tables, this.tables.selectIndex)
			//			}
		},
		computed: {
			//			...mapState({
			//				tables: state => state.tables
			//			}),
		},
		methods: {
			selectTab: function(tab) {
				let tbI = tab.index
				let tbN = tab.name
				let tabPN = tab.paneName
				this.$store.commit({
					type: 'setTablesIndex',
					selectIndex: tbN
				})
				console.log(tab, tab.index, tab.name, tab.paneName)
			},
			addTab(targetName, action) {
				let newTabName = ++this.tabIndex + '';
				//(this.tables.tables || 
				this.editableTabs.push({
					title: 'New Tab',
					name: newTabName,
					content: ''
				});
				console.log(newTabName, action)
				this.editableTabsValue = newTabName;

				//				this.$store.commit({
				//					type: 'setTables',
				//					tables: this.tables.tables || this.editableTabs,
				//					selectIndex: newTabName,
				//				})

			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				console.log(activeName, targetName)
				if(activeName === targetName) {
					tabs.forEach((tab, index) => {
						if(tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);

				//				this.$store.commit({
				//					type: 'setTables',
				//					tables: this.editableTabs,
				//					selectIndex: activeName,
				//				})
			}
		}
	}
</script>

<style>
	.el-tabs {
		/*height: 100% !important;*/
		box-sizing: border-box;
		border: none;
		box-shadow: none;
		/*position: relative;
		padding-top: 38px;*/
	}
	
	.el-tabs .el-tabs__header {
		padding-left: 10px;
		padding-right: 10px;
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
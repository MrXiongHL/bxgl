<template>
	<el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab" editable @tab-add="addTab">
		<el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
			<component :is="item.content"></component>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
	const User = {
		template: '<div style="height:100%;">User {{ $route.params.id }}</div>'
	}
	export default {
		name: 'table-panel',
		data() {
			return {
				editableTabsValue: '2',
				editableTabs: [{
					title: 'Tab 1',
					name: '1',
					content: User
				}, {
					title: 'Tab 2',
					name: '2',
					content: User
				}],
				tabIndex: 2
			}
		},
		methods: {
			addTab(targetName, action) {
				console.log(targetName, action)
				let newTabName = ++this.tabIndex + '';
				this.editableTabs.push({
					title: 'New Tab',
					name: newTabName,
					content: User
				});
				this.editableTabsValue = newTabName;
			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
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
			}
		}
	}
</script>

<style>
	.el-tabs {
		height: 100% !important;
		box-sizing: border-box;
		border: none;
		position: relative;
		padding-top: 38px;
	}
	
	.el-tabs .el-tabs__new-tab {
		box-sizing: border-box;
		margin-top: 11px;
	}
	
	.el-tabs .el-tabs__header {
		position: absolute;
		width: 100%;
		top: 0px;
		border-top: 1px solid #e4e7ed;
	}
	
	.el-tabs .el-tabs__content {
		height: 100%;
		padding: 0;
		overflow: auto;
	}
</style>
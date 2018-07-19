<template>
	<div id="main-tab">
		<el-tabs ref="tabs" v-model="tables.selectTable" type="border-card" @tab-remove="removeTab" @tab-click="selectTab">
			<el-tab-pane :key="item.name" v-for="(item, index) in tables.tables" :closable="item.closable" :name="item.index">
				<!--<component :is="item.content"></component>-->
				<span slot="label"><i :class="item.icon"></i> {{item.title}}</span>
			</el-tab-pane>
		</el-tabs>
		<div id="main-body" :style="mainBodyStyle">
			<el-scrollbar :vertical="vertical" :noresize="false" :viewStyle="{padding:'10px 10px'}">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</el-scrollbar>
		</div>
	</div>
</template>

<style>
	#main-body {
		min-height: 100px;
	}
	.el-scrollbar{
		
		height: 100%;
	}
	.el-scrollbar__wrap {
		overflow-x: hidden !important;
	}
	
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
	
	.el-tabs__nav-next,
	.el-tabs__nav-prev {
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
		padding: 0 !important;
		overflow: auto;
	}
</style>

<script>
	import { mapState } from 'vuex'
	const urlLocatoin = '#/'
	export default {
		name: 'index-main',
		data() {
			return {
				vertical: true,
				mainBodyStyle: {
					height: 100 + 'px'
				}
			}
		},
		mounted: function() {
			this.$nextTick(function(d) {
				let timers = null
				let that = this
				//				window.onresize = function() {
				//					if(timers) {
				//						clearTimeout(timers)
				//					}
				//					timers = setTimeout(function() {
				//						that.resize()
				//						console.log('resize-end')
				//					}, 1000)
				//				}
				this.resize()
			})
		},
		computed: {
			...mapState({
				tables: state => state.tables,
				routerArr: state => state.routerArr
			}),
		},
		methods: {
			resize: function() {
				let parent = document.getElementById('main-tab').parentNode
				let getComputedStyles = (document.defaultView.getComputedStyle || window.getComputedStyle || function(el) {
					return el.currentStyle
				})

				let parentH = parent.clientHeight //parseFloat(getComputedStyles(parent).height)
				let parentPadT = parseFloat(getComputedStyles(parent).paddingTop)
				let parentPadB = parseFloat(getComputedStyles(parent).paddingBottom)
				let height = parentH - parentPadT - parentPadB - 40
				//console.log(parent.clientHeight,parentPadT,parentPadB,height)
				this.mainBodyStyle.height = height + 'px'
			},
			selectTab: function(tab) {
				let tbI = tab.index
				let tbN = tab.name
				let tabPN = tab.paneName
				let tabTitle = tab.label
				this.$store.commit({
					type: 'setRouterIndex',
					url: tbN,
					urlLocatoin: urlLocatoin
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
					urlLocatoin: urlLocatoin
				})

				this.$store.commit({
					type: 'removeRouterArr',
					routerArr: this.routerArr.filter(tab => tab !== name),
				})

			}
		}
	}
</script>
<template>
	<div id="main-tab">
		<el-scrollbar ref="elScrollbar" :vertical="false" :noresize="false" :viewStyle="{padding:'10px 10px'}">
			<el-tabs ref="tabs" v-model="active" type="border-card" @tab-remove="removeTab" @tab-click="selectTab">
				<el-tab-pane :key="item.index" v-if="item.index" v-for="(item, index) in mainView" :closable="item.closable" :name="item.index">
					<component :is="item.content"></component>
					<span slot="label"><i :class="item.icon"></i> {{item.title}}</span>
				</el-tab-pane>
			</el-tabs>
		</el-scrollbar>
		<!--<div id="main-body" :style="mainBodyStyle">
			<el-scrollbar ref="elScrollbar" :vertical="false" :noresize="false" :viewStyle="{padding:'10px 10px'}">
				<keep-alive :include="cache">
					<router-view></router-view>
				</keep-alive>
			</el-scrollbar>
		</div>-->
	</div>
</template>

<style>
	#main-tab {
		height: 100%;
		/*background-color: gold;*/
		overflow: hidden;
	}
	
	#main-body {
		height: 100%;
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
		/*height: 0px;*/
		/*padding: 0 !important;*/
		overflow: auto;
	}
	
	.el-scrollbar {
		height: 100%;
	}
	
	.el-scrollbar__wrap {
		overflow-x: hidden !important;
	}
</style>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'index-main',
		data() {
			return {
				vertical: true,
				cache: [], //缓存页面,匹配组件的name
				mainBodyStyle: {
					height: '100%'
				},
			}
		},
		mounted: function() {
			//			this.$nextTick(function(d) {
			//				let timers = null
			//				let that = this
			//
			//				function resizeMains() {
			//					that.resizeMain()
			//				}
			//				window.addEventListener('resize', function() {
			//					if(timers) {
			//						clearTimeout(timers)
			//					}
			//					timers = setTimeout(that.resizeMain, 1000)
			//				})
			//
			//				setTimeout(function() {
			//					resizeMains()
			//				}, 1000)
			//			})
		},
		computed: {
			//			mainView: { //state => state.active
			//				set: function(val) {
			//					this.$store.commit({
			//						type: 'setMainView',
			//						mainView: val
			//					})
			//				},
			//				get: function() {
			//					return this.$store.state.mainView
			//				}
			//			},
			...mapState({
				mainView: state => state.mainView,
				//historyMainView: state => state.historyMainView
			}),
			active: { //state => state.active
				set: function(val) {},
				get: function() {
					return this.$store.state.active
				}
			}
		},
		watch: {
			//			$route: function(to, from) {
			//				//console.log("$route：", to)
			//				let open_item = null //取出mainView 与to.path相等的
			//				//设置keep-alive,页面缓存
			//				this.cache = this.mainView.map(function(item) {
			//					if(item.index == to.path) {
			//						open_item = item
			//					}
			//					return item.index.substring(1)
			//				})
			//				//从历史路由内取出单个路由记录
			//				if(!open_item) {
			//					let dt = null;
			//					this.historyMainView.forEach(function(item) {
			//						if(item.index == to.path) {
			//							dt = item
			//						}
			//					})
			//					if(dt) {
			//						this.$store.commit({
			//							type: 'openRoute',
			//							//router: this.$router,
			//							dt: dt
			//						})
			//					}
			//
			//				} else { //已经打开了就切换
			//					this.$store.commit({
			//						type: 'setActive',
			//						active: to.path,
			//						//router: this.$router
			//					})
			//
			//				}
			//				//console.log(this.cache)
			//			}
		},
		methods: {
			resizeMain: function() {
				//let main_tab = document.getElementById('main-tab')
				//let main_tab_height = main_tab.clientHeight
				//let el_tabs_height = document.getElementsByClassName('el-tabs')[0].clientHeight
				//let main_table_el_scrollbar = this.$refs.elScrollbar[0].$el
				//console.log(main_tab_height - el_tabs_height)
				//main_table_el_scrollbar.style.height = main_tab_height + 'px'

				//console.log(main_table_el_scrollbar.style.height)
			},
			selectTab: function(tab) {
				let tbI = tab.index
				let tbN = tab.name
				let tabPN = tab.paneName
				let tabTitle = tab.label

				//console.log('selectTab:', tbI, ':-----', tbN, '----', tabPN, '----', tabTitle)
				this.$store.commit({
					type: 'setActive',
					active: tbN,
					//router: this.$router
				})
			},
			removeTab: function(name) {
				console.log('remove:', name)

				let tabs = this.mainView;
				let activeName = this.active;
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
					type: 'setActive',
					active: activeName,
					//router: this.$router
				})

				//router.push
				this.$store.commit({
					type: 'setMainView',
					mainView: tabs.filter(tab => tab.index !== name)
				})
			}
		}
	}
</script>
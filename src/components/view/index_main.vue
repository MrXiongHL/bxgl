<template>
	<div id="main-tab">
		<!--<el-tabs ref="tabs" v-model="tables.selectTable" type="border-card" @tab-remove="removeTab" @tab-click="selectTab">
			<el-tab-pane :key="item.name" v-for="(item, index) in tables.tables" :closable="item.closable" :name="item.index">-->
		<!--<component :is="item.content"></component>-->
		<!--<span slot="label"><i :class="item.icon"></i> {{item.title}}</span>
			</el-tab-pane>
		</el-tabs>-->
		<div id="main-body" :style="mainBodyStyle">
			<keep-alive :include="cache">
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<style>
	#main-body {
		height: 100%;
		/*background-color: gold;*/
		overflow: hidden;
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
				cache: [], //缓存页面
				mainBodyStyle: {
					height: 100 + 'px'
				}
			}
		},
		mounted: function() {
			this.$nextTick(function(d) {
				let timers = null
				let that = this

				function resizeMains() {
					that.resizeMain()
				}
				window.addEventListener('resize', function() {
					if(timers) {
						clearTimeout(timers)
					}
					timers = setTimeout(that.resizeMain, 1000)
				})
				
				resizeMains()
			})
		},
		computed: {
			...mapState({}),
		},
		watch: {
			$route: function(to, from) {
				console.log("matched：", this.$route.matched)
			}
		},
		methods: {
			resizeMain: function() {
				let parent = document.getElementById('main-tab').parentNode
				console.log(parent.style.paddingTop)
				let getComputedStyles = (document.defaultView.getComputedStyle || window.getComputedStyle || function(el) {
					return el.currentStyle
				})

				let parentH = parent.clientHeight //parseFloat(getComputedStyles(parent).height)
				let parentPadT = parseFloat(getComputedStyles(parent).paddingTop) ||
					document.getElementsByClassName('indexHeader')[0].clientHeight
				let parentPadB = parseFloat(getComputedStyles(parent).paddingBottom)||
					document.getElementsByClassName('indexFooter')[0].clientHeight
				let height = parentH - parentPadT - parentPadB
				console.log(parent.clientHeight, parentPadT, parentPadB, height)
				this.mainBodyStyle.height = height + 'px'
			},
			selectTab: function(tab) {
				let tbI = tab.index
				let tbN = tab.name
				let tabPN = tab.paneName
				let tabTitle = tab.label
				console.log('selectTab:', tbI, ':-----', tbN, '----', tabPN, '----', tabTitle)
			},
			removeTab: function(name) {
				console.log('remove:', name)

			}
		}
	}
</script>
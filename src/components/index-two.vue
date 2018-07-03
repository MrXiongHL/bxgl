<template>
	<div class="indexContainer" v-title :data-title="title">
		<div class="indexHeader">
			<!--other-view-->
			indexHeader
		</div>
		<div class="indexAside" :style="{width:widths,paddingTop:paddingTops}">
			<el-scrollbar :vertical="vertical">
				<div v-show="!show" class="el-aside-root">
					<div>
						<!--other-view-->
						<index-aside></index-aside>
					</div>
					<div class="elAsideBorder" id="elAsideBorder" v-move="{funcs:changeW,minWidth:minWidth,isChangeWH:true}" v-changeWH="changeWHCursor"></div>
				</div>
			</el-scrollbar>
			<div :width="minWidth" v-show="show" @click="changeWidth" class="el-aside-show">
				<i class="icons el-icon-caret-right"></i>
			</div>
		</div>
		<div class="indexMain" :style="{paddingLeft:paddingLefts,paddingTop:paddingTops,paddingBottom:paddingBottoms}">
			<!--other-view-->
			<router-view></router-view>
		</div>
		<div class="indexFooter" :style="{paddingLeft:paddingLefts}">
			<!--other-view-->
			indexFooter
		</div>
	</div>
</template>

<script>
	import TablePanel from './view/index_main';
	import IndexAside from './view/index_aside';
	export default {
		name: 'index-two',
		data() {
			let widths = '240px'
			let tops = '55px'
			return {
				title: '首页',
				show: false,
				widths: widths,
				defWidth: widths,
				minWidth: widths,
				paddingLefts: widths,
				paddingTops: tops,
				paddingBottoms: '40px',
				changeWHCursor: {
					cursor: 'e-resize',
					default: 'default'
				},
				vertical: true,
			}
		},
		components: {
			'table-panel': TablePanel,
			'index-aside': IndexAside,
		},
		created: function() {},
		watch: {
			$route: function(to, from) { //监听页面路径
				let nameArr = to.path.split('/')
				let name = nameArr[nameArr.length - 1]
				let historyTables = this.$store.state.historyTables;
				let dt = historyTables.filter(arr => arr.index == name)[0]
				console.log(dt, '----tables-dt')
				this.$store.commit({
					type: 'setRouterIndex',
					url: name,
					urlLocatoin: '#/index/'
				})
				if(dt) {
					this.$store.commit({
						type: 'setRouterArr',
						mainUrl: 'index',
						router: this.$router,
						urlLocatoin: '#/index/',
						dt: {
							title: dt.title,
							index: dt.index,
							content: '',
							closable: true
						}
					})
				}
			}
		},
		methods: {
			changeWidth: function() {
				this.$nextTick(function() {
					this.show = !this.show
					this.widths = (this.widths === this.minWidth ? this.defWidth : this.minWidth)
					this.paddingLefts = this.widths;
				})

			},
			changeW: function(dt) {
				//console.log(this.widths, parseInt(dt.width));
				this.widths = dt.width;
				this.paddingLefts = this.widths;
			}
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}
	
	div.indexContainer {
		width: 100%;
		height: 100%;
		/*overflow: hidden;*/
	}
	
	div.indexContainer,
	div.indexHeader,
	div.indexAside,
	div.indexMain,
	div.indexFooter {
		position: relative;
		overflow-x: hidden;
	}
	
	div.indexHeader {
		position: absolute;
		width: 100%;
		z-index: 9;
		top: 0px;
		height: 55px;
		/*background-color: gainsboro;*/
		text-align: center;
		line-height: 55px;
	}
	
	div.indexAside {
		position: absolute;
		top: 0px;
		z-index: 8;
		height: 100%;
		/*border-right: 1px solid darkgray;*/
		/*background-color: gainsboro;*/
		overflow: hidden;
	}
	
	div.indexAside .elAsideBorder {
		position: absolute;
		width: 16px;
		height: 100%;
		right: 0;
		top: 0px;
		/*background-color: gold;*/
	}
	
	div.indexAside .el-scrollbar {
		height: 100%;
	}
	
	div.indexAside .el-scrollbar__wrap {
		overflow-x: hidden;
	}
	
	div.indexAside .el-aside-root {
		height: 100%;
		width: 100%;
		position: relative;
	}
	
	div.indexAside .el-aside-show {
		height: 100%;
	}
	
	div.indexAside .icons.el-icon-caret-right {
		color: gray;
		font-size: 20px;
		position: relative;
		top: 50%;
		margin-top: -10px;
	}
	
	div.indexMain {
		position: absolute;
		z-index: 7;
		height: 100%;
		width: 100%;
		/*padding-left: 200px;
		padding-top: 55px;*/
		/*border-left: 200px solid transparent;
		border-top: 55px solid transparent;*/
	}
	
	div.indexFooter {
		position: absolute;
		z-index: 7;
		bottom: 0px;
		width: 100%;
		height: 40px;
		/*border-left: 200px solid transparent;*/
		/*padding-left: 200px;*/
		text-align: center;
		line-height: 40px;
		/*background-color: gainsboro;*/
	}
</style>
<template>
	<div class="indexContainer" v-title :data-title="title">
		<div class="indexHeader" :style="{paddingLeft:paddingLefts}">
			<!--other-view-->
			indexHeader
		</div>
		<div class="indexAside" :style="{width:asideClose ? asideMinWidth:widths,paddingTop:'0px'}">
			<el-scrollbar :vertical="vertical">
				<div class="el-aside-root">
					<div>
						<!--other-view-->
						<index-aside></index-aside>
					</div>
					<div class="elAsideBorder" v-show="!asideClose" id="elAsideBorder" v-move="{funcs:changeW,minWidth:minWidth,isChangeWH:isChangeWH}" v-changeWH="changeWHCursor"></div>
				</div>
			</el-scrollbar>
		</div>
		<div class="indexMain" :style="{paddingLeft:asideClose ? asideMinWidth:paddingLefts ,paddingTop:paddingTops,paddingBottom:paddingBottoms}">
			<!--other-view-->
			<!--<router-view></router-view>-->
			<index-main></index-main>
		</div>
		<div class="indexFooter" :style="{paddingLeft:asideClose ? asideMinWidth:paddingLefts }">
			<!--other-view-->
			indexFooter
		</div>
	</div>
</template>

<script>
	import IndexMain from './view/index_main'
	import IndexAside from './view/index_aside'

	import { mapState } from 'vuex'
	export default {
		name: 'index-two',
		data() {
			let widths = '240px'
			let asideMinWidth = '63px'
			let tops = '55px'
			return {
				title: '首页',
				widths: widths,
				defWidth: widths,
				minWidth: widths,
				paddingLefts: widths,
				paddingTops: tops,
				asideMinWidth: asideMinWidth,
				paddingBottoms: '40px',
				changeWHCursor: {
					cursors: 'e-resize',
					defaults: 'default'
				},
				isChangeWH: true, //是否可以拖动
				vertical: true,
			}
		},
		computed: {
			...mapState({
				asideClose: state => state.asideClose
			})
		},
		components: {
			'index-main': IndexMain,
			'index-aside': IndexAside,
		},
		created: function() {},

		methods: {
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
		z-index: 10;
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
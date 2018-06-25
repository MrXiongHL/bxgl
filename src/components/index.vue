<template>
	<el-container v-title :data-title="title">
		<el-header>
			<div class="el-header-root">
				<!--other-view-->
			</div>
		</el-header>
		<el-container>
			<el-aside :width="width">
				<div v-show="!show" class="el-aside-root" @click="changeWidth">
					<!--other-view-->
				</div>
				<div :width="minWidth" v-show="show" @click="changeWidth" class="el-aside-show">
					<i class="icons el-icon-caret-right"></i>
				</div>
			</el-aside>
			<el-container>
				<el-main>
					<div class="el-main-root">
						<!--other-view-->
						<table-panel></table-panel>
						
					</div>
				</el-main>
				<el-footer>
					<div class="el-footer-root">
						<!--other-view-->
					</div>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	import TablePanel from './view/index_main';
	export default {
		name: 'index',
		data() {
			return {
				title: '首页',
				show: false,
				width: '200px',
				defWidth: '200px',
				minWidth: '20px',
			}
		},
		components:{
			'table-panel':TablePanel,
		},
		created: function() {

		},
		methods: {
			changeWidth: function() {
				this.$nextTick(function() {
					this.show = !this.show
					this.width = (this.width === this.minWidth ? this.defWidth : this.minWidth)
				})

			}
		}
	}
</script>

<style>
	* {
		word-break: break-all;
	}
	
	.el-container {
		/*background-color: gold;*/
		width: 100%;
		height: 100%;
	}
	
	.el-header {
		background-color: goldenrod;
		padding: 0px !important;
		height: 60px !important;
	}
	
	.el-aside {
		height: 100%;
	}
	
	.el-aside .el-aside-root {
		height: 100%;
		position: relative;
	}
	
	.el-aside .el-aside-show {
		height: 100%;
	}
	
	.el-aside .icons.el-icon-caret-right {
		color: gray;
		font-size: 20px;
		position: relative;
		top: 50%;
		margin-top: -10px;
	}
	
	.el-main {
		padding: 0px !important;
	}
	
	.el-main-root {
		width: 100% !important;
	}
	
	.el-footer {
		padding: 0px !important;
		background-color: grey;
		height: 40px !important;
	}
</style>
<template>
	<div id="asideDiv">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
		<el-menu default-active="1-4-1" text-color="#ffffff" class="el-menu-vertical-demo" @open="handleOpen" @select="selectItem" @close="handleClose" :collapse="isCollapse">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">导航一</span>
				</template>
				<el-menu-item-group>
					<span slot="title">分组一</span>
					<el-menu-item index="1-1">选项1</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<span slot="title">选项4</span>
					<el-menu-item index="1-4-1">选项1</el-menu-item>

					<el-submenu index="1-4-1">
						<span slot="title">选项4</span>
						<el-menu-item index="1-4-12">选项1</el-menu-item>
					</el-submenu>
				</el-submenu>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">导航2</span>
				</template>
				<el-menu-item-group title='分组'>
					<!--<compnent :is="item.component" :dt="item" :key="item.index" v-for="item in view"></compnent>-->
				</el-menu-item-group>
			</el-submenu>
			<compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in view"></compnent>
		</el-menu>
	</div>
</template>

<style>
	#asideDiv {
		/*padding: 10px 15px;*/
	}
	
	.el-menu {
		background-color: black;
		/*border: none;*/
	}
	.el-submenu__icon-arrow{
		margin-top: -3px;
	}
</style>

<script>
	import dt from '../../router/menu_item'

	const elItem = {
		props: ['dt'],
		template: '<el-menu-item :key="dt.index" :index="dt.index">{{dt.title}}</el-menu-item>'
	}

	const elGroup = {
		props: ['children', 'dt'],
		template: '<el-submenu :key="dt.index" :index="dt.index"><template slot="title"><i class="el-icon-location"></i><span slot="title">{{dt.title}}</span></template><compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in children"></compnent></el-submenu>'
	}

	export default {
		name: 'index-aside',
		data() {
			return {
				isCollapse: false,
				view: []
			}
		},
		created: function() {
			//			this.view = {
			//				template:''
			//			}
			let children = [{
				title: '组建1',
				index: '/dt',
				component: elGroup,
				children: [{
					title: '组建1-1',
					index: '/dts-1',
					component: elItem,
					children: []
				}, {
					title: '组建1-2',
					index: '/dts-2',
					component: elItem
				}, {
					title: '组建1-3-1-group',
					index: '/dtst1-3-1',
					component: elGroup,
					children: [{
						title: '组建1-3-1-1',
						index: '/dts1-3-1-1',
						component: elItem,
					}, {
						title: '组建1-3-1-2',
						index: '/dts1-3-1-2',
						component: elItem
					}, {
						title: '组建1-3-1-1-group',
						index: '/dtst1-3-1-3-1',
						component: elGroup,
						children: [{
							title: '组建1-3-1-1-1',
							index: '/dts1-3-1-1-1',
							component: elItem,
						}, {
							title: '组建1-3-1-1-2',
							index: '/dts1-3-1-1-2',
							component: elItem
						}, {
							title: '组建1-3-1-1-3',
							index: '/dtst1-3-1-1-3',
							component: elItem
						}]
					}, {
						title: '组建1-3-1-2-group',
						index: '/dtst1-3-1-3-2',
						component: elGroup,
						children: [{
							title: '组建1-3-1-2-1',
							index: '/dts1-3-1-2-1',
							component: elItem,
						}, {
							title: '组建1-3-1-2-2',
							index: '/dts1-3-1-2-2',
							component: elItem
						}, {
							title: '组建1-3-1-2-3',
							index: '/dtst1-3-1-2-3',
							component: elItem
						}]
					}]
				}, {
					title: '组建1-3-2-group',
					index: '/dtst-3-2-3',
					component: elGroup,
					children: [{
						title: '组建1-3-2-1',
						index: '/dts1-3-2-1',
						component: elItem,
					}, {
						title: '组建1-3-2-1-2',
						index: '/dts1-3-2-1-2',
						component: elItem
					}, {
						title: '组建1-3-2-1-3',
						index: '/dts1-3-2-1-3',
						component: elItem
					}]
				}]
			}, {
				title: '组建2',
				index: '/dts',
				component: elItem
			}, {
				title: '组建3',
				index: '/dtst',
				component: elGroup
			}]

			this.view = this.view.concat(children)
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			hideMenu() {
				console.log('d');
				this.isCollapse = true;
			},
			selectItem(index, indexPath) {
				console.log(index, indexPath)
			}
		}
	}
</script>
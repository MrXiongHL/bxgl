<template>
	<div id="asideDiv">
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" :default-active="selectTable" @select="selectItem" @close="handleClose" :collapse="asideClose">
			<compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in view"></compnent>
		</el-menu>
	</div>
</template>

<style>
	#asideDiv {
		/*padding: 10px 15px;*/
	}
	
	.el-menu {
		/*background-color: black;*/
		/* text-color="#ffffff"*/
		/*border: none;*/
	}
	
	.el-submenu__icon-arrow {
		margin-top: -3px;
	}
</style>

<script>
	const elItem = {
		props: ['dt'],
		template: '<el-menu-item :key="dt.index" :index="dt.index">{{dt.title}}</el-menu-item>'
	}

	const elGroup = {
		props: ['children', 'dt'],
		template: '<el-submenu :key="dt.index" :index="dt.index"><template slot="title"><i class="el-icon-location"></i><span slot="title">{{dt.title}}</span></template><compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in children"></compnent></el-submenu>'
	}

	import { mapState } from 'vuex'
	export default {
		name: 'index-aside',
		data() {
			return {
				view: []
			}
		},
		computed: {
			...mapState({
				selectTable: state => state.tables.selectTable,
				asideClose: state => state.asideClose
			}),
		},
		created: function() {
			//index与router-path对应
			let children = [{
				title: '组建1',
				index: 'dt',
				component: elGroup,
				children: [{
					title: '组建1-1',
					index: 'main_helloworld',
					component: elItem,
					children: []
				}, {
					title: '组建1-2',
					index: 'main_dd',
					component: elItem
				}, {
					title: '组建1-3-1-group',
					index: 'dtst1-3-1',
					component: elGroup,
					children: [{
						title: '组建1-3-1-1',
						index: 'dts1-3-1-1',
						component: elItem,
					}, {
						title: '组建1-3-1-2',
						index: 'dts1-3-1-2',
						component: elItem
					}, {
						title: '组建1-3-1-1-group',
						index: 'dtst1-3-1-3-1',
						component: elGroup,
						children: [{
							title: '组建1-3-1-1-1',
							index: 'dts1-3-1-1-1',
							component: elItem,
						}, {
							title: '组建1-3-1-1-2',
							index: 'dts1-3-1-1-2',
							component: elItem
						}, {
							title: '组建1-3-1-1-3',
							index: 'dtst1-3-1-1-3',
							component: elItem
						}]
					}, {
						title: '组建1-3-1-2-group',
						index: 'dtst1-3-1-3-2',
						component: elGroup,
						children: [{
							title: '组建1-3-1-2-1',
							index: 'dts1-3-1-2-1',
							component: elItem,
						}, {
							title: '组建1-3-1-2-2',
							index: 'dts1-3-1-2-2',
							component: elItem
						}, {
							title: '组建1-3-1-2-3',
							index: 'dtst1-3-1-2-3',
							component: elItem
						}]
					}]
				}, {
					title: '组建1-3-2-group',
					index: 'dtst-3-2-3',
					component: elGroup,
					children: [{
						title: '组建1-3-2-1',
						index: 'dts1-3-2-1',
						component: elItem,
					}, {
						title: '组建1-3-2-1-2',
						index: 'dts1-3-2-1-2',
						component: elItem
					}, {
						title: '组建1-3-2-1-3',
						index: 'dts1-3-2-1-3',
						component: elItem
					}]
				}]
			}, {
				title: '组建2',
				index: 'main_index',
				component: elItem
			}, {
				title: '组建3',
				index: 'dtst',
				component: elGroup
			}]

			this.view = this.view.concat(children)

			//setdefault
			let routerIndex = 'main_index'
			this.$store.commit({
				type: 'setDefault',
				routerIndex: routerIndex,
				routerArr: [routerIndex],
				selectTable: routerIndex,
				tables: [{
					title: '首页',
					index: routerIndex,
					closable: false
				}],
			})

		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			selectItem(index, indexPath, vm) {
				//console.log("选中", index, indexPath, vm.$el.innerText)
				this.$store.commit({
					type: 'setRouterArr',
					mainUrl: 'index',
					url: index,
					router: this.$router,
					title: vm.$el.innerText,
					urlLocatoin: '#/index/'
				})
			}
		}
	}
</script>
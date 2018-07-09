<template>
	<div id="asideDiv">
		<el-menu class="el-menu-vertical-demo" @open="handleOpen" :default-active="selectTable" @select="selectItem" @close="handleClose" :collapse="asideClose">
			<compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in view"></compnent>
		</el-menu>
	</div>
</template>

<style>
	@import '//at.alicdn.com/t/font_714904_6of8rolg39x.css';
	#asideDiv {
		/*padding: 10px 15px;*/
	}
	
	.el-menu {
		/*background-color: black;*/
		/* text-color="#ffffff"*/
		/*border: none;*/
	}
	
	.el-menu .iconfont {
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
		width: 24px;
		text-align: center;
		font-size: 18px;
	}
	
	.el-submenu__icon-arrow {
		margin-top: -3px;
	}
</style>

<script>
	const elItem = {
		props: ['dt'],
		template: '<el-menu-item :key="dt.index" :index="dt.index"><i :class="dt.icon"></i>{{dt.title}}</el-menu-item>'
	}

	const elGroup = {
		props: ['children', 'dt'],
		template: '<el-submenu :key="dt.index" :index="dt.index"><template slot="title"><i class="el-icon-tickets"></i><span slot="title">{{dt.title}}</span></template><compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in children"></compnent></el-submenu>'
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
				title: '首页',
				index: 'main_index',
				icon: 'iconfont icon-yemian',
				component: elItem
			}, {
				title: '组建1',
				index: 'dt',
				component: elGroup,
				icon: 'iconfont icon-yemian',
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
							icon: '',
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
				title: '组建3',
				index: 'dtst',
				component: elGroup
			}]

			this.view = this.view.concat(children)

			//setdefault
			let routerIndex = 'main_index'
			this.$store.commit({
				type: 'setDefault',
				routerArr: [routerIndex],
				selectTable: routerIndex,
				tables: [{
					title: '首页',
					index: routerIndex,
					closable: false
				}],
			})
			//初始访问首页
			this.$store.commit({
				type: 'setRouterArr',
				dt: {
					title: '首页',
					index: routerIndex,
					content: '',
					closable: false,
					isFirst: true,
				},
				urlLocatoin: '#/index/'
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
					router: this.$router,
					urlLocatoin: '#/index/',
					dt: {
						title: vm.$el.innerText,
						index: index,
						content: '',
						closable: true
					}
				})
			}
		}
	}
</script>
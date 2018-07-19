<template>
	<div id="asideDiv">
		<el-button @click="closeElMenu" class="el-button--primary">close</el-button>
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
		border: none !important;
	}
	
	.el-menu i.iconfont,
	.el-menu i {
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
		width: 24px !important;
		text-align: center;
		font-size: inherit !important;
	}
	
	.el-menu--collapse>.el-menu-item.is-active i {
		/*color: gold;*/
	}
	
	.el-submenu__icon-arrow {
		margin-top: -3px !important;
	}
	
	.el-menu--collapse .el-menu .el-submenu,
	.el-menu--popup {
		min-width: 220px !important;
	}
</style>

<script>
	const elItem = {
		props: ['dt'],
		//		template: `<el-menu-item :key="dt.index" :index="dt.index">
		//			    <i :class="dt.icon"></i>
		//		   		<template slot="title">
		//			      	<span slot="title">{{dt.title}}</span>
		//		      	</template>
		//		   	</el-menu-item>`,
		render: function(r) {
			let dt = this.dt
			return r('el-menu-item', {
				attrs: {
					key: dt.index,
					index: dt.index
				}
			}, [
				r('i', {
					class: dt.icon
				}),
				r('template', {
					slot: 'title',
				}, [
					r('span', {
						slot: 'title',
						attrs: {
							dt: 'title'
						},
						domProps: {
							innerHTML: dt.title
						},
					})
				])
			])
		}
	}

	const elGroup = {
		props: ['children', 'dt'],
		template: `	<el-submenu :key="dt.index" :index="dt.index">
						<template slot="title">
							<i class="el-icon-tickets"></i>
							<span slot="title">{{dt.title}}</span>
						</template>
						<compnent :is="item.component" :dt="item" :children="item.children" :key="item.index" v-for="item in children"></compnent>
				   	</el-submenu>`
	}

	import { mapState } from 'vuex'
	
	const urlLocatoin = '#/'
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
				asideClose: state => state.asideClose,
				historyTables: state => state.historyTables
			}),
		},
		watch: {
			$route: function(to, from) { //监听页面路径
				let nameArr = to.path.split('/')
				let name = nameArr[nameArr.length - 1]
				if(name === '') {
					name = 'main_index'
				}
				let historyTables = this.historyTables;
				let dt = historyTables.filter(arr => arr.index == name)[0]
				//console.log(dt)
				this.$store.commit({
					type: 'setRouterIndex',
					url: name,
					urlLocatoin: urlLocatoin
				})
				if(dt) {
					this.$store.commit({
						type: 'setRouterArr',
						mainUrl: '',
						router: this.$router,
						urlLocatoin: urlLocatoin,
						dt: {
							title: dt.title,
							index: dt.index,
							content: dt.content,
							icon: dt.icon,
							closable: dt.closable
						}
					})
				}
			}
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
					icon: 'iconfont icon-yemian',
					component: elItem
				}, {
					title: '组建1-3-1-group',
					index: 'dtst1-3-1',
					component: elGroup,
					children: [{
						title: '组建1-3-1-1',
						index: 'dts1-3-1-1',
						icon: 'iconfont icon-open-panel',
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
							icon: 'iconfont icon-yonghu',
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
							icon: 'iconfont icon-mimaicon',
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
					icon: 'iconfont icon-yemian',
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
					icon: 'iconfont icon-yemian',
					closable: false,
					isFirst: true,
				},
				urlLocatoin: urlLocatoin
			})

		},
		methods: {
			closeElMenu() {
				this.$store.commit({
					type: 'setAsideClose',
					asideClose: !this.asideClose
				})
				//change-theme

			},
			handleOpen(key, keyPath) { //console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			selectItem(index, indexPath, vm) {
				//				console.log("选中", index, indexPath, vm.$el.querySelector('i').getAttribute('class'))
				let icons = vm.$el.querySelector('i').getAttribute('class')
				this.$store.commit({
					type: 'setRouterArr',
					mainUrl: '',
					router: this.$router,
					urlLocatoin: urlLocatoin,
					dt: {
						title: vm.$el.innerText,
						index: index,
						content: '',
						icon: icons,
						closable: true
					}
				})
			}
		}
	}
</script>
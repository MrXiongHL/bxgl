<template>
	<div id="asideDiv">
		<el-button @click="closeElMenu" class="el-button--primary">close</el-button>
		<el-menu class="el-menu-vertical-demo" @open="handleOpen" :default-active="activeItem" @select="selectItem" @close="handleClose" :collapse="asideClose">
			<compnent :is="item.component" :dt="item" :children="item.children" :key="item.path" v-for="item in view"></compnent>
		</el-menu>
	</div>
</template>

<style>
	@import '//at.alicdn.com/t/font_714904_6of8rolg39x.css';
	#asideDiv {
		/*padding: 10px 15px;*/
		/*background-color: goldenrod;*/
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
		//		template: `<el-menu-item :key="dt.path" :index="dt.path">
		//			    <i :class="dt.icon"></i>
		//		   		<template slot="title">
		//			      	<span slot="title">{{dt.title}}</span>
		//		      	</template>
		//		   	</el-menu-item>`,
		render: function(r) {
			let dt = this.dt
			return r('el-menu-item', {
				attrs: {
					key: dt.path,
					index: dt.path
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
							innerHTML: dt.name
						},
					})
				])
			])
		}
	}

	const elGroup = {
		props: ['children', 'dt'],
		template: `	<el-submenu :key="dt.path" :index="dt.path">
						<template slot="title">
							<i :class="dt.icon"></i>
							<span slot="title">{{dt.name}}</span>
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
				asideClose: state => state.asideClose,
				activeItem: state => state.active
			}),
		},
		created: function() {
			this.view = [{
				path: '/main_index',
				name: '首页',
				icon: 'el-icon-loading',
				component: elItem,
			}, {
				path: '/item',
				name: '菜单',
				component: elGroup,
				children: [{
					path: '/main_index2',
					name: 'main_index2',
					component: elItem
				}, {
					path: '/main_helloworld',
					name: 'main_helloworld3',
					component: elItem
				}]

			}]
			console.log(this.$router.options.routes)
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
				console.log("选中", index, indexPath, vm.$el.getElementsByTagName('i')[0].getAttribute('class'))
				let icons = vm.$el.getElementsByTagName('i')[0].getAttribute('class')
				this.$router.push({
					path: index,
					query: {
						dt: 'dd'
					}
				})
				//				this.$store.commit({
				//					type: 'setRouterArr',
				//					mainUrl: '',
				//					router: this.$router,
				//					urlLocatoin: urlLocatoin,
				//					dt: {
				//						title: vm.$el.innerText,
				//						index: index,
				//						content: '',
				//						icon: icons,
				//						closable: true
				//					}
				//				})
			}
		}
	}
</script>
import Vue from 'vue'
import Router from 'vue-router'

//const Login = resolve => require(['@/components/login'], resolve)
//const Index = resolve => require(['@/components/index'], resolve)
//const Index_main = resolve => require(['@/components/view/index_main'], resolve)
//const NoFile404 = resolve => require(['@/components/404'], resolve)
//
////main页面
//const MainIndex = resolve => require(['@/components/view/main/index'], resolve)
//const MainHelloWorld = resolve => require(['@/components/view/main/helloWorld'], resolve)

const Login = r => require.ensure([], () => r(require('@/components/login')), 'login');
const Index = r => require.ensure([], () => r(require('@/components/index')), 'index');
//const Index_main = r => require.ensure([], () => r(require('@/components/view/index_main')), 'index_main');

const NoFile404 = r => require.ensure([], () => r(require('@/components/404')), 'NoFile404');
//const MainIndex = r => require.ensure([], () => r(require('@/components/view/main/index')), 'main_index');
//const MainHelloWorld = r => require.ensure([], () => r(require('@/components/view/main/helloWorld')), 'main_hello_world');

Vue.use(Router)

export default new Router({
	//mode: 'history',
	routes: [{
		path: '/',
		name: 'index',
		component: Index,
		//		children: [{
		//			path: '/main_index',
		//			name: 'main_index',
		//			component: MainIndex
		//		}, {
		//			path: '/main_index2',
		//			name: 'main_index2',
		//			component: MainIndex
		//		}, {
		//			path: '/main_helloworld',
		//			name: 'main_helloworld',
		//			component: MainHelloWorld
		//		}]

	}, {
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '*',
		name: 'nofile404',
		component: NoFile404
	}]
})
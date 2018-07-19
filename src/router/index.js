import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Login = resolve => require(['@/components/login'], resolve)
//const Index = resolve => require(['@/components/index'], resolve)
const Index = resolve => require(['@/components/index-two'], resolve)
const Index_main = resolve => require(['@/components/view/index_main'], resolve)
const NoFile404 = resolve => require(['@/components/404'], resolve)

//main页面
const MainIndex = resolve => require(['@/components/view/main/index'], resolve)
const MainHelloWorld = resolve => require(['@/components/view/main/helloWorld'], resolve)

Vue.use(Router)

export default new Router({
	//mode: 'history',
	routes: [{
		path: '/',
		name: 'index-two',
		component: Index,
		children: [{
			path: 'main_index',
			name: 'main_index1',
			component: MainIndex
		}, {
			path: 'main_index',
			name: 'main_index2',
			component: MainIndex
		}, {
			path: 'main_helloworld',
			name: 'main_helloworld',
			component: MainHelloWorld
		}, {
			path: '*',
			name: 'nofile404c',
			component: NoFile404
		}]

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
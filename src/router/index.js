import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Login = resolve => require(['@/components/login'], resolve)
//const Index = resolve => require(['@/components/index'], resolve)
const Index = resolve => require(['@/components/index-two'], resolve)
const Index_main = resolve => require(['@/components/view/index_main'], resolve)
const NoFile404 = resolve => require(['@/components/404'], resolve)

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'index1',
		component: Index
	}, {
		path: '/', 
		name: 'index2',
		component: Index,
		children: [{
			path: 'main/:url', 
			name: 'index_main',
			component: Index_main,
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
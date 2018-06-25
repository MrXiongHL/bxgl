import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Login = resolve => require(['@/components/login'], resolve)
const Index = resolve => require(['@/components/index'], resolve)
const Index2 = resolve => require(['@/components/index-two'], resolve)
const NoFile404 = resolve => require(['@/components/404'], resolve)

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'index1',
		component: Index
	}, {
		path: '/index',
		name: 'index2',
		component: Index
	},, {
		path: '/index2',
		name: 'index22',
		component: Index2
	},  {
		path: '/login',
		name: 'login',
		component: Login
	}, {
		path: '*',
		name: 'nofile404',
		component: NoFile404
	}]
})
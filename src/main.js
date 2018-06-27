// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import App from './App'
import VuexStore from './util/vuex_store'
import router from './router'

Vue.use(ElementUI);
//自定义指令
import './util/vue_directive'

Vue.config.productionTip = false
Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store: VuexStore,
	components: {
		App
	},
	template: '<App/>'
})
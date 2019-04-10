<template>

	<div id="sy-rooter">
		这是首页
		<el-input v-model='text' />
		<el-input v-model="text" />
		<div v-for="x in item" :key="x">
			{{x}}-div
		</div>
		<div>{{text}}</div>
		<audio id="myAudio" :src="src" controls>
		</audio>
	</div>
</template>

<style>

</style>

<script>
	export default {
		name: 'main_index',
		data() {
			let arr = Array.from({
				length: 100
			}, (v, k) => k)
			return {
				text: '',
				item: arr,
				src: '../../../static/eye1.mp3'
			}
		},
		watch: {},
		//		beforeRouteEnter(to, from, next) {
		//			// 在渲染该组件的对应路由被 confirm 前调用
		//			// 不！能！获取组件实例 `this`
		//			// 因为当守卫执行前，组件实例还没被创建
		//			
		//		},
		created: function() {
			console.log("params:", this.$route.query.dt)

		},
		mounted: function() {},
		methods: {
			conso: function(d) {
				console.log(d)
			}
		}
	}
</script>
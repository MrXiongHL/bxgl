<template>
	<div id="sy-rooter">
		这是首页
		<el-input v-model='text' />
		<el-input v-model="text" />
			<div v-for= "x in item" :key="x">
				{{x}}-div
			</div>
		<div>{{text}}</div>
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
				item: arr
			}
		},
		watch: {
			text: function(to, from) {

				let syRooter = document.getElementById('sy-rooter')

				//				let divs = {
				//					render: function(r) {
				//						return r('div', {
				//							domProps: {
				//								innerText: from
				//							}
				//						})
				//					}
				//				}
				let divs = document.createElement('div')
				divs.innerText = from
				syRooter.appendChild(divs)
				//console.log(divs)
			}
		},
		methods: {

		}
	}
</script>
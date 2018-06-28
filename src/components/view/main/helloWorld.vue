<template>
	<div>
		helloWorld 这是第{{routerIndex}}个tab-panel
	</div>
</template>

<style>

</style>
<script>
	import { mapState } from 'vuex'
	export default {
		name: 'main_helloworld',
		data() {
			return {

			}
		},
		created: function() {
			//console.log(this.routerIndex)
		},
		computed: {
			...mapState({
				routerIndex: state => state.routerIndex
			}),
		},
		methods: {

		}
	}
</script>
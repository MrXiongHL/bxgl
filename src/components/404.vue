<template>
	<div>
		没有找到页面{{url}}
	</div>
</template>

<script>
	export default {
		name: 'the404',
		data() {
			return {
				url: window.location.href
			}
		},
		watch: {
			$route: function(to, from) {
				this.url = window.location.href
			}
		},
		created: function() {
			//console.log('created')
		}
	}
</script>

<style>

</style>
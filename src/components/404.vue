<template>
	<div>
		没有找到页面{{url}}
	</div>
</template>

<script>
	export default{
		name:'the404',
		data(){
			return{
				url:window.location.href
			}
		}
	}
</script>

<style>
</style>
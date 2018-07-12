<template>
	<div>
		<theme-color></theme-color>
	</div>
</template>

<style>

</style>

<script>
	import { colorRGB2Hex } from '../../util/util'
	import ThemeColor from '../../util/theme/theme.vue'
	export default {
		name: 'index-header',
		data() {
			return {

			}
		},
		components: {
			'theme-color': ThemeColor
		},
		created: function() {

		},
		methods: {}
	}
</script>
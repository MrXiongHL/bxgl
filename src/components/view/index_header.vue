<template>
	<div class="indexHeader-header el-header--primary">
		<el-row>
			<el-col :span="3">
				<theme-color></theme-color>
			</el-col>
		</el-row>

		<el-my-dialog :dialogVisible.sync="dialogVisible">
			<span slot="dialog-body">这是一段信息
				<el-button @click="alerts('消息啊')" type="primary">按钮</el-button>
			</span>
			<span slot="dialog-title" dt="d">标题a</span>
		</el-my-dialog>
	</div>
</template>

<style>
	.indexHeader-header {
		width: 100%;
		/*float: right;*/
	}
</style>

<script>
	import { colorRGB2Hex } from '../../util/util'
	import ThemeColor from '../../util/theme/theme.vue'
	import Dialogs from './dialog'
	export default {
		name: 'index-header',
		data() {
			return {
				dialogVisible: false
			}
		},
		components: {
			'theme-color': ThemeColor,
			'el-my-dialog': Dialogs
		},
		created: function() {

		},
		methods: {
			alerts: function(msg) {
				alert(msg)
			},
		}
	}
</script>
<template>
	<div style="indexHeader-header">
		<el-row>
			<el-col :span="3">
				<theme-color></theme-color>
			</el-col>
			<el-col :span="3">
				<el-button @click="dialogVisible = true">Dialog</el-button>
			</el-col>
			<el-col :span="3">
				<el-button @click="func('x')('xxx')('xxx3')">()=>()=>{}1</el-button>
			</el-col>
			<el-col :span="3">
				<el-button @click="func2('x')('xxx')('xxx3')">()=>()=>{}2</el-button>
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
		float: left;
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
			func: (xx) => (xx2) => (xx3) => {
				console.log(xx, xx2, xx3)
			},
			func2: function(xx) {
				return function(xx2) {
					return function(xx3) {
						console.log(xx, xx2, xx3)
					}
				}
			}
		}
	}
</script>
<template>
	<el-dialog title="提示" :append-to-body="defaultDialog.appendToBody" :close-on-click-modal="defaultDialog.closeOnModal" :visible.sync="dialogVisible" :width="width||defaultDialog.defaultWidth" :before-close="handleClose">

		<span slot="title" dt="d" v-move="move" v-hover="cursor">
			<slot name="dialog-title">
				标题
			</slot>
		</span>
		
		<span>
			<slot name="dialog-body">内容</slot>
		</span>
		
		<span slot="footer" class="dialog-footer">
		    <el-button @click="closeDialogs">取 消</el-button>
		    <el-button type="primary" @click="closeDialogs">确 定</el-button>
	  	</span>
	</el-dialog>
</template>
<style>
	.el-dialog__wrapper {
		overflow: hidden !important;
	}
	
	.el-dialog {
		/*margin: 10% auto !important;*/
	}
</style>

<script>
	export default {
		name: 'el-my-dialog',
		props: ['dialogVisible', 'width'],
		data() {
			return {
				defaultDialog: {
					appendToBody: true,
					closeOnModal: false,
					defaultWidth: '30%'
				},
				move: {
					needParent: true,
				},
				cursor: {
					needParent: true,
					cursors: 'move',
					defaults: 'default'
				},
			};
		},
		methods: {
			handleClose: function(done) {
				//				this.$confirm('确认关闭？')
				//					.then(_ => {
				//done();
				this.$emit('update:dialogVisible', false)
				//					})
				//					.catch(_ => {});
			},
			closeDialogs: function() {
				this.$emit('update:dialogVisible', false)
			}
		}
	};
</script>
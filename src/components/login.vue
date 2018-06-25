<template>
	<div id="appIndex" ref="appIndex" v-title :data-title="title">
		<el-form id="loginFrom" label-width="" size="medium" :model="loginForm" :label-position="labelPosition">
			<el-form-item label="">
				<el-input v-model="loginForm.loginName" :placeholder="loginNamePhoder">
					<template slot="prepend">
						<i class="iconfont icon-yonghu icons"></i>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="">
				<el-input v-model="loginForm.loginPwd" type="password" :placeholder="loginPwdPhoder">
					<template slot="prepend">
						<i class="iconfont icon-mimaicon icons"></i>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button id="loginBtn" type="primary">登陆</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import WindowBG from '@/util/window_bg';
	export default {
		name: 'index',
		data() {
			return {
				title: '登陆',
				labelPosition: 'right',
				loginNamePhoder:'请输入用户名',
				loginPwdPhoder:'请输入密码名',
				loginForm: {
					loginName: '',
					loginPwd: '',
				}
			}
		},
		created: function() {},
		mounted: function() { //组件挂载完成
			this.$nextTick(function() {
				WindowBG(this.$refs.appIndex)
			})
		},
		methods: {

		}
	}
</script>

<style>
	#appIndex {
		height: 100%;
		width: 100%;
		background: url(../../static/login_bg.jpg);
		background-size: 100% 100%;
	}
	
	#loginFrom {
		position: absolute;
		z-index: 2;
		width: 260px;
		left: 50%;
		top: 35%;
		margin-left: -130px;
	}
	
	#loginBtn {
		width: 100%;
	}
	
	.el-input-group__prepend {
		padding: 0px;
		background-color: #409EFF;
		border: none !important;
	}
	
	.icons {
		font-size: 22px;
		padding: 0 5px;
		color: white;
		background-color: transparent;
	}
	
	.el-input input {
		outline: none !important;
		border: none !important;
	}
</style>
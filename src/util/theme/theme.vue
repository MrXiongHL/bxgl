<template>
	<div>
		<el-color-picker class="theme-picker" popper-class="theme-picker-dropdown" v-model="theme">
		</el-color-picker>
	</div>
</template>

<script>
	//theme
	const ORIGINAL_THEME = '#409EFF' // default color
	//	import { themes } from './themeStyle'
	const themes = () =>
		import( /* webpackChunkName: "group-theme" */ '@/util/theme/themeStyle')

	import { getData } from '../axios'
	import { mapState } from 'vuex'
	let styles = [];
	export default {
		data() {
			return {
				chalk: '', // content of theme-chalk css
				theme: ORIGINAL_THEME,
				themeStr: ''
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.themeColor
			})
		},
		watch: {
			'theme': function(val, oldVal) {
				if(typeof val !== 'string') return
				const themeCluster = this.getThemeCluster(val.replace('#', ''))
				const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
				//console.log(themeCluster, originalCluster)
				//存储
				localStorage.setItem('ORIGINAL_THEME', this.theme)
				//
				this.$store.commit({
					type: 'setThemeColor',
					themeColor: this.theme
				})
				styles = [this.themeStr];
					console.log(this.themeStr.length);
				let myTheme = document.getElementById('my-theme')
				if(!myTheme) {
					myTheme = document.createElement('style')
					myTheme.setAttribute('id', 'my-theme')
					document.head.appendChild(myTheme)
				} else {
					styles = [myTheme.innerText||this.themeStr];
					console.log('fg',styles[0].length);
				}
				styles.forEach(styleDom => {
					const innerText = styleDom;
					console.log('set',innerText.length)
					if(typeof innerText !== 'string') return
					myTheme.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
				})

			}
		},
		mounted: function() {
			// DOM 现在更新了
			// `this` 绑定到当前实例
			

			themes().then((dt) => {
				this.themeStr = dt.themes;
				this.theme = localStorage.getItem('ORIGINAL_THEME') || ORIGINAL_THEME;
})
},

methods: {
		updateStyle(style, oldCluster, newCluster) {
			let newStyle = style;
			console.log('change', style.length)
			oldCluster.forEach((color, index) => {
						newStyle = newStyle.replace(new RegExp(color,'ig'), newCluster[index])
				})
				return newStyle
			},
			getThemeCluster(theme) {
				const tintColor = (color, tint) => {
					let red = parseInt(color.slice(0, 2), 16)
					let green = parseInt(color.slice(2, 4), 16)
					let blue = parseInt(color.slice(4, 6), 16)

					if(tint === 0) { // when primary color is in its rgb space
						return [red, green, blue].join(',')
					} else {
						red += Math.round(tint * (255 - red))
						green += Math.round(tint * (255 - green))
						blue += Math.round(tint * (255 - blue))

						red = red.toString(16)
						green = green.toString(16)
						blue = blue.toString(16)

						return `#${red}${green}${blue}`
					}
				}

				const shadeColor = (color, shade) => {
					let red = parseInt(color.slice(0, 2), 16)
					let green = parseInt(color.slice(2, 4), 16)
					let blue = parseInt(color.slice(4, 6), 16)

					red = Math.round((1 - shade) * red)
					green = Math.round((1 - shade) * green)
					blue = Math.round((1 - shade) * blue)

					red = red.toString(16)
					green = green.toString(16)
					blue = blue.toString(16)

					return `#${red}${green}${blue}`
				}

				const clusters = [theme]
				for(let i = 0; i <= 9; i++) {
					clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
					//console.log(Number((i / 10).toFixed(2)))
				}
				clusters.push(shadeColor(theme, 0.1))
				return clusters
			}
		}
	}
</script>

<style>
	.theme-picker .el-color-picker__trigger {
		vertical-align: middle;
	}
	
	.theme-picker-dropdown .el-color-dropdown__link-btn {
		display: none;
	}
</style>
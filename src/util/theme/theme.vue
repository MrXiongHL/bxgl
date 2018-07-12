<template>
	<el-color-picker class="theme-picker" popper-class="theme-picker-dropdown" v-model="theme"></el-color-picker>
</template>

<script>
	//const version = require('element-ui/package.json').version // element-ui version from node_modules
	//theme
	const ORIGINAL_THEME = '#409EFF' // default color
	import { themes } from './themeStyle'

	import { getData } from '../axios'
	export default {
		data() {
			return {
				chalk: '', // content of theme-chalk css
				theme: ORIGINAL_THEME
			}
		},
		watch: {
			'theme': function(val, oldVal) {
				if(typeof val !== 'string') return
				const themeCluster = this.getThemeCluster(val.replace('#', ''))
				const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
				//console.log(themeCluster, originalCluster)
				//存储
				localStorage.setItem('ORIGINAL_THEME', this.theme)

				//				const styles = [].slice.call(document.querySelectorAll('style'))
				//					.filter(style => {
				//						const text = style.innerText || style.innerHTML
				//
				//						let elementStyle = new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
				//						//console.log(text)
				//						return elementStyle
				//					})
				//		
				let styles = [themes]
				let myTheme = document.getElementById('my-theme')
				if(!myTheme) {
					myTheme = document.createElement('style')
					myTheme.setAttribute('id', 'my-theme')
					document.head.appendChild(myTheme)
				} else {
					styles = [myTheme.innerText]
				}
				styles.forEach(styles => {
					//					const {
					//						innerText
					//					} = style
					const innerText = styles;
					//console.log(innerText)
					if(typeof innerText !== 'string') return
					myTheme.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
				})

			}
		},
		mounted: function() {
			// DOM 现在更新了
			// `this` 绑定到当前实例
			this.theme = localStorage.getItem('ORIGINAL_THEME') || ORIGINAL_THEME
			//console.log(themes)
		},

		methods: {
			updateStyle(style, oldCluster, newCluster) {
				let newStyle = style
				oldCluster.forEach((color, index) => {
					//if(index==0)
					//console.log(color,newCluster[index],newStyle)

					newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
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
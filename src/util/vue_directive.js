import Vue from 'vue'

const changeWHName = 'changeWH';
const hoverName = 'hover';
const titleName = 'title';
const moveName = 'move'

// 注册一个全局自定义指令 `v-title`//设置浏览器标题
Vue.directive(titleName, {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, d, c, b) {
		document.title = d.value;
	}
})

//拖动改变宽度元素
Vue.directive(changeWHName, {
	inserted: function(el, binding) {
		el.onmousedown = function(e) {
			let disx = e.pageX - el.offsetLeft;
			let disy = e.pageY - el.offsetTop;
			let ePGX = e.pageX;
			let oldPGX = e.pageX;
			let selectStyle
			let htmlCss
			let bodyCss
			if(binding.value.isChangeWH) {
				selectStyle = '-moz-user-select: none; -khtml-user-select: none; user-select: none; -webkit-user-select: none;'
				htmlCss = document.querySelector('html').style.cssText
				bodyCss = document.body.style.cssText
				htmlCss = bodyCss = selectStyle
			}
			document.onmousemove = function(e) {
				let direction = e.pageX - ePGX;
				if(binding.name === changeWHName && !binding.value.isChangeWH) {
					if(el.offsetLeft <= 0 && direction < 0) {
						return;
					}
					el.parentNode.style.left = e.pageX - disx + 'px';
				} else {
					let widths = 0;
					if(direction < 0) {
						widths = (el.parentNode.clientWidth + (e.pageX - oldPGX))
					} else {
						widths = (el.parentNode.clientWidth - (oldPGX - e.pageX))
					}
					let minWidths = parseInt(binding.value.minWidth.split('px'));
					if(widths < minWidths) {
						widths = minWidths;
					}
					binding.value.funcs({
						width: widths + 'px'
					})
					el.parentNode.style.width = widths + 'px';
					oldPGX = e.pageX;
				}

				//console.log(el.style.cursor + 'd', el.parentNode.clientWidth, e.pageX, disx, el.offsetLeft);
			}
			document.onmouseup = function() {
				if(binding.name === changeWHName && !binding.value.isChangeWH) {
					if(el.offsetLeft < 0) {
						el.style.left = 0 + 'px';
					} else if(el.offsetLeft + el.clientWidth > 500) {
						el.style.left = 500 - el.clientWidth + 'px';
					}
				} else {
					let widths = el.parentNode.clientWidth;
					let minWidths = parseInt(binding.value.minWidth.split('px'));
					if(widths < minWidths) {
						widths = minWidths;
					}
					binding.value.funcs({
						width: widths + 'px'
					})
				}
				htmlCss = htmlCss.replace(selectStyle, '')
				bodyCss = bodyCss.replace(selectStyle, '')

				document.onmousemove = document.onmouseup = null;
			}
		}
	}
})

//鼠标指针改变
Vue.directive(hoverName, {
	inserted: function(el, binding) {
		let els = binding.value.needParent ? el.parentNode : el
		els.onmouseenter = function(e) {
			els.style.cursor = binding.value.cursors || 'default';
			els.style.backgroundColor = '#f5f7fa'
		}
		els.onmouseleave = function(e) {
			els.style.cursor = binding.value.defaults || 'default';
			els.style.backgroundColor = 'transparent'
		}
		//console.log(binding.value)
	}
})

//拖动
Vue.directive(moveName, {
	inserted: function(el, binding) {
		//console.log('move', binding.value)
		let els = binding.value.needParent ? el.parentNode : el
		let dialog = el.parentNode.parentNode

		els.onmousedown = function(dEvent) {
			let dX = dEvent.pageX - dEvent.offsetX
			let dY = dEvent.pageY - dEvent.offsetY
			let oldPageX = dEvent.pageX
			let oldPageY = dEvent.pageY
			//let getComputedStyles = (document.defaultView.getComputedStyle || window.getComputedStyle)
			//let dialogMR = getComputedStyles(dialog).marginRight
			//dialogMR = parseFloat(dialogMR)
			//let dialogMB = getComputedStyles(dialog).marginBottom
			//dialogMB = parseFloat(dialogMB)

			document.onmousemove = function(mEvent) {
				let mX = dX + (mEvent.pageX - oldPageX)
				let mY = dY + (mEvent.pageY - oldPageY)

				if(mX <= 0 || mY <= 0 || (mX + dialog.clientWidth) >= document.body.clientWidth || (mY + dialog.clientHeight) >= document.body.clientHeight) {
					return
				}
				dialog.style.marginLeft = mX + "px"
				dialog.style.marginTop = mY + "px"
			}

			document.onmouseup = function(uEvent) {

				document.onmousemove = document.onmouseup = null
			}

		}
	}
})
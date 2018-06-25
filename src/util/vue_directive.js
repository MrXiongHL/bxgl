import Vue from 'vue'

const moveName = 'move';
const changeName = 'changeWH';
const titleName = 'title';

// 注册一个全局自定义指令 `v-title`//设置浏览器标题
Vue.directive(titleName, {
	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el, d, c, b) {
		// 修复IE10及以下版本不支持dataset属性的问题，兼容transfer-dom.js中使用了dataset的问题 <code in index.html>
		document.title = el.dataset.title;
	}
})

//拖动元素
Vue.directive(moveName, {
	inserted: function(el, binding) {
		el.onmousedown = function(e) {
			var disx = e.pageX - el.offsetLeft;
			var disy = e.pageY - el.offsetTop;
			var ePGX = e.pageX;
			var oldPGX = e.pageX;
			document.onmousemove = function(e) {
				var direction = e.pageX - ePGX;
				if(binding.name === moveName && !binding.value.isChangeWH) {
					if(el.offsetLeft <= 0 && direction < 0) {
						return;
					}
					el.parentNode.style.left = e.pageX - disx + 'px';
				} else {
					var widths = 0;
					if(direction < 0) {
						widths = (el.parentNode.clientWidth + (e.pageX - oldPGX))
					} else {
						widths = (el.parentNode.clientWidth - (oldPGX - e.pageX))
					}
					var minWidths = parseInt(binding.value.minWidth.split('px'));
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
				if(binding.name === moveName && !binding.value.isChangeWH) {
					if(el.offsetLeft < 0) {
						el.style.left = 0 + 'px';
					} else if(el.offsetLeft + el.clientWidth > 500) {
						el.style.left = 500 - el.clientWidth + 'px';
					}
				} else {
					var widths = el.parentNode.clientWidth;
					var minWidths = parseInt(binding.value.minWidth.split('px'));
					if(widths < minWidths) {
						widths = minWidths;
					}
					binding.value.funcs({
						width: widths + 'px'
					})
				}
				document.onmousemove = document.onmouseup = null;
			}
		}
	}
})

//鼠标指针改变
Vue.directive(changeName, {
	inserted: function(el, binding) {
		el.onmouseenter = function(e) {
			el.style.cursor = binding.value.cursor || 'default';
		}
		//		el.onmouseleave = function(e) {
		//			el.style.cursor = binding.value.default || 'default';
		//		}
	}
})
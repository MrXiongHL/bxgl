(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{iRGG:function(t,e,i){"use strict";i.r(e);var n=i("QbLZ"),a=i.n(n),r=i("L2JU"),o={name:"index-main",data:function(){return{vertical:!0,cache:[],mainBodyStyle:{height:"100%"}}},mounted:function(){this.$nextTick(function(t){var e=null,i=this;window.addEventListener("resize",function(){e&&clearTimeout(e),e=setTimeout(i.resizeMain,1e3)}),setTimeout(function(){i.resizeMain()},1e3)})},computed:a()({},Object(r.b)({mainView:function(t){return t.mainView},historyMainView:function(t){return t.historyMainView}}),{active:{set:function(t){},get:function(){return this.$store.state.active}}}),watch:{$route:function(t,e){var i=null;if(this.cache=this.mainView.map(function(e){return e.index==t.path&&(i=e),e.index.substring(1)}),i)this.$store.commit({type:"setActive",active:t.path,router:this.$router});else{var n=null;this.historyMainView.forEach(function(e){e.index==t.path&&(n=e)}),n&&this.$store.commit({type:"openRoute",router:this.$router,dt:n})}}},methods:{resizeMain:function(){var t=document.getElementById("main-tab").clientHeight,e=document.getElementsByClassName("el-tabs")[0].clientHeight;this.mainBodyStyle.height=t-e+"px"},selectTab:function(t){t.index;var e=t.name;t.paneName,t.label;this.$store.commit({type:"setActive",active:e,router:this.$router})},removeTab:function(t){var e=this.mainView,i=this.active;i===t&&e.forEach(function(n,a){if(n.index===t){var r=e[a+1]||e[a-1];r&&(i=r.index)}}),this.$store.commit({type:"setActive",active:i,router:this.$router}),this.$store.commit({type:"setMainView",mainView:e.filter(function(e){return e.index!==t})})}}},c=(i("vluL"),i("KHd+")),s=Object(c.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"main-tab"}},[i("el-tabs",{ref:"tabs",attrs:{type:"border-card"},on:{"tab-remove":t.removeTab,"tab-click":t.selectTab},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.mainView,function(e,n){return i("el-tab-pane",{key:e.name,attrs:{closable:e.closable,name:e.index}},[i(e.content,{tag:"component"}),t._v(" "),i("span",{attrs:{slot:"label"},slot:"label"},[i("i",{class:e.icon}),t._v(" "+t._s(e.title))])],1)})),t._v(" "),i("div",{style:t.mainBodyStyle,attrs:{id:"main-body"}},[i("el-scrollbar",{ref:"elScrollbar",attrs:{vertical:!1,noresize:!1,viewStyle:{padding:"10px 10px"}}},[i("keep-alive",{attrs:{include:t.cache}},[i("router-view")],1)],1)],1)],1)},[],!1,null,null,null);e.default=s.exports},lgh7:function(t,e){},vluL:function(t,e,i){"use strict";var n=i("lgh7");i.n(n).a}}]);
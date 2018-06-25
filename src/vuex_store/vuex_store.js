import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0,
    sum: 12,
  },
  mutations: {
    num: function(state, data) {
      state.num += (data.data.num ? data.data.num : 1)
      console.log(data.data)
      data.data.calls()
    },
    sum: function(state, data) {
      state.sum += (data.data.sum ? data.data.sum : 1)
    }
  }
})

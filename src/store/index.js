import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100,
    hostIp: '192.168.1.109',
    // hostIp: '127.0.0.1:5000',
    list_select: []
  },
  mutations: {
    add (state) {
      state.count++
    },
    dec (state) {
      state.count--
    },
    addSelect (state, select) {
      state.list_select = select
      localStorage.setItem('select_list', JSON.stringify(select))
    }
  }
})

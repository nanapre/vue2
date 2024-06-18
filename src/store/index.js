import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: localStorage.getItem('userName') || '',
  },
  getters: {
  },
  mutations: {
    NAMEUPDATE(state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
    },
  },
  actions: {
  },
  modules: {
  }
})

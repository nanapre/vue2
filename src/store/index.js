import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: localStorage.getItem('userName') || '',
    userRole: localStorage.getItem('userRole') || '',
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
  },
  getters: {
    userRole: state => state.userRole,
    isAuthenticated: state => state.isAuthenticated,
  },
  mutations: {
    NAMEUPDATE(state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
    },
    RoleUpdate(state, userRole) {
      state.userRole = userRole
      localStorage.setItem('userRole', userRole)
    },
    isLogin(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
      localStorage.setItem('isAuthenticated', isAuthenticated)
    }
  },
  actions: {
    updateIsLogin({ commit }, isAuthenticated) {
      commit('isLogin', isAuthenticated);
    },
  },
  modules: {
  }
})

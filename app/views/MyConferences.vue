<template>
  <div class="about">
    <h1>Ruta protegida</h1>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async login({ commit }, usuario) {
      try {
        const res = await fetch('http://localhost:3001/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario)
        })
        const usuarioDB = await res.json()
        console.log(usuarioDB.data.token)
        commit('setToken', usuarioDB.data.token)
        localStorage.setItem('token2', usuarioDB.data.token)
      } catch (error) {
        console.log('error: ', error)
      }
    },
    obtenerToken({ commit }) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    }
  }
})
</script>
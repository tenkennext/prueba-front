<template>
  <router-view>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/conferences">Conferences</router-link>
    </div>
    <p>{{$store.state.token}}</p>
  </router-view>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  /*methods:{
    ...mapActions(['getToken']),
    getToken({commit}) {
      if(localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    }
  },
  created(){
    this.getToken()
  }*/
}
</script>
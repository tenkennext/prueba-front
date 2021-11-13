<template>
  <div>
    <sui-menu pointing secondary>
      <router-link to="/">
        <a
          is="sui-menu-item"
          content="Inicio"
        />
      </router-link>
      <router-link to="/register">
        <a
          is="sui-menu-item"
          content="Registrar"
        />
      </router-link> 
      <router-link to="/conferences">
        <a
          is="sui-menu-item"
          content="Conferencias"
        />
      </router-link> 
      <sui-menu-menu position="right">
        <a
          is="sui-menu-item"
          :active="isActive('Logout')"
          content="Salir"
          @click="select('Logout')"
        />
      </sui-menu-menu>
    </sui-menu>
    
    <p>{{$store.state.token}}</p>

    <router-view></router-view>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Main',
  data() {
    return {
      active: 'Home',
    };
  },
  methods:{
    /*...mapActions(['getToken']),
    getToken({commit}) {
      if(localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    }*/
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
  }/*,
  created(){
    this.getToken()
  }*/
}
</script>
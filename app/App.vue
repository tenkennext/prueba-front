<template>
  <div>
    <sui-menu pointing secondary>
      <router-link to="/">
        <a
          is="sui-menu-item"
          content="Inicio"
        />
      </router-link>
      <router-link to="/register" v-if="!active">
        <a
          is="sui-menu-item"
          content="Registrar"
        />
      </router-link> 
      <router-link to="/conferences">
        <a
         text-align="center" 
          is="sui-menu-item"
          content="Conferencias"
        />
      </router-link> 
      <sui-menu-menu position="right" v-if="active">
        <router-link to="/my_conferences">
          <a
            is="sui-menu-item"
            position="right"
            content="Mis Conferencias"
          />
        </router-link> 
        <a
          is="sui-menu-item"
          :active="isActive(true)"
          content="Salir"
          @click="logout()"
        />
      </sui-menu-menu>
    </sui-menu>

    <template v-if="active">
      <h3 is="sui-header" text-align="center" >
        <sui-image circular src="https://i.pravatar.cc/300" />
        <sui-header-content>
          Bienvenido
          <sui-header-subheader>{{ user.name }}</sui-header-subheader>
        </sui-header-content>
      </h3>
      <!--p>{{$store.state.token}}</p-->
    </template>

    <router-view></router-view>

  </div>
</template>

<script>
class UserLogin {
  constructor(name = '', role = '', token = '') {
    this.name = name,
    this.role = role,
    this.token = token
  }
}


import {mapActions} from 'vuex'
export default {
  name: 'Main',
  data() {
    return {
      user: {},
      active: false,
    };
  },
  methods:{
    ...mapActions(['getToken']),
    getToken(/*{commit}*/) {
      if(localStorage.getItem('token')) {
        console.log('User is LogedIn');
        this.getLogedIn();
        //commit('setToken', localStorage.getItem('token'))
      } else {
        console.log('Is Guest!');
        //commit('setToken', null)
      }
    },
    getLogedIn(){
       const name = localStorage.getItem('name');
       const id = localStorage.getItem('id');
       const role = localStorage.getItem('role');  
       if( name !== null && role !== null){
        this.user = new UserLogin();
        this.user.name = name;
        this.user.role = role;
        this.active = true;
        this.isActive();
       }else{
         this.active = false;
         this.isActive();
       }
    },
    logout(){
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      window.location.href = '/';
    },
    isActive() {
      //console.log('IsActive? '+this.active);
      return this.active;
    },
    select(name) {
      this.active = name;
    },
  },
  created(){
    this.getToken()
  }
}
</script>
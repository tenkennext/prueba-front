<template>
   <sui-container fluid text>
    <sui-container>
      <div class="ui section divider"></div>
      <h2 is="sui-header" icon text-align="center">
        <sui-icon name="power off" circular />
        Empezar iniciando sesion
      </h2>
    </sui-container>
    <div class="ui hidden divider"></div>
    <sui-form @submit.prevent="handleLogin()" v-if="!isLogedIn">
      <div v-if="!successful">
        <sui-form-field>
          <label>Correo eléctronico:</label>
          <input type="email" v-model="user.email"
                v-validate="'required|email|max:50'"
                name="email"
                placeholder="Email"  />
          <sui-message v-if="submitted && errors.has('email')">
            <sui-message-header>{{errors.first('email')}}</sui-message-header>
          </sui-message>
        </sui-form-field>
        <sui-form-field>
          <label>Password:</label>
          <input type="password" v-model="user.password"
                v-validate="'required|min:6|max:40'"
                name="password"
                placeholder="Ingrese contraseña" />
            <sui-message v-if="submitted && errors.has('password')">
              <sui-message-header>{{errors.first('password')}}</sui-message-header>
            </sui-message>
        </sui-form-field>
        <!-- @click="sendConference()"-->
        <sui-button>Iniciar</sui-button>
        <sui-message v-if="message">
          <!--:class="successful ? 'success' : 'danger'"-->
          <sui-message-header>{{message}}</sui-message-header>
        </sui-message>
      </div>
    </sui-form>
    <sui-message v-if="!successful">
      <sui-message-header>Nuevo?</sui-message-header>
      <sui-message-list>
        <sui-message-item>
          Registarse para ingresar  <router-link to="/register">aquí</router-link>
        </sui-message-item>
      </sui-message-list>
    </sui-message>
    <sui-message v-if="message && successful">
      <sui-message-header>{{message}}</sui-message-header>
      <sui-message-list>
        <sui-message-item>
          Ha ingresado con rol de <b>{{user.role}}</b>
        </sui-message-item>
        <sui-message-item>
          Sera redireccionado en un momento
        </sui-message-item>
        <sui-message-item>
          Para crear conferencias <router-link to="/add_conference">click aqui</router-link>
        </sui-message-item>
      </sui-message-list>
    </sui-message>

  </sui-container>
</template>

<script>

class User {
  constructor(email = '', password = '') {
    this.email = email,
    this.password = password
  }
}

import Vue from 'vue'
import Vuex from 'vuex'
import { mapMutations } from "vuex";
Vue.use(Vuex)

export default {
  name: 'Home',
  data: () => {
    return {
      user: new User(),
      isLogedIn: Boolean, 
      password: "",
      email: "",
      submitted: false,
      successful: false,
      message: ''
    };
  },
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload){
      state.token = payload
    }
  },
  created(){
    this.getToken();
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login( { commit }, user) {
      /**/
      var opt = {
          method: "POST", 
          mode: 'cors',
           headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json;charset=UTF-8'
            
          },
          body: JSON.stringify(this.user),
        }
        fetch('http://localhost:3001/api/user/login', opt)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.error){
              this.message = data.error;
            }else{
              console.log('logedin');
              /**this.token = data.token;**/
              this.message = data.user.message;
              console.log('mess '+this.message);
              this.successful = true;
              this.user = new User();
              this.user.token = data.user.token;
              this.user.role = data.user.role;
              
              localStorage.setItem('token', data.user.token);
              localStorage.setItem('name', data.user.name);
              localStorage.setItem('email', data.user.email);
              localStorage.setItem('role', data.user.role);
              //commit('setToken', data.user.token)
              const userLoged = data.json();
              console.log(userLoged);
              //Redrirect
              window.setTimeout( function(){
                  window.location = "/my_conferences";
              }, 4500 );
            }
            
          })
          .catch((err) => {
            if(err){
               console.log('Error: ', err);
            }
          });
    },
    handleLogin() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.login(this.user);
        }else{
          return false;
        }
      });
    },
    getToken(/*{ commit }*/) {
      if (localStorage.getItem('token')) {
        this.isLogedIn = true;
        //commit('setToken', localStorage.getItem('token'))
      } else {
        this.isLogedIn = false;
        //commit('setToken', null)
      }
    }
  }
};
</script>
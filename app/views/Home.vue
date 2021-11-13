<template>
   <sui-container fluid text>
    <sui-container>
      <div class="ui section divider"></div>
      <h2 is="sui-header" icon text-align="center">
        <sui-icon name="user circle" circular />
        <sui-header-content>Empezar</sui-header-content>
      </h2>
    </sui-container>
    <div class="ui hidden divider"></div>
    <sui-form @submit.prevent="handleLogin()">
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
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >{{message}}</div>
      </div>
    </sui-form>

  </sui-container>
</template>

<script>
/*import {mapActions} from 'vuex'
export default {
  data() {
    return {
      usuario: {
        email: 'prueba3@prueba.com',
        password: '123123'
      }
    }
  },
  methods: {
    ...mapActions(['login'])
  }
}*/

class User {
  constructor(email = '', password = '') {
    this.email = email;
    this.password = password;
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
            this.user = new User();
          })
          .then((res) => {
            const userLoged = res.data.json();
            console.log(userLoged);
            //this.user = userLoged;
            commit('setToken', res.data.token)
            localStorage.setItem('token', res.data.token)
          })
          .catch((err) => {
            if(err){
               console.log('Error: ', err);
            }
          });
        /*try {
          const res = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
          })
          const userDB = await res.json()
          console.log(userDB);
          this.user = userDB;
          //commit('setToken', userDB.data.token)
          localStorage.setItem('token', userDB.data.token)
        } catch (error) {
          console.log('Error: ', error)
        }*/
    },
    handleLogin() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.login(this.user);
        }
      });
    },
    getToken({ commit }) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    }
  }
};
</script>
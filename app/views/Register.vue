<template>
   <sui-container fluid text>
    <sui-container>
      <div class="ui section divider"></div>
      <h2 is="sui-header" icon text-align="center">
        <sui-icon name="user circle" circular />
        <sui-header-content>Registrar</sui-header-content>
      </h2>
    </sui-container>
    <div class="ui hidden divider"></div>
    <sui-form @submit.prevent="handleRegister()">
      <div v-if="!successful">
        <sui-form-field >
          <label>Nombre:</label>
          <input 
            v-model="user.name"
            v-validate="'required|min:3|max:20'"
            type="text"
            class="form-control"
            name="name"
          placeholder="Nombre" />
          <sui-message v-if="submitted && errors.has('name')">
            <sui-message-header>{{errors.first('name')}}</sui-message-header>
          </sui-message>
          <div v-if="submitted && errors.has('name')"
                class="alert-danger"
            >{{errors.first('name')}}</div>
        </sui-form-field>
        <sui-form-field>
          <label>Correo eléctronico:</label>
          <input type="email" v-model="user.email"
                v-validate="'required|email|max:50'"
                class="form-control"
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
                class="form-control"
                name="password" />
            <sui-message v-if="submitted && errors.has('password')">
              <sui-message-header>{{errors.first('password')}}</sui-message-header>
            </sui-message>
        </sui-form-field>
        <!-- @click="sendConference()"-->
        <sui-button>Crear</sui-button>
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
import User from '../models/user';
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  /*computed: {
    loggedIn() {
      return this.$store.state.auth.$status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },*/
  methods: {
    ...mapActions(['register']),
    async register( user ) {
      try {
        const res = await fetch('http://localhost:3001/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify(user)
        })
        const userDB = await res.json()
        console.log(userDB)
        if(userDB.error){
            this.message = userDB.error;
            this.successful = false;
        }else{
            this.successful = true;
        }
      } catch (error) {
        console.log('Error: ', error)
        this.message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        this.successful = false;
      }
    },

    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.register(this.user);
        }
      });
    }
  }
};
</script>
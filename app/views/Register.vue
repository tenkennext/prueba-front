<template>
   <sui-container fluid text>
    <sui-container>
      <div class="ui section divider"></div>
      <h2 is="sui-header" icon text-align="center">
        <sui-icon name="user circle" circular />
        Registrarse en el sistema
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
        <sui-form-field>
          <label>Role:</label>
          <sui-form-field>
            <sui-dropdown
              placeholder="Role"
              selection
              :options="roles"
              v-model="user.role"
            />
          </sui-form-field>
        </sui-form-field>
        <!-- @click="sendConference()"-->
        <sui-button>Crear</sui-button>
        <sui-message v-if="message" :class="successful ? 'success' : 'danger'">
              <sui-message-header>{{message}}</sui-message-header>
        </sui-message>
      </div>

      <sui-message v-if="message && successful">
        <sui-message-header>{{message}}</sui-message-header>
        <sui-message-list>
          <sui-message-item>
            Su rol es de tipo <b>{{type}}</b>
          </sui-message-item>
          <sui-message-item>
            Comienze sesion para <router-link to="/home">ingresar</router-link>
          </sui-message-item>
        </sui-message-list>
      </sui-message>
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
      user: new User('', '', '', 'attendant'),
      submitted: false,
      successful: false,
      message: '',
      type: '',
      roles: [
         { text: 'Asistente', value: 'attendant', icon: 'deaf' },
         { text: 'Conferencista', value: 'speaker', icon: 'rss' },
      ],
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
            this.message = userDB.data.name + 'Usted se ha registrado correctamente!';
            this.type = userDB.data.role;
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
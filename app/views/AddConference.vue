<template>
  <div>
    <sui-container fluid text>
      <sui-container>
        <div class="ui section divider"></div>
        <h2 is="sui-header" icon text-align="center">
          <sui-icon name="podcast" circular />
          Crear Conferencia
        </h2>

        <sui-form @submit.prevent="sendConference">
          <sui-form-field >
            <label>Titulo:</label>
            <input v-model="conference.title" placeholder="Nombre Conferencia" />
          </sui-form-field>
          <sui-form-field>
            <label>Capacidad de asistentes:</label>
            <input type="number" v-model="conference.quota.capacity" />
          </sui-form-field>
          <sui-form-field>
            <label>Fecha de conferencia:</label>
            <input type="date" v-model="conference.date" />
          </sui-form-field>
          <sui-form-field>
            <label>Localización:</label>
            <input type="text" v-model="conference.location" />
          </sui-form-field>
          <sui-form-field>
            <label>Descripcion:</label>
            <textarea v-model="conference.description"  placeholder="Descripcion de la Conferencia" rows="2"></textarea>
          </sui-form-field> 
          <!-- @click="sendConference()"-->
          <sui-button>Crear</sui-button>
        </sui-form>
      </sui-container>
      <sui-container>
        <sui-item-group>
          
          <sui-item v-for="(conference, idx) in conferences" :key="idx">
            <div class="" v-if="conference.state === true">
            <sui-card>
              <sui-card-content>
                  <sui-item-content>
                    <sui-item-header>{{conference.title}}</sui-item-header>
                    <sui-item-description>{{conference.description}}.</sui-item-description>
                    <div class="ui divider"></div>
                    <sui-item-extra>
                      <span>Conferencia # {{ idx+1 }}</span><br>
                      Capacidad: <b>{{conference.quota.capacity}}</b><small>asistentes</small><br>
                      Fecha: <b>{{format_date(conference.date)}}</b><br>
                      Lugar: <b>{{conference.location}}</b><br>
                    </sui-item-extra>
                  </sui-item-content>
                  <sui-card-content extra>
                    <span slot="right">
                      <small><b>Speaker:</b></small> <!--{{ conference.quota}}-->
                      <sui-image
                        src="https://i.pravatar.cc/150"
                        shape="circular"
                        size="mini"
                      />
                    </span>
                  </sui-card-content>
              </sui-card-content>
            </sui-card>
              </div>
          </sui-item>
         
        </sui-item-group>
      </sui-container>
    </sui-container>         
  </div>
</template>

<script>

import User from '../models/user';
import Conference from '../models/conference';

export default {
  name: 'AddConference',
  data() {
    return {
      conference: new Conference(),
      conferences: [],
      conferenceToDisable: '',
      owner: new User(), 
    }
  },
  mounted(){
    this.createOwner();
    this.getConferences();
  },
  methods: {
    sendConference() {
      this.conference.owner = this.owner.email;

        fetch('http://localhost:3001/api/conference/add', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(this.conference),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(json  => {
            console.log(json);
            //console.log(data);
            this.getConferences();
            this.conference = new Conference();
          });
    },
    getConferences() {
      fetch('http://localhost:3001/api/conferences/mylist/' + this.owner.email ,{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })
        .then(res => res.json())
        /*.then(res => {
            return res.json();
        })*/
        .then(res  => {
          this.conferences = res;          
          console.log(this.conferences);
        });
    },
    format_date(value){
        if (value) {
          return new Date(value).toLocaleDateString();
        }
    },
    createOwner(){
      this.owner.email = localStorage.getItem('email');
      console.log('owner is ', this.owner.email )
    }
  }
};
</script>
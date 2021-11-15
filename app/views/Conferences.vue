<template>
  <div>
    <sui-container fluid text>
      <sui-container>
        <div class="ui section divider"></div>
        <h2 is="sui-header" icon text-align="center">
          <sui-icon name="podcast" circular />
          <sui-header-content>Conferencias</sui-header-content>
        </h2>
      </sui-container>

      <div class="ui hidden divider"></div>
      
      <sui-container> 
        <sui-card-group :items-per-row="1">
          <sui-card v-for="(conference, idx) in conferences" :key="idx">

              <sui-card-content>
                <div class="" v-if="conference.state === true">
                  <sui-item-content>
                    <sui-item-header>{{conference.title}}</sui-item-header>
                    <sui-item-description>{{conference.description}}.</sui-item-description>
                    <div class="ui divider"></div>
                    <sui-item-extra>
                      <span>Conferencia # {{ idx+1 }}</span><br>
                      Capacidad: <b>{{conference.quota.capacity}}</b> <small>asistentes</small><br>
                      Fecha: <b>{{format_date(conference.date)}}</b><br>
                      Lugar: <b>{{conference.location}}</b><br>
                    </sui-item-extra>
                  </sui-item-content>
        
                  <sui-card-content extra>
                      <span slot="right">
                        <small><b>Speaker: </b></small> 
                        {{ conference.owner.name }}
                        <sui-image
                          src="https://i.pravatar.cc/150"
                          shape="circular"
                          size="mini"
                        />
                      </span>
                    </sui-card-content>
                </div>
              </sui-card-content>
                <sui-button attached="bottom" v-if="role === 'attendant'"
                  @click="subscribeConference(conference)">
                  <sui-icon name="add" /> Inscribirme
                </sui-button>

                <sui-button attached="bottom" v-if="role === 'speaker'"
                  toggle
                  content="Activar"
                  :active="isActive" 
                  >
                  <!--@click="isActive = !isActive"-->
                  <sui-icon name="close" /> Activar
                </sui-button>
          </sui-card>
        </sui-card-group>

      </sui-container>


    </sui-container>
  </div>
</template>

<script>

import User from '../models/user';
import Conference from '../models/conference';

export default {
  name: 'MetadataCardExample',
  data() {
    return {
      conference: new Conference(),
      conferences: [],
      edit: false,
      user : new User(),
      conferenceToEdit: '',
      isActive: false,
      role: '',
    }
  },
  mounted(){
    this.role = this.isRole();
    this.createSubscriber();
  },
  created(){
    this.getConferences();
  },
  methods: {
    getConferences() {
      fetch('http://localhost:3001/api/conferences',{
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
    createSubscriber(){
      this.user.email = localStorage.getItem('email');
    },
    isRole(){
       return localStorage.getItem('role');
    },
    subscribeConference(conference) {

      this.conference = conference;
      console.log(conference);
      fetch('http://localhost:3001/api/conference/subscribe/'/* + this.actived*/, {
        method: 'POST',
        body: JSON.stringify({conference: conference, user: this.user}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.getConferences();
        });
    },
  }
};
</script>
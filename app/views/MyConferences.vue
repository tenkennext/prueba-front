<template>
  <div>
    <sui-container fluid text>
      <sui-container>
        <div class="ui section divider"></div>
        <h2 is="sui-header" icon text-align="center">
          <sui-icon name="podcast" circular />
          Mis Conferencias
        </h2>     
      </sui-container>
      <sui-container>
        <sui-item-group>
          <div class="ui section hidden"><br></div>
          <sui-item v-for="(conference, idx) in conferences" :key="idx">
            <!--div class="" v-if="conference.state === true"-->
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
                </sui-card-content>
                <sui-button attached="bottom" v-if="role === 'speaker'"
                    toggle negative
                    :content="textbtn"
                    :active="!conference.state" 
                    @click="inactivateConference(conference)">
                    <!--@click="isActive = !isActive"-->
                    <sui-icon name="close" />
                </sui-button>
                <sui-button attached="bottom" v-if="role === 'attendant'"
                    toggle
                    content="Desinscribirse"
                    :active=" conference.state ? 'Desactivar' : conference.state" 
                    @click="unSubscribeConference(conference._id)">
                    <sui-icon name="close" />
                </sui-button>
              </sui-card>
            <!--/div-->
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
  name: 'MyConferences',
  data() {
    return {
      conference: new Conference(),
      conferences: [],
      conferenceToDisable: '',
      owner: new User(),
      activated : false,
      textbtn: 'Activar',
      role: '',
    }
  },
  mounted(){
    this.createOwner();
    this.role = this.isRole();
    if(this.role === 'speaker'){
      this.getConferences();
    }
    
  },
  methods: {
    getConferences() {
      fetch('http://localhost:3001/api/conferences/mylist/' + this.owner.email ,{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })
        .then(res => res.json())
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
    },
    isRole(){
       return localStorage.getItem('role');
    },
    inactivateConference(conference) {

      this.actived = !conference.state;
      this.conference = conference;
      this.actived ? this.textbtn = 'Desactivar' :  this.textbtn = 'Activar'; 

      fetch('http://localhost:3001/api/conference/disable/' + conference._id + '/state/' + this.actived, {
      })
        .then(res => res.json())
        .then(data => {
          this.getConferences();
        });
    },
  },
}
</script>
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
          
          <sui-item v-for="(conference, idx) in conferences" :key="idx">
            <div class="" v-if="conference.state === true">
              <sui-card>
                <sui-card-content>
                    <sui-item-content>
                      <sui-item-header>{{conference.title}}</sui-item-header>
                      <sui-item-description>{{conference.description}}.</sui-item-description>
                      <div class="ui divider"></div>
                      <sui-item-extra>
                        <span>Conferencia # {{ idx+1 }}</span> - Capacidad: <b>{{conference.quota}}</b><br>
                        Fecha: <b>{{format_date(conference.date)}}</b><br>
                      </sui-item-extra>
                    </sui-item-content>
                </sui-card-content>
                <sui-button attached="bottom" v-if="role === 'speaker'"
                    toggle negative
                    content="Desactivar"
                    :active="!conference.state" 
                    @click="inactivateConference(conference)">
                    <!--@click="isActive = !isActive"-->
                    <sui-icon name="close" />
                </sui-button>
                <sui-button attached="bottom" v-if="role === 'attendant'"
                    toggle
                    content="Desinscribirse"
                    :active="conference.state" 
                    @click="unSubscribeConference(conference._id)">
                    <sui-icon name="close" />
                </sui-button>
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
  name: 'MyConferences',
  data() {
    return {
      conference: new Conference(),
      conferences: [],
      conferenceToDisable: '',
      owner: new User(),
      activated : false,
      role: '',
    }
  },
  mounted(){
    this.createOwner();
    this.role = this.isRole();
    this.getConferences();
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

      fetch('http://localhost:3001/api/conference/disable/' + conference._id + '/state/' + this.actived, {
        /*method: 'POST',
        mode: 'cors',
        body: JSON.stringify({id: conference, state: this.isActive}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },*/
      })
        .then(res => res.json())
        .then(data => {
          this.getConferences();
        });
    },
  },
}
</script>
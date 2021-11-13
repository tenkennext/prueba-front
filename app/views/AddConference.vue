<template>
  <div>
    <sui-container fluid text>
      <sui-container>
        <div class="ui section divider"></div>
        <h2 is="sui-header" icon text-align="center">
          <sui-icon name="podcast" circular />
          <sui-header-content>Crear Conferencia</sui-header-content>
        </h2>

        <sui-form @submit.prevent="sendConference">
          <sui-form-field >
            <label>Titulo:</label>
            <input v-model="conference.title" placeholder="Nombre Conferencia" />
          </sui-form-field>
          <sui-form-field>
            <label>Capacidad de asistentes:</label>
            <input type="number" v-model="conference.quota" />
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
                  <!--sui-item-image src="static/images/wireframes/image.png" /*-->
                  <sui-item-content>
                    <sui-item-header>{{conference.title}}</sui-item-header>
                    <sui-item-description>{{conference.description}}.</sui-item-description>
                    <sui-item-extra>
                      Capacidad: {{conference.quota}}<br>
                      <span>Conferencia # {{ idx+1 }}</span>
                    </sui-item-extra>
                    <!--button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                        <button @click="editTask(task._id)" class="btn btn-secondary">
                          Edit
                        </button-->
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

class Conference {
  constructor(title = '', description = '', quota = '') {
    this.title = title;
    this.quota = quota;
    this.description = description;
  }
}

export default {
  name: 'AddConference',
  data() {
    return {
      conference: new Conference(),
      conferences: [],
      edit: false,
      conferenceToEdit: ''
    }
  },
  mounted(){
    this.getConferences();
  },
  methods: {
    sendConference() {
      if(this.edit === false) {
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
      }
      else {
        fetch('/api/conference/add/' + this.conferenceToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.conference),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            //this.getTasks();
            this.conference = new Conference();
            this.edit = !this.edit;
          });
      }
    },
    getConferences() {
      fetch('http://localhost:3001/api/conferences/list',{
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
  
  }
};
</script>
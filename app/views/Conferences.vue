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
                      <span>Conferencia # {{ idx+1 }}</span> - Capacidad: <b>{{conference.quota}}</b><br>
                      Fecha: <b>{{format_date(conference.date)}}</b><br>
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
                </div>
              </sui-card-content>
                <sui-button attached="bottom">
                  <sui-icon name="add" /> Inscribirme
                </sui-button>

                <sui-button attached="bottom" 
                  toggle
                  content="Activar"
                  :active="isActive" 
                  @click="inactivateConference(conference._id)">
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

class Conference {
  constructor(title = '', description = '', location = '', date = '', quota = '') {
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.quota = quota;
  }
}

export default {
  name: 'MetadataCardExample',
  data() {
    return {
      conference: new Conference(),
      conferences: [],
      edit: false,
      conferenceToEdit: '',
      isActive: false,
    }
  },
  mounted(){
    this.getConferences();
  },
  methods: {
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
    inactivateConference(conferenceId) {

      this.isActive = !this.isActive;

      fetch('http://localhost:3001/api/conference/disable/' + conferenceId, {
        method: 'UPDATE',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.conference.state = this.isActive),
      })
        .then(res => res.json())
        .then(data => {
          this.getConferences();
        });
    },
    format_date(value){
        if (value) {
          return new Date(value).toLocaleDateString();
        }
    }
  }
};
</script>
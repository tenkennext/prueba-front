import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Conferences from './views/Conferences.vue';
import AddConference from './views/AddConference.vue';
import MyConferences from './views/MyConferences.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/conferences',
      name: 'Conferences',
      component: Conferences
    },
    {
      path: '/add_conference',
      name: 'Add Conference',
      component: AddConference
    },
    {
      path: '/my_conferences',
      name: 'My Conferences',
      component: MyConferences
    }
  ]
});

export default router
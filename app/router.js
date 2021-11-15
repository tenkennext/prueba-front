import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Conferences from './views/Conferences.vue';
import AddConference from './views/AddConference.vue';
import MyConferences from './views/MyConferences.vue';
import Register from './views/Register.vue';
//export default router
//import Login from './views/Login.vue';
//import Register from './views/Register.vue';

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
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/conferences',
      component: Conferences
    },
    {
      path: '/add_conference',
      component: AddConference
    },
    {
      path: '/my_conferences',
      component: MyConferences
    }
    /*{
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/register',
      component: Register
    },
    /*{
      path: '/profile',
      name: 'profile',
       lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }*/
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
export default router
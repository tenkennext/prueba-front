
/*import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/conferences',
    name: 'Conferences',
    component: () => import(webpackChunkName: "about", '../views/Conferences.vue'),
    meta: {requireAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

    if(rutaProtegida && store.state.token === null){
        // ruta protegida es true
        // token es nulo true, por ende redirigimos al inicio
        next({name: 'Home'})
    }else{
        // En caso contrario sigue...
        next()
    }

})

export default router*/


const express = require('express');
const router = express.Router();
const User = require('../models/User');

const Conferences = require('../models/Conferences');

router.get('/api/conferences', async (req, res) => {
  const ConferencesAll = await Conferences.find({});
  res.json(ConferencesAll);
});


router.get('/api/conferences/mylist/:email', async (req, res) => {
  const user = await User.findOne({ email:  req.params.email });
  //console.log('user ',  user );
  const ConferencesList = await Conferences.find({ owner: user });
  /*console.log(ConferencesList)*/
  res.json(ConferencesList);
});

router.post('/api/conference/add', async (req, res) => {
  const Conference = new Conferences(req.body);
  const user = await User.findOne({ email: req.body.owner });

  Conference.owner = user;
  await Conference.save();
  res.json({
    status: 'Conference saved'
  });
});

router.get('/api/conference/disable/:id/state/:status', async (req, res) => {

  await Conferences.findByIdAndUpdate(req.params.id, { state: req.params.status });
  res.json({
    status: 'Conference disabled'
  });
  
});

module.exports = router;
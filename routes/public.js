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

router.post('/api/conference/subscribe/', async (req, res) => {
  const idConf = req.body.conference._id;
  const user = User.findOne({ email: req.body.user.email });
  const conference = Conferences.findOne({ _id:idConf});
  console.log(conference);
  return; 
  const remains = conference.quota.capacity - 1;
  const quota = { capacity: conference.quota.capacity, remain: remains, subscribers: user };
  await Conferences.findByIdAndUpdate(req.body.conference._id, { quota: quota });
  console.log('await');
  res.json({
    status: 'Subscribed to Conference'
  });
  
});

module.exports = router;
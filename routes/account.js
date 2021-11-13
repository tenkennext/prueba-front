const router = require('express').Router();
const Conference = require('../models/Conferences');

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})

/*
router.get('/conference/list', async (req, res) => {
    const ConferencesList = await Conference.find({});
    res.json(ConferencesList);
});

router.post('/conference/add', async (req, res) => {
    const Conference = new Conference(req.body);
    await Conference.save();
    res.json({
      status: 'Conference saved'
    });
});*/


module.exports = router
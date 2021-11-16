const router = require('express').Router();
const Conference = require('../models/Conferences');

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'Ruta protegida',
            user: req.user
        }
    })
})

module.exports = router
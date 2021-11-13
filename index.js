const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// request CORS security
app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const verifyToken = require('./routes/validate-token');
const publicRoutes = require('./routes/public');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/account', verifyToken, accountRoutes);
app.use('/', publicRoutes);

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ncdk5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost/prueba_front';
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
// route middlewares
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})
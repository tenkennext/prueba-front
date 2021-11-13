const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required().error(errors=>{ 
            errors.forEach(err=>{  
            switch(err.code){
                case "string.empty":
                err.message='Insertar nombre'
                break
                case "string.min":
                err.message='No puede crear un nombre menor de 6 letras'
                break
               }
             })
            return errors
        }),    
    email: Joi.string().min(6).max(255).required().email().error(errors=>{ 
        errors.forEach(err=>{  
        switch(err.code){
            case "string.empty":
            err.message='Insertar email'
            break
            case "string.min":
            err.message='No puede crear un email menor de 6 letras'
            break
           }
         })
        return errors
    }),
    password: Joi.string().min(6).max(1024).required().error(errors=>{ 
        errors.forEach(err=>{  
        switch(err.code){
            case "string.empty":
            err.message='Insertar password'
            break
            case "string.min":
            err.message='No puede crear un passsword menor de 6 letras'
            break
           }
         })
        return errors
    }),
    role: Joi.string().required()
})

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
})


router.post('/register', async (req, res) => {

   // validate user
   const { error } = schemaRegister.validate(req.body)
    
   if (error) {
       return res.status(400).json({error: error.details[0].message})
   }

   // check email exist
   const isEmailExist = await User.findOne({ email: req.body.email });

   if (isEmailExist) {
       return res.status(400).json({error: 'Email ya registrado'})
   }

   // hash contraseña
   const salt = await bcrypt.genSalt(10);
   const password = await bcrypt.hash(req.body.password, salt);

   const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: password,
       role: req.body.role
   });
   try {
       const savedUser = await user.save();
       res.json({
           error: null,
           data: savedUser
       })
   } catch (error) {
       res.status(400).json({error})
   }
})


router.post('/login', async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })
  
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

  // create token
  const token = jwt.sign({
      //name: user.name,
      email: user.email,
      id: user._id
  }, process.env.TOKEN_SECRET)

  res.header('auth-token', token).json({
      error: null,
      data: {'token': token, 'mesagge' : 'Bienvenido!'},
      
  })
})

module.exports = router;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Modulos relatavos al inicio se sesión y manejode sesiones de usarios
var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo');
var UserTools = require('./lib/UserTools');

// Conexión a al Base de datos
var mongoose = require('mongoose');
const MONGOURL = 'mongodb://localhost:27017/saci';
mongoose.connect(MONGOURL, {
  useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.Promise = global.Promise;
const db = mongoose.connection

const UserModel = require('./models/UserModel');

// Creación de Estrategia de Passporta para iniciar sesión
passport.use(new Strategy({
  passReqToCallback: true,
  // usernameField: 'usuario',
  // passwordField: 'contrasena'
  }, function (req, username, password, callback) {
    UserModel.findOne({
      username: req.body.username,
      empresa: req.body.empresa
    }, function(err, UsuarioVerificar){
      if(err) {
        console.log(err);
        return callback(err);
      } else if (!UsuarioVerificar) {
        return callback(null, false);
      } else if (!UsuarioVerificar.habilitado) {
        return callback(null, false);
      } else if (!UserTools.CheckPassword(req.body.password, UsuarioVerificar)) {
        return callback(null, false);
      } else {
        return callback(null, UsuarioVerificar);
      }
    })
  })
)

// Serializadno usuario para que las seseiones de la base de datos no ocupen mucho espacio
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
})

// Algorito para deserealizar los usarios de las sesiones
passport.deserializeUser(function(id, callback) {
  UserModel.findById(id, '-password -salt', function (err, usuario){
    if (err) {
      console.log(err);
      return callback(err)
    }
    callback(null, usuario)
  })
})


var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');

var app = express();

// Ejecucion de middleware para manejar las sesiones
app.use(session({
  secret:'00125874596352',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGOURL,
    mongoOptions: {
      collectionName: 'sesiones',
      useUnifiedTopology: true
    } 
  })
}))

// Inicialización de passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  const language = req.acceptsLanguages('en', 'es', 'pr');
  if (language) {
    req.language = language;
  } else {
    req.language = 'es'
  }
  next();
})

// Creación de ruta para iniciar sesión
app.post(
  '/login', 
  passport.authenticate('local', {
    failureRedirect: '/login/fail',
  }), 
  function(req, res) {
    res.redirect('/login/success')
  }
)

app.get('/login/success', function (req, res) {
  const respuesta = {
    es: 'Bienvenido',
    en: 'Wellcome'
  }
  res.status(200).send({
    message: respuesta[req.language],
    user: req.user
  })
})

app.get('/login/fail', function (req, res) {
  const respuesta = {
    es: 'La combinación de correo y contraseña no coincide o no tienes permiso para iniciar sesión desde este dispositivo.',
    en: 'The combination of email and password does not match or you do not have permission to log in from this device.'
  }
  res.status(401).send({
    message: respuesta[req.language]
  })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ventas', require('./routes/ventas'));

module.exports = app;

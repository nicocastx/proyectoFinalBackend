import passport from 'passport'
import localStrategies from './config-pass-local.js'
import usuariosRepo from '../model/Repos/usuariosRepo.js'

const db = new usuariosRepo

//passport para register
passport.use('register', localStrategies.registerStrategy)

passport.use('login', localStrategies.loginStrategy)

//Serializacion de passport
passport.serializeUser((user, done) => {
  done(null, {email: user.username, alias: user.nombreCompleto});
});

passport.deserializeUser(async (username, done) => {
  let usuarios = await db.getUsuarios();
  const usuario = usuarios.find(u => u.username == username.email)
  done(null, usuario);
});


export default {
  register: passport.authenticate('register', {
    failureRedirect: '/',
    successRedirect: '/productos',
    failureFlash: true
  }),
  login: passport.authenticate('login', {
    failureRedirect: '/',
    successRedirect: '/productos',
    failureFlash: true
  })
}
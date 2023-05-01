/**
 * *Finalidad de archivo:
 * Se define aqui el modo de operacion de las strategias de registro y de inicio de sesion
 * utilizando el modo local, el cual se modularizo y este es utilizado en la declaracion
 * de services de login
 */
import {Strategy as localStrategy} from 'passport-local'
import bcrypt from 'bcrypt'
import usuariosRepo from '../model/Repos/usuariosRepo.js'
import nodemailer from './nodemailer.js'

const db = new usuariosRepo()

//function BCrypt
function createHash(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function validPassword(usuario, password){
  return bcrypt.compareSync(password, usuario.password)
}

//Estrategias locales para iniciar sesion y registrarse
const registerStrategy = new localStrategy(
  {
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    const usuarios = await db.getUsuarios()
    const usuario = usuarios.find(user => user.username == username)
    if (usuario) {
      console.log('El usuario registrado ya existe');
      return done(null, false)
    }

    const newUser = {
      username: username,
      password: createHash(password),
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nroTelefono: req.body.nroTelefono
    }

    await db.agregarUsuario(newUser)
    console.log('Se creo el usuario');
    nodemailer.gmailRegistro(newUser)
    return done(null, newUser)
  })

const loginStrategy = new localStrategy(
  async (username, password, done) => {
    const usuarios = await db.getUsuarios()
    const usuario = usuarios.find(u => u.username == username)

    if (!usuario) {
      console.log('No existe el usuario elegido');
      return done(null, false, {message: 'El correo electronico no esta registrado, verifique si esta correctamente ingresado o registrese'})
    }

    if (!validPassword(usuario, password)) {
      console.log('La contraseña es invalida, Intente Nuevamente');
      return done(null, false, {message: 'La contraseña ingresada no es correcta, intente nuevamente'})
    }

    return done(null, usuario)
  }
)

export default {
  loginStrategy,
  registerStrategy
}
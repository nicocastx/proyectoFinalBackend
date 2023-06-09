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
import logger from '../config/logger.js'
import carritosRepo from '../model/Repos/carritosRepo.js'

const db = new usuariosRepo()
const dbCarts = new carritosRepo()

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
      logger.info('El usuario registrado ya existe');
      return done(null, false)
    }

    let pathFile = "";
    if (req.file) {
      pathFile = "/avatars/" + req.file.filename;
    } else {
      logger.warn("No se ha subido una foto de avatar a los datos");
    }

    const newUser = {
      username: username,
      password: createHash(password),
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nroTelefono: req.body.nroTelefono,
      urlAvatar: pathFile
    }

    const usuarioGuardado = await db.agregarUsuario(newUser)
    logger.info('Se creo el usuario');
    nodemailer.gmailRegistro(newUser)
    await dbCarts.guardarCarrito(usuarioGuardado.username)
    return done(null, newUser)
  })

const loginStrategy = new localStrategy(
  async (username, password, done) => {
    const usuarios = await db.getUsuarios()
    const usuario = usuarios.find(u => u.username == username)

    if (!usuario) {
      logger.info('No existe el usuario elegido');
      return done(null, false)
    }

    if (!validPassword(usuario, password)) {
      logger.info('La contraseña es invalida, Intente Nuevamente');
      return done(null, false)
    }

    return done(null, usuario)
  }
)

export default {
  loginStrategy,
  registerStrategy
}
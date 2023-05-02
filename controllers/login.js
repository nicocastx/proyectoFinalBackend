import service from '../services/login.js'
import multerUsuarios from '../services/uploads/multerUsuarios.js'

async function getLogin(req, res) {
  res.render("login")
}

const login = service.login

async function getRegister(req, res) {
  res.render('register')
}

const register = service.register

const guardarImgUsuario = multerUsuarios.single('avatar')

async function logout(req, res) {
  req.session.destroy()
  res.json({
    estado: 'Se borro la sesion actual'
  })
}

export default {
  getLogin,
  login,
  getRegister,
  register,
  logout,
  guardarImgUsuario
}
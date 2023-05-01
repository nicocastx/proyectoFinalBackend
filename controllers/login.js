import service from '../services/login.js'

async function getLogin(req, res) {
  res.render("login")
}

const login = service.login

async function getRegister(req, res) {
  res.render('register')
}

const register = service.register

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
  logout
}
import service from '../services/login.js'

async function getLogin(req, res){
  res.render("login")
}

const login = service.login

async function getRegister(req, res){
  res.render('register')
}

const register = service.register

export default {
  getLogin,
  login,
  getRegister,
  register
}
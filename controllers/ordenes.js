import services from '../services/ordenes.js'

async function getOrdenesEmail(req, res){
  const usuario = req.session.passport.user.email
  const ordenes = await services.getOrdenesPorEmail(usuario)
  res.json(ordenes)
}

async function guardarOrden(req, res){
  const usuario = req.session.passport.user
  await services.guardarOrden(usuario)
  res.redirect(200, '/ordenes')
}

export default {
  getOrdenesEmail,
  guardarOrden
}
async function renderMensajes(req, res){
  const usuario = req.session.passport.user
  res.render('chat', usuario)
}

export default {
  renderMensajes
}
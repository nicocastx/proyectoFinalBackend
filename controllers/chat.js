import services from '../services/chat.js'

async function renderMensajes(req, res){
  res.render('chat')
}

export default {
  renderMensajes
}
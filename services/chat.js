import MensajesRepo from "../model/Repos/mensajesRepo.js";

const db = new MensajesRepo()

async function getMensajes(){
  const mensajes = await db.getMensajes()
  return mensajes
}

async function guardarMensaje(email, mensaje){
  const mensajeGuardado = await db.guardarMensaje(email, mensaje)
  return mensajeGuardado
}

export default {
  getMensajes,
  guardarMensaje
}


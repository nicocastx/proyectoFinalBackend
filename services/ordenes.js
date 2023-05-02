import ordenesRepo from '../model/Repos/ordenesRepo.js'
import nodemailer from '../services/nodemailer.js'
import usuariosRepo from '../model/Repos/usuariosRepo.js'
import twilio from './twilio.js'


const db = new ordenesRepo()
const dbUsuarios = new usuariosRepo()

async function getOrdenesPorEmail(email){
 return await db.getOrdenesPorEmail(email)
}

async function guardarOrden(usuario){
  const usuarioCompleto = await dbUsuarios.getUsuarioPorEmail(usuario.email)
  console.log(usuarioCompleto);
  const ordenCreada =  await db.guardarOrden(usuario.email)
  //nodemailer.gmailOrden(usuario, ordenCreada)
  twilio.enviarMensajeOrdenGenerada(usuarioCompleto, ordenCreada)
  return ordenCreada
}

export default {
  getOrdenesPorEmail,
  guardarOrden
}
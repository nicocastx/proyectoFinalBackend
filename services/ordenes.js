import ordenesRepo from '../model/Repos/ordenesRepo.js'
import nodemailer from '../services/nodemailer.js'


const db = new ordenesRepo()

async function getOrdenesPorEmail(email){
 return await db.getOrdenesPorEmail(email)
}

async function guardarOrden(usuario){
  const ordenCreada =  await db.guardarOrden(usuario.email)
  nodemailer.gmailOrden(usuario, ordenCreada)
  return ordenCreada
}

export default {
  getOrdenesPorEmail,
  guardarOrden
}
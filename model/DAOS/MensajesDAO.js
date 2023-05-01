import modelMensajes from "../schemas/Mensajes.js";
import formatDTO from "../DTOS/MensajesDTO.js";
import config from '../../config/config.js'
import logger from "../../config/logger.js";

export default class MensajesDAO {
  async getMensajes() {
    const mensajes = await modelMensajes.find()
    return formatDTO(mensajes)
  }

  async guardarMensaje(email, cuerpo) {
    try {
      const mensajeABD = {
        email: email,
        tipo: email == config.GMAIL_ADDRESS ? 'sistema' : 'usuario',
        fechayHora: new Date().toLocaleString(),
        cuerpo: cuerpo
      }

      const mensajeGuardado = (await modelMensajes.insertMany(mensajeABD))[0]
      const mensajeFormato = { ...mensajeGuardado._doc, id: mensajeGuardado._id.toString() }
      return formatDTO(mensajeFormato)
    } catch (error) {
      logger.warn(error)
    }
  }
}
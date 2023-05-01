import DAOFactory from "../Factory/DAOFactory.js";

export default class MensajesRepo{
  constructor(){
    this.dao = new DAOFactory().getDao('mensajes')
  }

  async getMensajes(){
    return await this.dao.getMensajes()
  }

  async guardarMensaje(email, mensaje){
    return await this.dao.guardarMensaje(email, mensaje)
  }
}
import DAOFactory from "../Factory/DAOFactory.js";

export default class ordenesRepo{
  constructor(){
    this.dao = new DAOFactory().getDao('ordenes')
  }

  async getOrdenesPorEmail(email){
    return await this.dao.getOrdenesPorEmail(email)
  }

  async guardarOrden(email){
    return await this.dao.guardarOrden(email)
  }
}
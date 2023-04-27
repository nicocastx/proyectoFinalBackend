import DAOFactory from "../Factory/DAOFactory.js"

export default class CarritosRepo{
  constructor(){
    this.dao = new DAOFactory().getDao('carritos')
  }

  async getCarritoPorEmail(email){
    return await this.dao.getCarritoPorEmail(email)
  }

  async guardarCarrito(email, direccion){
    return await this.dao.guardarCarrito(email, direccion)
  }

  async eliminarCarrito(email){
    return await this.dao.eliminarCarrito(email)
  }

  async modificarDireccionCarrito(email, direccion){
    return await this.dao.modificarDireccionCarrito(email, direccion)
  }

  async guardarItemCarrito(email, idItem){
    return await this.dao.guardarItemCarrito(email, idItem)
  }

  async eliminarItemCarrito(email, idItem){
    return await this.dao.eliminarItemCarrito(email, idItem)
  }
}
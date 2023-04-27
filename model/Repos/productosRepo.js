import DAOFactory from "../Factory/DAOFactory.js";

export default class productosRepo{
  constructor(){
    this.dao = new DAOFactory().getDao('productos')
  }

  async getProductos(){
    return await this.dao.getProductos()
  }

   async getProducto(id){
    return await this.dao.getProducto(id)
  }

  async guardarProducto(newProd){
    return await this.dao.guardarProducto(newProd)
  }

  async modificarProducto(newProd, id){
    return await this.dao.modificarProducto(newProd, id)
  }

  async eliminarProducto(id){
    return await this.dao.eliminarProducto(id)
  }
}

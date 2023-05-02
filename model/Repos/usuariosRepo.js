import DAOFactory from "../Factory/DAOFactory.js";

export default class usuariosRepo{
  constructor(){
    this.dao = new DAOFactory().getDao('usuarios')
  }

  async getUsuarios(){
    return await this.dao.getUsuarios()
  }

  async agregarUsuario(user){
    return await this.dao.agregarUsuario(user)
  }

  async getUsuarioPorEmail(email){
    return await this.dao.getUsuarioPorEmail(email)
  }
}
import CarritosDAO from "../DAOS/CarritosDAO.js";
import productosDAO from "../DAOS/ProductosDAO.js";
import UsuariosDAO from "../DAOS/UsuariosDAO.js";

export default class DAOFactory{
  static dao
  getDao(option){
    let dao
    switch (option) {
      case 'productos':
        dao = new productosDAO()
        break;
      case 'usuarios':
        dao = new UsuariosDAO()
        break
      case 'carritos':
        dao = new CarritosDAO()
    }
    return dao
  }
}
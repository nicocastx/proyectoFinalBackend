import usuariosModel from "../schemas/Usuario.js";
import formatDTO from "../DTOS/UsuariosDTO.js";

class UsuariosDAO{
  async getUsuarios(){
    const usuarios = await usuariosModel.find()
    return formatDTO(usuarios)
  }

  async agregarUsuario(newUser){
    let usuarioAgregado = await usuariosModel.insertMany(newUser)
    return formatDTO(usuarioAgregado[0])
  }
}

export default UsuariosDAO
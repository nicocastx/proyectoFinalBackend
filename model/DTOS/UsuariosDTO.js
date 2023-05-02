class UsuarioDTO{
  constructor({username, password, nombre, apellido, nroTelefono, urlAvatar}){
    this.username = username
    this.password = password
    this.nombreCompleto = nombre + " " + apellido
    this.nroTelefono = nroTelefono
    this.urlAvatar = urlAvatar
  }
}

export default function formatDTO(users){
  if(Array.isArray(users)){
    return users.map(u => new UsuarioDTO(u))
  } else{
    return new UsuarioDTO(users)
  }
}
class MensajeDTO{
  constructor({id, email, tipo, fechayHora, cuerpo}){
    this.id = id
    this.email = email
    this.tipo = tipo
    this.fechayHora = fechayHora
    this.cuerpo = cuerpo
  }
}

export default function formatDTO(mensajes){
  if(Array.isArray(mensajes)){
    return mensajes.map(msj => new MensajeDTO(msj))
  } else{
    return new MensajeDTO(mensajes)
  }
}
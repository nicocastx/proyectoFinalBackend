class OrdenDTO{
  constructor({id, items, nroOrden, fechayHora, estado,direccion, email}){
    this.id = id
    this.items = items
    this.nroOrden = nroOrden
    this.fechayHora = fechayHora
    this.estado = estado
    this.direccion = direccion
    this.email = email
  }
}

export default function formatDTO(ordenes){
  if(Array.isArray(ordenes)){
    return ordenes.map(ord => new OrdenDTO(ord))
  } else{
    return new OrdenDTO(ordenes)
  }
}
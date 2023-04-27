class CarritoDTO{
  constructor({email, fechaHoraCreacion, items, direccion}){
    this.email = email
    this.fechaHoraCreacion = fechaHoraCreacion
    this.items = items
    this.direccion = direccion
  }
}

export default function formatDTO(carritos){
  if(Array.isArray(carritos)){
    return carritos.map(c => new CarritoDTO(c))
  } else{
    return new CarritoDTO(carritos)
  }
}
class ProductoDTO{
  constructor({id, nombre, img, precio, categoria}){
    this.id = id
    this.nombre = nombre
    this.img = img
    this.precio = precio
    this.categoria = categoria
  }
}

export default function formatDTO(productos){
  if(Array.isArray(productos)){
    return productos.map(producto=> new ProductoDTO(producto))
  } else {
    return new ProductoDTO(productos)
  }
}
import productosRepo from "../model/Repos/productosRepo.js"

const db = new productosRepo()

//lista todos los productos
async function getProductos(){
  const productos = await db.getProductos()
  return productos
}

async function getProducto(id){
  //buscar un productos en la BD por su ID
  const producto = await db.getProducto(id)
  return producto
}

async function guardarProducto(newProd){
  //Guarda un producto y lo devuelve
  const prodGuardado = await db.guardarProducto(newProd)
  return prodGuardado
}

async function modificarProducto(id, newProd){
  //buscar un producto por id y lo modifica, luego trae el nuevo producto
  const modProd = await db.modificarProducto(id, newProd)
  return modProd
}

async function eliminarProducto(id){
  //mediante id se busca un producto para borrar y se lo devuelve
  const elimProd = await db.eliminarProducto(id)
  return elimProd
}

async function filtrarCategoria(categoria){
  //Se busca todos los productos de la BD para luego filtrarlos y mandar un array con solo la categoria elegida
  const productos = await db.getProductos()
  const prodsFiltrados = productos.filter(prod => prod.categoria == categoria)
  return prodsFiltrados
}

export default {
  getProductos,
  getProducto,
  guardarProducto,
  modificarProducto,
  eliminarProducto,
  filtrarCategoria
}
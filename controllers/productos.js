import service from "../services/productos.js"

const getProductos =  async(req, res) =>{
  res.json(await service.getProductos())
}

const getProducto =  async(req, res) =>{
  const {id} = req.params
  const producto = await service.getProducto(id)
  console.log(producto);
  if(producto){
    
  }
  res.json(producto)
}

const modificarProducto =  async(req, res) =>{
  const {id} = req.params
  const prodMod = req.body
  const prod = await service.modificarProducto(id, prodMod)
  res.json(prod)

}

const guardarProducto =  async(req, res) =>{
  const newProd = req.body
  const prodGuardado = await service.guardarProducto(newProd)
  res.json(prodGuardado)
}

const eliminarProducto =  async(req, res) =>{
  const {id} = req.params
  const prodEliminado = await service.eliminarProducto(id)
  res.json(prodEliminado)
}

const getPorCategoria = async (req, res) =>{
  const {categoria} = req.params
  const prodFiltrados = await service.filtrarCategoria(categoria)
  res.json(prodFiltrados)
}

export default {
  getProductos,
  getProducto,
  guardarProducto,
  modificarProducto,
  eliminarProducto,
  getPorCategoria
}
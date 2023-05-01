import CarritosRepo from '../model/Repos/carritosRepo.js'

const db = new CarritosRepo()

async function getCarritoPorEmail(email){
  const carrito = await db.getCarritoPorEmail(email)
  return carrito
}

async function guardarCarrito(email){
  return await db.guardarCarrito(email)
}

async function eliminarCarrito(email){
  return await db.eliminarCarrito(email)
}

async function modificarDireccionCarrito(email, direccion){
  return await db.modificarDireccionCarrito(email, direccion)
}

async function eliminarItemCarrito(email, idItem){
  return await db.eliminarItemCarrito(email, idItem)
}

async function guardarItemCarrito(email, idItem){
  return await db.guardarItemCarrito(email, idItem)
}

export default {
  getCarritoPorEmail,
  guardarCarrito,
  eliminarCarrito,
  modificarDireccionCarrito,
  eliminarCarrito,
  eliminarItemCarrito,
  guardarItemCarrito
}
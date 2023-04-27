import modelCarritos from "../schemas/Carrito.js";
import formatDTO from "../DTOS/CarritosDTO.js";
import productosDAO from './ProductosDAO.js'

export default class CarritosDAO {
  //matodos asociados al manejo del carrito
  async getCarritoPorEmail(email) {
    const carrito = await modelCarritos.find({ email: email })
    if (!carrito[0]) {
      return {
        error: 'No se ha encontrado el carrito solicitado'
      }
    }
    return formatDTO(carrito[0])
  }

  async guardarCarrito(email, direccion) {
    const carrito = await this.getCarritoPorEmail(email)
    if (carrito.error == undefined) {
      console.log('ya existe un carrito asociado a esa cuenta');
      return carrito
    }
    const carritoGuardado = await modelCarritos.insertMany({
      email: email,
      fechaHoraCreacion: Date.now().toLocaleString(),
      items: [],
      direccion: direccion
    })
    return formatDTO(carritoGuardado)
  }

  async eliminarCarrito(email) {
    const carritoEliminado = await modelCarritos.deleteOne({ email: email })
    if (!carritoEliminado) {
      return {
        error: 'El carrito solicitado no existe'
      }
    }
    return true
  }

  async modificarDireccionCarrito(email, direccion) {
    const carritoModificado = await modelCarritos.findOneAndUpdate({ email: email }, {
      direccion: direccion
    }, { new: true })
    if (!carritoModificado) {
      return {
        error: 'El carrito solicitado no existe'
      }
    }
    return formatDTO(carritoModificado)
  }

  //Metodos asociados al manejo de los items del carrito

  async guardarItemCarrito(email, idItem) {
    const existeProducto = await new productosDAO().getProducto(idItem)
    if(existeProducto.error != undefined){
      return {
        error: 'El ID de producto ingresado no coincide con ningun producto en BD'
      }
    }
    const carritoExisteItem = (await modelCarritos.find({
      email: email,
      'items.idItem': idItem
    }))[0]

    if(carritoExisteItem){
      const idItemSumado = await modelCarritos.findOneAndUpdate(
      {
        email: email,
        'items.idItem': idItem
      },
      {
        $inc:{
          'items.$.cantidad': 1
        }
      }, {new: true})
      return formatDTO(idItemSumado)
    }
      const carritoItemAgregado = await modelCarritos.findOneAndUpdate({
        email: email
      }, {
        $push:
        {
          items: {
            idItem: idItem,
            cantidad: 1
          }
        }
      }, {new: true})
      if(!carritoItemAgregado){
        return {error: 'Ocurrio un error al intentar agregar el item'}
      }
      return formatDTO(carritoItemAgregado)
  }

  async eliminarItemCarrito(email, idItem) {
    const carritoExisteItem = (await modelCarritos.find({
      email: email,
      'items.idItem': idItem
    }))[0]
    console.log(carritoExisteItem);
    if(!carritoExisteItem){
      return {error: 'No se encontro el id de producto solicitado en ese carrito'}
    }
    const carritoProductoEliminado = await modelCarritos.findOneAndUpdate({
      email: email
    },
    {
      $pull:{
        items:{
          idItem: idItem
        }
      }
    }, {new: true})
    return formatDTO(carritoProductoEliminado)
  }
}
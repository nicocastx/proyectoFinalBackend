import mongoose from "mongoose"
import productosModel from "../schemas/producto.js"
import formatDTO from "../DTOS/productosDTO.js"
import logger from "../../config/logger.js"

export default class productosDAO {
  async getProductos() {
    return formatDTO(await productosModel.find())
  }

  async guardarProducto(producto) {
    let dataAdd = await productosModel(producto)
    dataAdd = { ...dataAdd._doc, id: dataAdd._id.toString() }
    await productosModel.insertMany(dataAdd)
    return formatDTO(dataAdd)
  }

  async getProducto(id) {
    try {
      const mongoID = new mongoose.Types.ObjectId(id)
      const producto = await productosModel.find({ _id: mongoID })
      if (!producto[0]) {
        return {
          error: 'No se ha encontrado el producto solicitado'
        }
      }
      return formatDTO(producto[0])
    } catch (error) {
      return {
        error: 'La ID recibida no esta en formato valido'
      }
    }

  }

  async modificarProducto(id, newProd) {
    try {
      const mongoId = new mongoose.Types.ObjectId(id)
      const productoModificado = await productosModel.findOneAndUpdate(mongoId, newProd, { new: true })
      if (!productoModificado) {
        return {
          error: 'No existe ningun producto para modificar con ese ID'
        }
      }
      return formatDTO(productoModificado)
    } catch (error) {
      logger.warn(error)
      return {
        error: 'Ocurrio un error con la operacion, verifique datos cargados y el ID del producto'
      }
    }
  }

  async eliminarProducto(id) {
try {
  const mongoId = new mongoose.Types.ObjectId(id)
  const productoBorrado = await productosModel.findByIdAndDelete({
    _id: mongoId
  })
  if (!productoBorrado) {
    logger.info(error)
    return {
      error: 'Ocurrio un error con la operacion, verifique datos cargados y el ID del producto'
    }
  }
  return formatDTO(productoBorrado)
} catch (error) {
  logger.warn(error)
  return {
    error: 'Ocurrio un error con la operacion, verifique datos cargados y el ID del producto'
  }
}
  }
}

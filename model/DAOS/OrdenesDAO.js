import modelOrden from "../schemas/Ordenes.js";
import formatDTO from "../DTOS/OrdenesDTO.js";
import CarritosDAO from './CarritosDAO.js'
import { Types } from "mongoose";

function asignarNroOrden(ordenes){
  if(ordenes.length == 0){
    return 0
  }
  const nroOrden = ordenes[ordenes.length - 1].nroOrden + 1

  return nroOrden
}

export default class OrdenesDAO{
  /**
   * 
   * @param {*} email 
   * @returns ordenes con formato en DTO
   */
  async getOrdenesPorEmail(email){
    const ordenesGuardadas = await modelOrden.find({email: email})
    return formatDTO(ordenesGuardadas)
  }

  /**
   * 
   * @param {*} email 
   * @returns Orden con formato en DTO
   */
  async guardarOrden(email){
    const carritoValidado = await new CarritosDAO().getCarritoPorEmail(email)
    if(carritoValidado.error != undefined){
      return {
        error: 'No se encontro el carrito asociado a ese mail'
      }
    }
    let itemsCarrito = 0
    carritoValidado.items.map(prod => itemsCarrito += prod.cantidad)
    if(carritoValidado.items.length < 1){
      return {
        error: 'No existen suficientes productos como para generar una orden'
      }
    }
    if(carritoValidado.direccion == ''){
      return {
        error: 'Se debe definir una direccion de entrega para las ordenes'
      }
    }

    const carritoItems = carritoValidado.items
    const nroOrden = asignarNroOrden(await this.getOrdenesPorEmail(email))
    
    const elNuevoOrden = {
      items: carritoItems,
      nroOrden: nroOrden,
      fechayHora: new Date().toLocaleString(),
      estado: 'generada',
      direccion: carritoValidado.direccion,
      email: email
    }

    const ordenGuardada = (await modelOrden.insertMany(elNuevoOrden))[0]

    const ordenFormato = {...ordenGuardada._doc, id: ordenGuardada._id.toString()} 

    return formatDTO(ordenFormato)
  }
}

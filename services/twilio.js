import twilio from 'twilio'
import config from '../config/config.js'
import logger from '../config/logger.js'
import productosRepo from '../model/Repos/productosRepo.js';
import CarritosRepo from '../model/Repos/carritosRepo.js';

const twilioClient = twilio(config.ACCSID, config.AUTHTOK)
const dbProductos = new productosRepo()
const dbCarts = new CarritosRepo()

function mostrarOrden(productosDeOrden){
  let ordenFormato = ''
  productosDeOrden.forEach(prod => {
    ordenFormato += `
    Nombre del producto: ${prod.nombre}

    Precio del producto: ${prod.precio}

    Cantidad del producto: ${prod.cantidad}

    ---------------------------------------
    `})
  return ordenFormato
}

function calcularTotal(productosDeOrden){
  let total = 0
  productosDeOrden.forEach(prod =>{
    total += prod.cantidad * prod.precio
  })
  return `$${total}`
}

async function enviarMensajeOrdenGenerada(cliente, orden){
  const productos = await dbProductos.getProductos();
  const productosDeOrden = orden.items.map(item => {
    const prod = productos.find(prod => prod.id === item.idItem);
    return { ...prod, cantidad: item.cantidad };
  });
  twilioClient.messages
  .create({
    body: `Nuevo pedido de ${cliente.username}
        Concepto:
        ${mostrarOrden(productosDeOrden)}
        Total: ${calcularTotal(productosDeOrden)}
      `,
    from: config.TWILIO_NUMBER,
    to: config.ADMIN_NUMBER,
  })
  .then((data) => logger.info(data));

  twilioClient.lookups.v1.phoneNumbers(cliente.nroTelefono).fetch()
  .then(
    nroTelefono =>{
      twilioClient.messages 
      .create({ 
         body: 'Su pedido ha sido generado exitosamente!',  
         messagingServiceSid: 'MG60f6c5140ed9522c87c29256c8c9862e',      
         to: nroTelefono
       }) 
      .then(data => logger.info(data))
    }
  )
  .catch(err =>
    logger.warn(`Es posible que el numero ingresado por el cliente no sea valido:
    ${err}
    `)
    )

    await dbCarts.eliminarCarrito(cliente.username)
}

export default {
  enviarMensajeOrdenGenerada
}
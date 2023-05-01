import nodemailer from 'nodemailer'
import config from '../config/config.js';
import productosRepo from '../model/Repos/productosRepo.js';

const dbProductos = new productosRepo()

function mostrarOrden(productosDeOrden){
  let ordenFormato = ''
  productosDeOrden.forEach(prod => {
    ordenFormato += `
    <p>Nombre del producto: ${prod.nombre}</p>
    <p>Precio del producto: ${prod.precio}</p>
    <p>Cantidad del producto: ${prod.cantidad}</p>
    <br>
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.GMAIL_ADDRESS,
    pass: config.GMAIL_PASS,
  },
});

async function gmailRegistro(newUser) {
  const contenido = {
    from: "Aviso de registro de nuevo usuario <no-reply@example.com>",
    to: `Muy buenas, administrador <${config.GMAIL_ADDRESS}>`,
    subject: `nuevo registro`,
    html: `<h1>AVISO: Se ha registrado un nuevo usuario</h1>
  <h2>El usuario registrado recientemente ha presentado los siguientes datos:</h2>
  <p>${JSON.stringify(newUser)}</p>
  `,
  }

  transporter
    .sendMail(contenido)
    .catch((err) => {
      console.log(err);
    });
}

async function gmailOrden(user, orden) {
  const productos = await dbProductos.getProductos();
  const productosDeOrden = orden.items.map(item => {
    const prod = productos.find(prod => prod.id === item.idItem);
    return { ...prod, cantidad: item.cantidad };
  });
  const contenido = {
    from: "Aviso de registro de compra de nuevo usuario <no-reply@example.com>",
    to: `Nuevo Pedido: de ${user.alias} email ${user.email}<${config.GMAIL_ADDRESS}>`,
    subject: `Se ha registado una nueva compra!`,
    html: `<h1>Se ha registrado la compra del siguiente usuario:</h1>
    <h2>${user.email}</h2>
    <h3>Los datos de la orden son:</h3>
    <b>ID de orden: </b> <p>${orden.id}</p>
    <b>Numero de Orden: </b> <p>${orden.nroOrden}</p>
    <b>Direccion de entrega: </b> <p>${orden.direccion}</p>
    <b>Fecha y Hora de la orden: </b> <p>${orden.fechayHora}</p>
    <b>Concepto de orden: </b>
    ${mostrarOrden(productosDeOrden)
    }
    <h2>Total a cobrar:</h2> <h3>${calcularTotal(productosDeOrden)}</h3>
    `,
  };
  transporter
    .sendMail(contenido)
    .catch((err) => {
      console.log(err);
    });
}

export default {
  gmailRegistro,
  gmailOrden
}
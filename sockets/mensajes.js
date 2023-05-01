import services from '../services/chat.js'

async function levantarIOMensajes(io) {
  return io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');
    socket.emit("mensajes", await services.getMensajes());
  
    socket.on("newMsj", async (nuevoMsj) => {
      await services.guardarMensaje(nuevoMsj.mail, nuevoMsj.cuerpo);
      const msjs = await services.getMensajes();
      io.sockets.emit("mensajes", msjs);
    });
  })
}

export default levantarIOMensajes
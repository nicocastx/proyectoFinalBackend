import services from '../services/chat.js'
import logger from '../config/logger.js';

async function levantarIOMensajes(io) {
  return io.on('connection', async (socket) => {
    logger.info('Nuevo cliente conectado');
    socket.emit("mensajes", await services.getMensajes());
  
    socket.on("newMsj", async (nuevoMsj) => {
      await services.guardarMensaje(nuevoMsj.email, nuevoMsj.cuerpo);
      const msjs = await services.getMensajes();
      io.sockets.emit("mensajes", msjs);
    });
  })
}

export default levantarIOMensajes
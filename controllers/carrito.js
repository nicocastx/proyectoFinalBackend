import services from '../services/carrito.js'

async function getCarritoPorEmail(req, res){
  const usuario = req.session.passport.user.email
  const carritoGuardado = await services.getCarritoPorEmail(usuario)
  if (carritoGuardado.error != undefined){
    const carritoCreado = await services.guardarCarrito(usuario)
    res.json(carritoCreado)
    return
  }
  res.json(carritoGuardado)
}

async function eliminarCarrito(req, res){
  const usuario = req.session.passport.user.email
  const carritoEliminado = await services.eliminarCarrito(usuario)
  if(!carritoEliminado){
    res.json({
      estado: 'No se consiguio borrar el carrito solicitado'
    })
    return
  }
  res.json({
    estado: 'El carrito se elimino correctamente'
  })
}

async function modificarDireccionCarrito(req, res){
  const usuario = req.session.passport.user.email
  const nuevaDireccion = req.body.direccion
  const carritoModificado = await services.modificarDireccionCarrito(usuario, nuevaDireccion)
  if(carritoModificado.error != undefined){
    res.json(carritoModificado)
  }
  res.redirect(200, '/carrito')
}

async function guardarItemCarrito(req, res){
  const usuario = req.session.passport.user.email
  const {idProducto} = req.params
  const agregadoProducto = await services.guardarItemCarrito(usuario, idProducto)
  if(agregadoProducto.error != undefined){
    res.json(agregadoProducto)
    return
  }
  res.redirect(302, '/carrito')
}

async function eliminarItemCarrito(req, res){
  const usuario = req.session.passport.user.email
  const {idProducto} = req.params
  const carritoConProductoEliminado = await services.eliminarItemCarrito(usuario, idProducto)
  if(carritoConProductoEliminado.error != undefined){
    res.json(carritoConProductoEliminado)
    return
  }
  res.redirect(200, '/carrito')
}

export default {
  getCarritoPorEmail,
  eliminarCarrito,
  modificarDireccionCarrito,
  guardarItemCarrito,
  eliminarItemCarrito
}
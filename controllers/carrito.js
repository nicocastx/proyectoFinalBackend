import services from '../services/carritos.js'

async function getCarritoPorEmail(req, res){
  const carritoCreado = await services.getCarritoPorEmail()
}

/**
 * 
 * 
router.get('/', controller.getCarritoPorEmail)

router.post('/:idProducto', controller.agregarProductoCarrito)

router.delete('/', controller.eliminarCarrito)

router.delete('/:idProducto', controller.eliminarProductoCarrito)
 */
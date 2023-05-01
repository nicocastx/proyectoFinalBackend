import controller from '../controllers/carrito.js'
import { Router } from 'express'

const router = new Router()

router.get('/', controller.getCarritoPorEmail)

router.delete('/', controller.eliminarCarrito)

router.put('/', controller.modificarDireccionCarrito)

router.post('/:idProducto', controller.guardarItemCarrito)

router.delete('/:idProducto', controller.eliminarItemCarrito)

export default router
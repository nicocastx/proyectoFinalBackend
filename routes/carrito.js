import controller from '../controllers/carrito.js'
import { Router } from 'express'

const router = new Router()

router.get('/', controller.getCarritoPorEmail)

router.post('/:idProducto', controller.agregarProductoCarrito)

router.delete('/', controller.eliminarCarrito)

router.delete('/:idProducto', controller.eliminarProductoCarrito)
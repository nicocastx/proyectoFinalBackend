import { Router } from 'express'
import controller from '../controllers/ordenes.js'

const router = new Router()

router.get('/', controller.getOrdenesEmail)

router.post('/', controller.guardarOrden)

export default router
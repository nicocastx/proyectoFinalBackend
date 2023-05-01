import { Router } from "express";
import controller from '../controllers/chat.js'

const router = new Router()

router.get('/', controller.renderMensajes)

export default router
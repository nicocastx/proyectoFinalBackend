import { Router } from "express";
import controller from "../controllers/login.js"

const router = new Router()

router.get("/", controller.getLogin)

router.post('/', controller.login)

router.get('/register', controller.getRegister)

router.post('/register', controller.guardarImgUsuario, controller.register)

router.get('/logout', controller.logout)

export default router
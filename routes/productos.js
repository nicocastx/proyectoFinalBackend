import { Router } from "express";
import controller from "../controllers/productos.js"

const router = new Router()

router.get("/", controller.getProductos)

router.get("/:id", controller.getProducto)

router.post("/", controller.guardarProducto)

router.put("/:id", controller.modificarProducto)

router.delete("/:id", controller.eliminarProducto)

router.get('/buscar/:categoria', controller.getPorCategoria)

export default router
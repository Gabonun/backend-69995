import express from "express";
import * as productControler from "../controllers/product.controller.js";

const router = express.Router();

//Listar todos los productos
router.get("/", productControler.obtenerProductos);

//Traer solo un producto x ID
router.get("/:pid", productControler.obtenerProductoxId);

//Agregar nuevo producto
router.post("/", productControler.agregarProducto);

//Actualizar x ID
router.put("/:pid", productControler.actualizarProducto);

//Eliminar producto x ID
router.delete("/:pid", productControler.eliminarProducto);

export default router;
import express from "express";
import * as cartController from "../controllers/carts.controller.js";

const router = express.Router();

//POST -> CREAR CARRITO
router.post("/", cartController.crearCarrito);

//GET -> LISTAR TODOS LOS CARRITOS
router.get("/", cartController.obtenerCarritos);

//GET --> LISTAR PRODUCTOS DEL CARRITO x ID
router.get("/:cid", cartController.obtenerCarritoxID);

//POST --> AGREGAR PRODUCTOS AL CARRITO
router.post("/:cid/product/:pid", cartController.agregarProductoCarrito);

//DELETE --> ELIMINAR CARRITO POR ID (VACIAR CARRITO)
router.delete("/:cid", cartController.vaciarCarrito);

//PUT --> ACTUALIZAR CARRITO POR ID
router.put("/:cid", cartController.actualizarCarrito);

//DELETE --> ELIMINAR UN PRODUCTO POR ID
router.delete("/:cid/product/:pid", cartController.eliminarProductoCarrito);

//PUT --> ACTUALIZAR CANTIDAD DE PRODUCTO EN CARRITO
router.put("/:cid/product/:pid", cartController.actualizarCantidadProductoCarrito);

export default router;

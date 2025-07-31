import { Router } from "express";
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from "../controllers/producto.controllers.js";
const router = Router();

// GET all productos
router.get("/", obtenerProductos);

// POST crear nuevo
router.post("/", crearProducto);

// PUT actualizar
router.put("/:id", actualizarProducto);

// DELETE eliminar
router.delete("/:id", eliminarProducto);

export default router;
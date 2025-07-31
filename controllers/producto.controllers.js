import Producto from "../models/Producto.js";

export const obtenerProductos = async (req, res) => {
  const productos = await Producto.find().sort({ createdAt: -1 });
  res.json(productos);
};

export const crearProducto = async (req, res) => {
    const nuevo = new Producto(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
}

export const actualizarProducto = async (req, res) => {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(actualizado);
}

export const eliminarProducto = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado"});
}

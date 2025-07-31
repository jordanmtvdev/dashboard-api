import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String },
    categoria: { type: String },
    stock: { type: Number, default: 0 },
    imagen: { type: String },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Producto", productoSchema);
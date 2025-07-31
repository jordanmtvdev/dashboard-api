import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    rol: {
      type: String,
      required: true,
      enum: ["Admin", "Editor", "Invitado"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;

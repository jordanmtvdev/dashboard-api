import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener usuarios: ", err);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

import bcrypt from "bcryptjs";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, rol, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // 👈 Hasheo aquí

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      rol,
      password: hashedPassword, // 👈 Asegúrate de que esté bien aquí
    });

    await nuevoUsuario.save();

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.error("Error al crear usuario: ", err);
    res.status(500).json({ message: "Error del servidor" });
  }
};



export const actualizarUsuario = async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (err) {
    console.error("Error al actualizar usuario: ", err);
    res.status(500).json({ message: "Error del sevidor" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error("Error al eliminar usuario: ", err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

import Usuario from "../models/Usuario.js";

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener usuarios: ", err);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error("Error al crear usuario: ", err);
    res.status(500).json({ message: "Error del sevidor" });
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
        res.json({ message: "Usuario eliminado"});
    } catch (err) {
        console.error("Error al eliminar usuario: ", err);
        res.status(500).json({ message: "Error del servidor"});        
    }
}

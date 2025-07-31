import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    // Validar campos básicos
    if (!nombre || !correo || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    // Revisar si el correo ya existe
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      rol: "Invitado",
      password: hashedPassword,
    });

    const guardado = await nuevoUsuario.save();

    const token = jwt.sign(
      {
        id: guardado._id,
        nombre: guardado.nombre,
        correo: guardado.correo,
        rol: guardado.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      token,
      usuario: {
        _id: guardado._id,
        nombre: guardado.nombre,
        correo: guardado.correo,
        rol: guardado.rol,
      },
    });
  } catch (err) {
    console.error("Error al registrar usuario: ", err);
    res.status(500).json({ message: "Error del servidor." });
  }
};

export const loginController = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // 1. Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    // 2. Comparar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    // 3. Crear token
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    console.error("Error en login: ", err);
    res.status(500).json({ mensaje: "Error al iniciar sesión." });
  }
};

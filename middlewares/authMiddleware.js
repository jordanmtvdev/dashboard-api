import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // 1. Leer el token desde el encabezado Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "No autorizado. Token faltante." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Adjuntar info del usuario al request (útil en controladores)
    req.usuario = decoded;

    next(); // Todo OK, continúa
  } catch (err) {
    console.error("Token inválido: ", err.message);
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};

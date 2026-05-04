export const authMiddleware = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  
  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  // Opcional: Agregar el userId al objeto req para un acceso más fácil
  req.userId = userId;
  
  next();
};

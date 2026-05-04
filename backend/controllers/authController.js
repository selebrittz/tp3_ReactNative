import { findUserByUsername, createUser } from '../models/userModel.js';

export const register = (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username y Password son obligatorios' });
  }

  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  const user = createUser(username, password);
  res.status(201).json(user);
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y Password son obligatorios' });
  }

  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // En un sistema real usaríamos JWT. Aquí devolvemos el usuario básico.
  res.json({ id: user.id, username: user.username });
};

import { getAllBooks, getBookById, addBook, updateBook as editBook, deleteBook as removeBook } from '../models/bookModel.js';
import { findUserById } from '../models/userModel.js';

export const getBooks = (req, res) => {
  const userId = req.userId;
  
  // Devuelve toda la comunidad
  const books = getAllBooks();
  res.json(books);
};

export const getBook = (req, res) => {
  const userId = req.userId;
  
  const book = getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  res.json(book);
};

export const createBook = (req, res) => {
  const userId = req.userId;

  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'El campo "title" es obligatorio' });
  }
  
  const user = findUserById(userId);
  if (!user) return res.status(401).json({ error: 'Usuario inválido' });

  const newBook = addBook(title, description, userId, user.username);
  res.status(201).json(newBook);
};

export const updateBook = (req, res) => {
  const userId = req.userId;

  const { id } = req.params;
  const { title, description } = req.body;
  
  if (title === '') {
    return res.status(400).json({ error: 'El campo "title" no puede estar vacío' });
  }

  const updatedBook = editBook(id, { title, description }, userId);
  
  if (!updatedBook) {
    return res.status(404).json({ error: 'Libro no encontrado o no tienes permiso para editarlo' });
  }
  
  res.json(updatedBook);
};

export const deleteBook = (req, res) => {
  const userId = req.userId;

  const { id } = req.params;
  const success = removeBook(id, userId);
  
  if (!success) {
    return res.status(404).json({ error: 'Libro no encontrado o no tienes permiso para eliminarlo' });
  }
  
  res.json({ message: 'Libro eliminado exitosamente' });
};

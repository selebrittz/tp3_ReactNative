import express from 'express';
import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Aplicar middleware a todas las rutas de libros
router.use(authMiddleware);

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;

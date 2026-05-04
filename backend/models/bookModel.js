let books = [];

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getAllBooks = () => {
  // Comunidad: Devuelve TODOS los libros de TODOS los usuarios
  return books;
};

export const getBookById = (id) => {
  return books.find(b => b.id === id);
};

export const addBook = (title, description, userId, username) => {
  const newBook = {
    id: generateId(),
    userId,
    username,  // Para mostrar quién lo recomendó
    title,
    description: description || '',
    createdAt: new Date().toISOString()
  };
  books.push(newBook);
  return newBook;
};

export const updateBook = (id, updates, userId) => {
  const bookIndex = books.findIndex(b => b.id === id && b.userId === userId);
  if (bookIndex === -1) return null;

  const updatedBook = {
    ...books[bookIndex],
    ...updates,
    title: updates.title !== undefined ? updates.title : books[bookIndex].title,
    description: updates.description !== undefined ? updates.description : books[bookIndex].description
  };
  
  books[bookIndex] = updatedBook;
  return updatedBook;
};

export const deleteBook = (id, userId) => {
  const bookIndex = books.findIndex(b => b.id === id && b.userId === userId);
  if (bookIndex === -1) return false;
  
  books.splice(bookIndex, 1);
  return true;
};

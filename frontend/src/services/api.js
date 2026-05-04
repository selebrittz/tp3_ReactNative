const API_URL = 'http://localhost:3000/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('tp2_user'));
  return {
    'Content-Type': 'application/json',
    ...(user ? { 'x-user-id': user.id } : {})
  };
};

// Auth
export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
  return data;
};

export const register = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al registrarse');
  return data;
};

// Books
export const getBooks = async () => {
  const res = await fetch(`${API_URL}/books`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener recomendaciones');
  return data;
};

export const createBook = async (book) => {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(book),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al publicar recomendación');
  return data;
};

export const updateBook = async (id, book) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(book),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al editar recomendación');
  return data;
};

export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al eliminar recomendación');
  return data;
};

import { createContext, useReducer, useContext } from "react";

// Creamos el Contexto global para las reseñas de libros.
const BookContext = createContext();

// Estado inicial del reducer. Aquí guardamos los datos principales de la app.
const initialState = {
  books: [], // lista de recomendaciones
  loading: false, // indicador de carga para llamadas asíncronas
  error: null, // mensaje de error general
  bookToEdit: null, // libro que estamos editando actualmente
};

// Reducer que recibe el estado actual y una acción para devolver un nuevo estado.
function bookReducer(state, action) {
  switch (action.type) {
    case "SET_BOOKS":
      // Cargar todas las recomendaciones desde el backend.
      return { ...state, books: action.payload, loading: false, error: null };

    case "ADD_BOOK":
      // Agregar una nueva recomendación al inicio de la lista.
      return { ...state, books: [action.payload, ...state.books] };

    case "UPDATE_BOOK":
      // Reemplazar el libro editado en la lista.
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
      };

    case "DELETE_BOOK":
      // Eliminar una recomendación por su id.
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case "SET_LOADING":
      // Actualizar indicador de carga.
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      // Guardar un mensaje de error y terminar la carga.
      return { ...state, error: action.payload, loading: false };

    case "SET_BOOK_TO_EDIT":
      // Almacenar el libro que vamos a editar.
      return { ...state, bookToEdit: action.payload };

    default:
      return state;
  }
}

export function BookProvider({ children }) {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks debe ser usado dentro de un BookProvider");
  }
  return context;
}

# Implementación de Context API y useReducer

Este proyecto ha sido actualizado para incorporar un estado global utilizando **Context API** y **useReducer** en React, de acuerdo a los requerimientos del Trabajo Práctico N°2.

## Resumen de la Implementación

### 1. Creación del Contexto (`BookContext.jsx`)
Se creó el archivo `src/context/BookContext.jsx` que contiene:
- `createContext`: Para definir el contexto global `BookContext`.
- `bookReducer`: Una función reductora que maneja las distintas acciones sobre el estado de los libros (recomendaciones).
- `BookProvider`: Un componente proveedor que envuelve a los componentes hijos y les proporciona el estado y la función `dispatch`.
- `useBooks`: Un hook personalizado para facilitar el consumo del contexto en cualquier componente.

### 2. Acciones del Reducer
El `bookReducer` maneja las siguientes acciones mínimas requeridas:
- `ADD_BOOK`: Agrega un nuevo elemento al inicio de la lista de libros.
- `UPDATE_BOOK`: Edita un elemento existente mediante su ID.
- `DELETE_BOOK`: Elimina un elemento de la lista por su ID.
Además, se incluyeron acciones para inicializar la lista (`SET_BOOKS`), controlar la carga (`SET_LOADING`), el manejo de errores (`SET_ERROR`) y la selección del libro a editar (`SET_BOOK_TO_EDIT`).

### 3. Integración en la Aplicación
- **Proveedor en `main.jsx`**: Se envolvió el componente principal `<App />` dentro de `<BookProvider>`, haciendo que el estado global esté disponible en todo el árbol de componentes.
- **Refactorización en `App.jsx`**:
  - Se eliminaron los múltiples estados locales `useState` (como `books`, `loading`, `error` y `bookToEdit`) que manejaban la información principal.
  - Se implementó el hook `useBooks` para obtener `state` y `dispatch` desde el contexto global.
  - Las funciones que interactúan con la API (`loadBooks`, `handleCreateOrUpdate`, `handleDelete`) ahora despachan (dispatch) las acciones correspondientes al reducer para actualizar la interfaz.

De este modo, se ha centralizado el manejo del estado principal, mejorando la organización del código y el flujo de datos de la aplicación.

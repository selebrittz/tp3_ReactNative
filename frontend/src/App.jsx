import { useState, useEffect, useMemo, useCallback } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import Auth from "./components/Auth";
import * as api from "./services/api";
import { useBooks } from "./context/BookContext";

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // useBooks nos da acceso al estado global y a dispatch para cambiarlo.
  const { state, dispatch } = useBooks();
  const { books, loading, error, bookToEdit } = state;

  useEffect(() => {
    const savedUser = localStorage.getItem("tp2_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadBooks();
    }
  }, [user, loadBooks]);

  const handleLogin = async (username, password, isLogin) => {
    const data = isLogin
      ? await api.login(username, password)
      : await api.register(username, password);

    setUser(data);
    localStorage.setItem("tp2_user", JSON.stringify(data));
  };

  const handleLogout = useCallback(() => {
    setUser(null);
    dispatch({ type: "SET_BOOKS", payload: [] });
    localStorage.removeItem("tp2_user");
  }, [dispatch]);

  const loadBooks = useCallback(async () => {
    try {
      // Indicador de carga global antes de la llamada al backend.
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await api.getBooks();
      // Recomendaciones más recientes primero
      dispatch({
        type: "SET_BOOKS",
        payload: data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      if (err.message.includes("No autorizado")) handleLogout();
    }
  }, [dispatch, handleLogout]);

  const handleCreateOrUpdate = useCallback(
    async (bookData) => {
      try {
        if (bookToEdit) {
          // Editar un elemento existente usando la acción UPDATE_BOOK.
          const updated = await api.updateBook(bookToEdit.id, bookData);
          dispatch({ type: "UPDATE_BOOK", payload: updated });
          dispatch({ type: "SET_BOOK_TO_EDIT", payload: null });
        } else {
          // Agregar un nuevo elemento usando la acción ADD_BOOK.
          const created = await api.createBook(bookData);
          dispatch({ type: "ADD_BOOK", payload: created });
        }
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    },
    [bookToEdit, dispatch],
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await api.deleteBook(id);
        dispatch({ type: "DELETE_BOOK", payload: id });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    },
    [dispatch],
  );

  const handleSetBookToEdit = useCallback(
    (book) => {
      dispatch({ type: "SET_BOOK_TO_EDIT", payload: book });
    },
    [dispatch],
  );

  const handleCancelEdit = useCallback(() => {
    dispatch({ type: "SET_BOOK_TO_EDIT", payload: null });
  }, [dispatch]);

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const filteredBooks = useMemo(
    () =>
      books.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (b.username &&
            b.username.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    [books, searchTerm],
  );

  const totalBooks = useMemo(() => books.length, [books]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-slate-50 py-10 px-4 font-sans text-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[42%] h-[42%] rounded-full bg-orange-300 blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[42%] h-[42%] rounded-full bg-amber-300 blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-yellow-300 blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-10">
          <div className="rounded-[2rem] border border-white/80 bg-white/90 backdrop-blur-xl shadow-2xl p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 mb-3">
                  Comunidad Wattpad
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Comparte tu próxima lectura favorita
                </h1>
                <p className="text-base leading-7 text-slate-600">
                  Agrega reseñas, edita tus recomendaciones y explora lo mejor
                  que la comunidad sugiere. Todo el estado está gestionado con
                  Context API y useReducer.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="rounded-3xl border border-orange-100 bg-orange-50 px-5 py-4 shadow-sm">
                  <p className="text-sm text-slate-500">Bienvenido, lector</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {user.username}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/40 transition hover:bg-slate-800"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_auto]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/80 bg-white/90 backdrop-blur-xl shadow-2xl p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                {bookToEdit ? "Editar reseña" : "Recomendar libro"}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Comparte el título y tu opinión. Tus recomendaciones también se
                pueden editar o eliminar.
              </p>
              <BookForm
                onSubmit={handleCreateOrUpdate}
                bookToEdit={bookToEdit}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/90 backdrop-blur-xl shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Tu actividad
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Recomendaciones
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {totalBooks}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Búsqueda actual
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {filteredBooks.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/90 backdrop-blur-xl shadow-2xl p-8 flex flex-col">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Feed de lecturas
                </h2>
                <p className="text-sm text-slate-500">
                  Explora las recomendaciones más recientes de la comunidad.
                </p>
              </div>
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            </div>

            <div className="mb-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              {totalBooks > 0 ? (
                <span>
                  Mostrando{" "}
                  <strong className="text-slate-900">
                    {filteredBooks.length}
                  </strong>{" "}
                  de <strong className="text-slate-900">{totalBooks}</strong>{" "}
                  recomendaciones
                </span>
              ) : (
                <span>
                  Aún no hay recomendaciones. Agrega la primera reseña arriba.
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <BookList
                books={filteredBooks}
                currentUser={user}
                onEdit={handleSetBookToEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

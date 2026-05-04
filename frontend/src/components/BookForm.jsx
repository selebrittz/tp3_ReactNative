import { memo, useState, useEffect, useCallback } from "react";

const BookForm = ({ onSubmit, bookToEdit, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setDescription(bookToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [bookToEdit]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title.trim()) return;

      onSubmit({ title, description });

      if (!bookToEdit) {
        setTitle("");
        setDescription("");
      }
    },
    [title, description, onSubmit, bookToEdit],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          className="block text-sm font-semibold text-slate-700 mb-2"
          htmlFor="title"
        >
          Título del libro <span className="text-orange-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: A través de mi ventana"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-slate-800 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          required
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="description"
          >
            ¿Por qué lo recomiendas?
          </label>
          <span className="text-xs text-slate-400">Opcional</span>
        </div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Comparte lo que más te gustó..."
          rows="5"
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-800 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none"
        ></textarea>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="flex-1 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-orange-200/60 transition-transform duration-200 hover:scale-[1.01]"
        >
          {bookToEdit ? "Actualizar recomendación" : "Publicar recomendación"}
        </button>

        {bookToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
};

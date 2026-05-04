import { memo } from "react";

const BookItem = ({ book, currentUser, onEdit, onDelete }) => {
  // Solo se puede editar/borrar si el usuario actual es el dueño
  const isOwner = currentUser && currentUser.id === book.userId;

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/95 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a3 3 0 00-3 3v14a3 3 0 006 0V5a3 3 0 00-3-3zm0 18a1 1 0 01-1-1V5a1 1 0 112 0v14a1 1 0 01-1 1z" />
              </svg>
              Lectura
            </span>
            <span className="text-xs text-slate-400">
              @{book.username || "Anónimo"}
            </span>
          </div>

          {book.createdAt && (
            <span className="text-xs text-slate-400">
              {new Date(book.createdAt).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-semibold text-slate-900 leading-tight tracking-tight mb-3">
          {book.title}
        </h3>

        {book.description ? (
          <p className="text-sm leading-7 text-slate-600 border-l-2 border-orange-200 pl-4 py-1">
            {book.description}
          </p>
        ) : (
          <p className="text-sm leading-7 text-slate-500 italic">
            Sin descripción adicional.
          </p>
        )}

        {isOwner && (
          <div className="mt-6 flex flex-wrap items-center gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onEdit(book)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:text-amber-600"
              title="Editar recomendación"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
              title="Eliminar recomendación"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(BookItem);

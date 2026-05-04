import { memo } from "react";
import BookItem from "./BookItem";

const BookList = ({ books, currentUser, onEdit, onDelete }) => {
  if (books.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-12 text-slate-400">
        <svg
          className="w-16 h-16 text-slate-200 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <p className="text-lg font-medium text-slate-500">
          Aún no hay recomendaciones
        </p>
        <p className="text-sm">¡Sé el primero en recomendar una lectura!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto pr-2 -mr-2 space-y-4">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          currentUser={currentUser}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default memo(BookList);

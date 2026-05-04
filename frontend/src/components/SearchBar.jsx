import { memo, useCallback } from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  const handleChange = useCallback(
    (e) => onSearch(e.target.value),
    [onSearch],
  );

  return (
    <div className="relative w-full sm:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar recomendaciones..."
        value={searchTerm}
        onChange={handleChange}
        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-full bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent sm:text-sm transition-all duration-200"
      />
    </div>
  );
};

export default memo(SearchBar);

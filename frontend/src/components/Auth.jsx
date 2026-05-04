import { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onLogin(username, password, isLogin);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Abstract shapes behind */}
        <div className="absolute top-0 -left-6 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>

        <div className="relative bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl p-8 sm:p-10 border border-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">
              Wattpad Base
            </h1>
            <p className="text-slate-500 font-medium tracking-wide">
              {isLogin ? 'Ingresa a la comunidad' : 'Únete a los lectores'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="username">
                Usuario Lector
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej: lector_fan_123"
                className="w-full px-5 py-3 rounded-xl bg-orange-50/50 border border-orange-100 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-xl bg-orange-50/50 border border-orange-100 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl p-[1px] bg-gradient-to-r from-orange-500 to-amber-500 shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative flex items-center justify-center px-4 py-3 text-white font-bold tracking-wider uppercase text-sm transition-all duration-300">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  isLogin ? 'Iniciar Sesión' : 'Registrarse'
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-orange-600 hover:text-orange-700 text-sm font-bold transition-colors"
            >
              {isLogin ? '¿No guardaste tu libro favorito? Regístrate' : '¿Ya eres miembro? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

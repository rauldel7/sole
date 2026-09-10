import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Logga in</h1>
      <p className="text-neutral-500 text-center mb-8">Välkommen tillbaka till SOLE</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">E-post</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:border-neutral-900 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Lösenord</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:border-neutral-900 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-900 text-white py-3.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-6">
        Har du inget konto?{' '}
        <Link to="/register" className="font-medium text-neutral-900 hover:underline">
          Registrera dig
        </Link>
      </p>
    </div>
  );
}

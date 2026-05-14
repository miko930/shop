import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBuildingStore, IconMail, IconLock, IconLogin } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      navigate('/admin', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-dark via-teal to-teal-mid p-4">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
      <div className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-accent/10" />

      <div className="relative w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/10">
            <IconBuildingStore size={28} className="text-teal" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">TAMADDISS</h1>
          <p className="text-sm text-white/60">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/20"
        >
          <h2 className="mb-1 text-lg font-extrabold text-teal-dark">Welcome Back</h2>
          <p className="mb-6 text-[13px] text-gray">Sign in to manage your store</p>

          <div className="mb-4">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border-2 border-border px-3 py-2.5 transition-colors focus-within:border-teal">
              <IconMail size={16} className="text-gray" />
              <input
                type="email"
                placeholder="admin@tamaddiss.et"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-teal-dark outline-none placeholder:text-gray/50"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border-2 border-border px-3 py-2.5 transition-colors focus-within:border-teal">
              <IconLock size={16} className="text-gray" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-teal-dark outline-none placeholder:text-gray/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 text-sm font-bold text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <IconLogin size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          © 2026 TAMADDISS — Addis Ababa, Ethiopia
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sword } from 'lucide-react';
import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      setToken(response.data.token);
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sword className="w-12 h-12 text-neon-cyan" />
          </div>
          <h1 className="text-3xl font-bold text-primary-text mb-2">CodeQuest</h1>
          <p className="text-secondary-text">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-secondary-bg border border-border-color rounded-lg p-8">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-primary-text mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary text-primary-bg font-semibold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="mt-4 text-center text-sm text-secondary-text">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-neon-cyan hover:underline">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


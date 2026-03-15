'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sword } from 'lucide-react';
import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    referralCode: searchParams?.get('ref') || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ref = searchParams?.get('ref');
    if (ref) {
      setFormData((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        referralCode: formData.referralCode || undefined,
      });
      setToken(response.data.token);
      toast.success('Conta criada com sucesso!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao criar conta');
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
          <p className="text-secondary-text">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-secondary-bg border border-border-color rounded-lg p-8">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-primary-text mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-primary-text mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-primary-text mb-2"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="referralCode"
              className="block text-sm font-medium text-primary-text mb-2"
            >
              Código de Convite <span className="text-secondary-text text-xs">(opcional)</span>
            </label>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Digite o código de convite"
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
            />
            <p className="text-xs text-secondary-text mt-1">
              Ganhe 100 XP de bônus ao se cadastrar com um código de convite!
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary text-primary-bg font-semibold py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>

          <p className="mt-4 text-center text-sm text-secondary-text">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-neon-cyan hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


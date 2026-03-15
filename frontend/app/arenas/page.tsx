"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/swrFetcher';

interface Arena {
  id: string;
  name: string;
  description?: string;
  competitions: Array<{ id: string; prize?: string; winnerId?: string }>;
}

function ArenaCreateForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('http://localhost:5000/api/arenas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Erro ao criar arena');
      setLoading(false);
      return;
    }
    setName('');
    setDescription('');
    setLoading(false);
    if (onCreated) onCreated();
  };

  return (
    <form className="mb-6 p-4 border border-border-color rounded bg-secondary-bg shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Criar Arena</h2>
      <div className="mb-2">
        <label className="block text-sm">Nome</label>
        <input className="border border-border-color rounded w-full p-2 bg-primary-bg text-secondary-text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Descrição</label>
        <input className="border border-border-color rounded w-full p-2 bg-primary-bg text-secondary-text" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button className="bg-tech-purple text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Arena'}
      </button>
    </form>
  );
}

export default function ArenasPage() {
  const { data: arenas, isLoading, mutate } = useSWR<Arena[]>('http://localhost:5000/api/arenas', fetcher);

  const [showForm, setShowForm] = React.useState(false);
  const [search, setSearch] = React.useState('');

  if (isLoading) return <div>Carregando arenas...</div>;

  const arenaList = Array.isArray(arenas) ? arenas : [];
  const filteredArenas = arenaList.filter(arena =>
    arena.name.toLowerCase().includes(search.toLowerCase()) ||
    (arena.description && arena.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Importação dinâmica do Navbar
  const Navbar = require('../../components/Navbar').default;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Arenas</h1>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar arena..."
            className="border border-tech-purple rounded px-4 py-2 bg-primary-bg text-primary-text placeholder-secondary-text w-full"
          />
          <button
            className="bg-tech-purple text-white font-semibold px-6 py-2 rounded hover:opacity-90 transition-opacity"
            onClick={() => setShowForm(true)}
          >Criar Arena</button>
        </div>
        {showForm && (
          <ArenaCreateForm
            onCreated={() => {
              mutate();
              setShowForm(false);
            }}
          />
        )}
        <h2 className="text-lg font-bold mb-4 mt-8">Lista de Arenas</h2>
        {filteredArenas.length === 0 ? (
          <div className="text-secondary-text">Nenhuma arena encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArenas.map(arena => (
              <div key={arena.id} className="bg-secondary-bg border border-border-color rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-200">
                <a href={`/arenas/${arena.id}`} className="block font-bold text-xl text-tech-purple hover:text-neon-cyan mb-2 underline-offset-2 hover:underline">
                  {arena.name}
                </a>
                <div className="text-base text-gray-700 mb-4">{arena.description || 'Sem descrição'}</div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Competições: {arena.competitions.length}</span>
                  <span className="text-xs text-gray-400">ID: {arena.id.slice(0, 6)}...</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

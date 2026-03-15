import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../lib/swrFetcher';

export default function CompetitionCreateForm({ arenaId, onCreated }: { arenaId: string; onCreated?: () => void }) {
  const [selectedGuilds, setSelectedGuilds] = useState<string[]>([]);
  const [prize, setPrize] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // ...existing code...
  const { data: guilds, isLoading } = useSWR('http://localhost:5000/api/guilds', fetcher);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (selectedGuilds.length < 3) {
      setError('Selecione pelo menos 3 guildas para competir.');
      setLoading(false);
      return;
    }
    const res = await fetch('http://localhost:5000/api/arenas/competition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ arenaId, guildIds: selectedGuilds, prize }),
    });
    if (!res.ok) {
      setError('Erro ao criar competição');
      setLoading(false);
      return;
    }
    setSelectedGuilds([]);
    setPrize('');
    setLoading(false);
    if (onCreated) onCreated();
  };

  return (
    <form className="mb-6 p-4 border border-tech-purple rounded bg-secondary-bg shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Criar Competição</h2>
      <div className="mb-2">
        <label className="block text-sm">Selecione no mínimo 3 guildas participantes</label>
        {isLoading ? (
          <div>Carregando guildas...</div>
        ) : guilds && Array.isArray(guilds) ? (
          <select
            multiple
            className="border rounded w-full p-2 bg-primary-bg text-primary-text"
            value={selectedGuilds}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setSelectedGuilds(options);
            }}
          >
            {guilds.map((guild: any) => (
              <option key={guild.id} value={guild.id}>{guild.name}</option>
            ))}
          </select>
        ) : (
          <div>Nenhuma guilda disponível.</div>
        )}
      </div>
      <div className="mb-2">
        <label className="block text-sm">Prêmio</label>
        <input className="border rounded w-full p-2 bg-primary-bg text-primary-text placeholder-secondary-text" value={prize} onChange={e => setPrize(e.target.value)} />
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Competição'}
      </button>
    </form>
  );
}

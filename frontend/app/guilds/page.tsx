
"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import useSWR from 'swr';
import { fetcher } from '../../lib/swrFetcher';
import GuildCreateForm from '../../components/GuildCreateForm';

interface Guild {
  id: string;
  name: string;
  description?: string;
  leaderId: string;
  viceLeaderId?: string;
  members: Array<{ userId: string; role: string }>;
}

export default function GuildsPage() {
  const { data: guilds, isLoading, mutate } = useSWR<Guild[]>("http://localhost:5000/api/guilds", fetcher);

  // Importação dinâmica do Navbar
  const Navbar = require('../../components/Navbar').default;

  const [showForm, setShowForm] = React.useState(false);
  const [search, setSearch] = React.useState('');

  if (isLoading) return <div>Carregando guildas...</div>;

  const guildList = Array.isArray(guilds) ? guilds : [];
  const filteredGuilds = guildList.filter(guild =>
    guild.name.toLowerCase().includes(search.toLowerCase()) ||
    (guild.description && guild.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Guildas</h1>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar guilda..."
            className="border border-tech-purple rounded px-4 py-2 bg-primary-bg text-primary-text placeholder-secondary-text w-full"
          />
          <button
            className="bg-tech-purple text-white font-semibold px-6 py-2 rounded hover:opacity-90 transition-opacity"
            onClick={() => setShowForm(true)}
          >Criar Guilda</button>
        </div>
        {showForm && (
          <GuildCreateForm
            onCreated={() => {
              mutate();
              setShowForm(false);
            }}
          />
        )}
        <h2 className="text-lg font-bold mb-4 mt-8">Lista de Guildas</h2>
        {filteredGuilds.length === 0 ? (
          <div className="text-secondary-text">Nenhuma guilda encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGuilds.map(guild => (
              <div key={guild.id} className="bg-secondary-bg border border-tech-purple rounded-xl shadow p-4 flex flex-col gap-2">
                {/* Logo da guilda */}
                {guild.logoUrl && (
                  <img src={guild.logoUrl} alt="Logo da Guilda" className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border border-tech-purple" />
                )}
                <h3 className="text-lg font-semibold text-primary-text mb-2">{guild.name}</h3>
                <div className="text-secondary-text mb-2">{guild.description || "Sem descrição"}</div>
                <div className="text-xs text-secondary-text">Líder: {guild.leaderId || "-"}</div>
                <div className="text-xs text-secondary-text">Vice-líder: {guild.viceLeaderId || "-"}</div>
                <div className="mt-2 text-xs text-secondary-text">Membros: {guild.members.length}</div>
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-neon-cyan mb-1">Membros</h4>
                  <ul className="space-y-1">
                    {guild.members.map(member => (
                      <li key={member.userId} className="flex items-center gap-2">
                        <span className="text-primary-text text-sm">{member.userId}</span>
                        <button className="bg-neon-cyan text-blue-900 font-bold px-2 py-1 rounded-full shadow hover:bg-blue-400 transition text-xs">Seguir</button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Botão ver perfil */}
                <a href={`/guilds/${guild.id}`} className="mt-2 bg-tech-purple text-white px-4 py-2 rounded font-bold text-center hover:opacity-90 transition-opacity">Ver perfil</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

"use client";
import React, { useState } from 'react';

export default function GuildCreateForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leaderId, setLeaderId] = useState('');
  const [viceLeaderId, setViceLeaderId] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('leaderId', leaderId);
    formData.append('viceLeaderId', viceLeaderId);
    if (logo) formData.append('logo', logo);
    const res = await fetch('http://localhost:5000/api/guilds', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      setError('Erro ao criar guilda');
      setLoading(false);
      return;
    }
    setName('');
    setDescription('');
    setLeaderId('');
    setViceLeaderId('');
    setLogo(null);
    setLoading(false);
    if (onCreated) onCreated();
  };

  return (
    <form className="mb-6 p-4 border border-tech-purple rounded bg-secondary-bg shadow" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="text-lg font-bold mb-2">Criar Guilda</h2>
      <div className="mb-2">
        <label className="block text-sm">Nome</label>
        <input className="border rounded w-full p-2 bg-primary-bg text-primary-text placeholder-secondary-text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Logo da Guilda</label>
        <input type="file" accept="image/*" className="border rounded w-full p-2 bg-primary-bg text-primary-text" onChange={e => setLogo(e.target.files?.[0] || null)} />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Descrição</label>
        <input className="border rounded w-full p-2 bg-primary-bg text-primary-text placeholder-secondary-text" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="mb-2">
        <label className="block text-sm">ID do Líder</label>
        <input className="border rounded w-full p-2 bg-primary-bg text-primary-text placeholder-secondary-text" value={leaderId} onChange={e => setLeaderId(e.target.value)} required />
      </div>
      <div className="mb-2">
        <label className="block text-sm">ID do Vice-líder</label>
        <input className="border rounded w-full p-2 bg-primary-bg text-primary-text placeholder-secondary-text" value={viceLeaderId} onChange={e => setViceLeaderId(e.target.value)} />
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Guilda'}
      </button>
    </form>
  );
}

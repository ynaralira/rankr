"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompetitionCreateForm from '../../../components/CompetitionCreateForm';
import Navbar from '../../../components/Navbar';

export default function ArenaDetailPage({ params }: { params: { id: string } }) {
      const [showForm, setShowForm] = useState(false);
    // Estados para submissão
    const [inscrito, setInscrito] = useState(false);
    const [solution, setSolution] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [githubUrl, setGithubUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Função para inscrição
    const handleInscrever = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/arenas/${params.id}/enroll`, {
          method: 'POST',
          credentials: 'include',
        });
        if (res.ok) setInscrito(true);
      } catch (err) {
        alert('Erro ao inscrever-se na arena');
      }
    };

    // Função para submissão de desafio
    const handleSubmitDesafio = async (challengeId: string) => {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('solution', solution);
      if (file) formData.append('file', file);
      formData.append('githubUrl', githubUrl);
      try {
        const res = await fetch(`http://localhost:5000/api/arenas/${params.id}/challenges/${challengeId}/submit`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        if (res.ok) {
          alert('Solução submetida com sucesso!');
          setSolution('');
          setFile(null);
          setGithubUrl('');
        } else {
          alert('Erro ao submeter solução');
        }
      } catch (err) {
        alert('Erro ao submeter solução');
      }
      setSubmitting(false);
    };
  const [arena, setArena] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchArena = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/arenas/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setArena(data);
        setLoading(false);
      });
  };

  const fetchChallenges = async () => {
    const res = await fetch(`http://localhost:5000/api/arenas/${params.id}/challenges`);
    setChallenges(await res.json());
  };

  const fetchRanking = async () => {
    const res = await fetch(`http://localhost:5000/api/arenas/${params.id}/ranking`);
    setRanking(await res.json());
  };

  useEffect(() => {
    fetchArena();
    fetchChallenges();
    fetchRanking();
  }, [params.id]);

  if (loading) return <div>Carregando arena...</div>;
  if (!arena) return <div>Arena não encontrada.</div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button className="mb-4 text-blue-600" onClick={() => router.back()}>&larr; Voltar</button>
        <h1 className="text-2xl font-bold mb-2">{arena.name}</h1>
        <div className="text-gray-600 mb-4">{arena.description || 'Sem descrição'}</div>
        <div className="flex items-center gap-4 mb-6">
          <button
            className="bg-tech-purple text-white font-semibold px-6 py-2 rounded hover:opacity-90 transition-opacity"
            onClick={() => setShowForm(true)}
          >Criar Competição</button>
        </div>
        {showForm && (
          <CompetitionCreateForm
            arenaId={arena.id}
            onCreated={() => {
              fetchArena();
              setShowForm(false);
            }}
          />
        )}
        <h2 className="text-lg font-bold mb-4 mt-8">Competições</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {arena.competitions.length === 0 && (
            <div className="col-span-full text-sm text-gray-500 bg-secondary-bg border border-border-color rounded-xl p-4 text-center">Nenhuma competição registrada.</div>
          )}
          {arena.competitions.map((comp: { id: string; prize?: string; winnerId?: string }) => (
            <div key={comp.id} className="bg-secondary-bg border border-border-color rounded-xl shadow flex flex-col p-4 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-tech-purple text-lg">Prêmio:</span>
                <span className="text-base text-neon-cyan">{comp.prize || 'Sem prêmio'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-secondary-text">Vencedor:</span>
                <span className="text-base text-gray-400">{comp.winnerId || 'Ainda não definido'}</span>
              </div>
              <a href={`/arenas/competition/${comp.id}`} className="mt-4 text-xs text-blue-600 hover:underline self-end">Ver detalhes</a>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-4 text-neon-cyan">Desafios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {challenges.length === 0 ? (
            <div className="text-secondary-text">Nenhum desafio disponível.</div>
          ) : (
            challenges.map((challenge) => {
              // Cálculo de tempo restante
              let daysLeft = null;
              if (challenge.deadline) {
                const deadline = new Date(challenge.deadline);
                const now = new Date();
                const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                daysLeft = diff > 0 ? diff : 0;
              }
              // Status
              const status = daysLeft === 0 ? 'Finalizado' : 'Ativo';
              // Tags
              const tags = challenge.tags || [];
              // Participantes
              const participants = challenge.participants || [];
              // Gradiente visual
              const gradiente = status === 'Ativo'
                ? 'bg-gradient-to-r from-tech-purple via-neon-cyan to-blue-500 text-white shadow-lg'
                : 'bg-secondary-bg text-secondary-text';
              return (
                <div key={challenge.id} className={`border border-border-color rounded-lg p-6 mb-2 ${gradiente}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{challenge.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Ativo' ? 'bg-green-400 text-green-900' : 'bg-gray-400 text-gray-900'}`}>{status}</span>
                  </div>
                  <p className="mb-2">{challenge.description || challenge.content}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.length > 0 && tags.map((tag, i) => (
                      <span key={i} className="bg-blue-200 text-blue-700 px-2 py-1 rounded text-xs">{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold">+{challenge.xpReward} XP</span>
                  {daysLeft !== null && (
                    <span className="ml-2 text-xs text-yellow-300">{daysLeft} dias restantes</span>
                  )}
                  <div className="mt-2 mb-2">
                    <span className="text-xs font-semibold">Participantes:</span>
                    {participants.length > 0 ? (
                      <span className="ml-2 text-xs text-white">{participants.length}</span>
                    ) : (
                      <span className="ml-2 text-xs text-gray-300">Nenhum</span>
                    )}
                  </div>
                  {inscrito ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleSubmitDesafio(challenge.id);
                      }}
                      className="mt-4"
                    >
                      <textarea
                        value={solution}
                        onChange={e => setSolution(e.target.value)}
                        placeholder="Sua solução..."
                        className="w-full bg-primary-bg border border-border-color rounded px-4 py-3 text-primary-text placeholder-secondary-text mb-2"
                        rows={5}
                      />
                      <input
                        type="file"
                        accept=".zip"
                        className="w-full mb-2"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                      />
                      <input
                        type="url"
                        value={githubUrl}
                        onChange={e => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/seu-repo"
                        className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text placeholder-secondary-text mb-2"
                      />
                      <button
                        type="submit"
                        disabled={submitting || (!solution && !githubUrl && !file)}
                        className="px-6 py-2 bg-gradient-primary text-primary-bg font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {submitting ? 'Submetendo...' : 'Submeter Solução'}
                      </button>
                    </form>
                  ) : (
                    <button
                      className="mt-4 px-6 py-2 bg-tech-purple text-white font-semibold rounded hover:opacity-90 transition-opacity"
                      onClick={handleInscrever}
                    >Inscrever-se na Arena</button>
                  )}
                </div>
              );
            })
          )}
        </div>
        <h2 className="text-xl font-bold mb-4 text-neon-cyan">Ranking</h2>
        <div className="bg-primary-bg border border-border-color rounded-lg p-6">
          {ranking.length === 0 ? (
            <div className="text-secondary-text">Nenhum participante.</div>
          ) : (
            <ul className="pl-0">
              {ranking.map((user, idx) => {
                let gradiente = '';
                if (idx === 0) gradiente = 'bg-gradient-to-r from-tech-purple via-neon-cyan to-blue-500 text-white font-bold shadow-lg';
                else if (idx === 1) gradiente = 'bg-gradient-to-r from-purple-400 via-blue-300 to-blue-500 text-white font-semibold';
                else if (idx === 2) gradiente = 'bg-gradient-to-r from-purple-300 via-blue-200 to-blue-400 text-white';
                else gradiente = 'bg-primary-bg text-primary-text';
                return (
                  <li
                    key={user.username}
                    className={`mb-2 rounded-xl px-4 py-2 flex items-center gap-2 ${gradiente}`}
                  >
                    <span className="font-semibold">{idx + 1}º</span>
                    <span className="mr-2">{user.username}</span>
                    <span className="text-neon-cyan font-semibold">{user.xp} XP</span>
                    <span className="text-xs text-secondary-text">(Nível {user.level})</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

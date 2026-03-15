'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function ArenaBattlePage({ params }: { params: { battleId: string } }) {
  const router = useRouter();
  const [battle, setBattle] = useState<any>(null);
  const [opponent, setOpponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [router, params.battleId]);

  const fetchData = async () => {
    try {
      const battleRes = await api.get(`/arena/${params.battleId}`);
      setBattle(battleRes.data);
      if (battleRes.data.opponentId) {
        const opponentRes = await api.get(`/users/${battleRes.data.opponentId}`);
        setOpponent(opponentRes.data);
        const followRes = await api.get(`/follow/check?username=${opponentRes.data.username}`);
        setFollowing(followRes.data.following);
      }
    } catch (error) {
      toast.error('Erro ao carregar arena');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await api.post(`/follow`, { username: opponent.username });
      setFollowing(true);
      toast.success('Agora você está seguindo!');
    } catch (error) {
      toast.error('Erro ao seguir usuário');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neon-cyan">Carregando...</div>
      </div>
    );
  }

  if (!battle || !opponent) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-primary-text mb-6">Arena — Batalha #{battle.id}</h1>
        <div className="bg-secondary-bg border border-border-color rounded-lg p-6 mb-8 flex items-center gap-6">
          <img src={opponent.avatar || '/default-avatar.png'} alt={opponent.username} className="w-16 h-16 rounded-full border border-border-color" />
          <div>
            <h2 className="text-xl font-bold text-primary-text mb-2">{opponent.username}</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-deep-blue text-neon-cyan rounded-full text-sm font-semibold">Nível {opponent.level}</span>
              <span className="px-2 py-1 bg-secondary-bg text-xs font-semibold text-purple-400">{opponent.xp} XP</span>
            </div>
            <div className="mt-2">
              {following ? (
                <button className="bg-secondary-bg text-secondary-text border border-border-color rounded px-4 py-1 font-semibold text-sm cursor-default">Seguindo</button>
              ) : (
                <button className="bg-neon-cyan text-blue-900 font-bold px-4 py-1 rounded-full shadow hover:bg-blue-400 transition text-sm" onClick={handleFollow}>Seguir</button>
              )}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-bold text-neon-cyan mb-2">Resumo da batalha</h3>
          <div className="bg-primary-bg border border-border-color rounded-lg p-4">
            <div className="text-secondary-text text-sm mb-2">{battle.summary}</div>
            <div className="flex items-center gap-4">
              <span className="text-neon-cyan font-bold">+{battle.xpEarned} XP</span>
              <span className="text-secondary-text">{battle.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

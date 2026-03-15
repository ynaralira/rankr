'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function ChallengesPage() {
    const [search, setSearch] = useState('');
  const router = useRouter();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [xpFilter, setXpFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchChallenges();
  }, [router]);

  const fetchChallenges = async () => {
    try {
      const response = await api.get('/challenges');
      setChallenges(response.data);
    } catch (error) {
      toast.error('Erro ao carregar desafios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neon-cyan">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Barra de busca */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar desafio..."
                    className="w-full md:w-1/2 px-4 py-2 rounded border border-purple-700 bg-gray-900 text-white focus:outline-none focus:border-neon-cyan transition"
                  />
                </div>
        <h1 className="text-3xl font-bold text-primary-text mb-8">Desafios de Código</h1>
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className={`px-4 py-2 rounded-full font-bold text-white bg-gray-800 border border-gray-700 shadow-md ${!difficultyFilter ? 'ring-2 ring-neon-cyan' : ''}`} onClick={() => setDifficultyFilter('')}>Todos</button>
          <button className={`px-4 py-2 rounded-full font-bold text-blue-400 border border-blue-400 shadow-md flex items-center gap-2 ${difficultyFilter === 'easy' ? 'ring-2 ring-blue-400' : ''}`} onClick={() => setDifficultyFilter('easy')}>Fácil <span className="w-3 h-3 bg-blue-400 rounded-full"></span></button>
          <button className={`px-4 py-2 rounded-full font-bold text-purple-400 border border-purple-400 shadow-md flex items-center gap-2 ${difficultyFilter === 'medium' ? 'ring-2 ring-purple-400' : ''}`} onClick={() => setDifficultyFilter('medium')}>Médio <span className="w-3 h-3 bg-purple-400 rounded-full"></span></button>
          <button className={`px-4 py-2 rounded-full font-bold text-pink-400 border border-pink-400 shadow-md flex items-center gap-2 ${difficultyFilter === 'hard' ? 'ring-2 ring-pink-400' : ''}`} onClick={() => setDifficultyFilter('hard')}>Difícil <span className="w-3 h-3 bg-pink-400 rounded-full"></span></button>
          <button className={`px-4 py-2 rounded-full font-bold text-white bg-gray-800 border border-gray-700 shadow-md ${categoryFilter === '' ? 'ring-2 ring-neon-cyan' : ''}`} onClick={() => setCategoryFilter('')}>Todos</button>
          <button className={`px-4 py-2 rounded-full font-bold text-blue-300 border border-blue-300 shadow-md ${categoryFilter === 'react' ? 'ring-2 ring-blue-300' : ''}`} onClick={() => setCategoryFilter('react')}>React</button>
          <button className={`px-4 py-2 rounded-full font-bold text-purple-300 border border-purple-300 shadow-md ${categoryFilter === 'api' ? 'ring-2 ring-purple-300' : ''}`} onClick={() => setCategoryFilter('api')}>API</button>
          <button className={`px-4 py-2 rounded-full font-bold text-pink-300 border border-pink-300 shadow-md ${categoryFilter === 'ui' ? 'ring-2 ring-pink-300' : ''}`} onClick={() => setCategoryFilter('ui')}>UI</button>
          <button className={`px-4 py-2 rounded-full font-bold text-white bg-gray-800 border border-gray-700 shadow-md ${xpFilter === '' ? 'ring-2 ring-neon-cyan' : ''}`} onClick={() => setXpFilter('')}>Todos</button>
          <button className={`px-4 py-2 rounded-full font-bold text-cyan-300 border border-cyan-300 shadow-md ${xpFilter === 'baixo' ? 'ring-2 ring-cyan-300' : ''}`} onClick={() => setXpFilter('baixo')}>+ XP ↑</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges
            .filter(challenge => !difficultyFilter || challenge.difficulty === difficultyFilter)
            .filter(challenge => !categoryFilter || (challenge.tags && challenge.tags.includes(categoryFilter)))
            .filter(challenge => !xpFilter || (xpFilter === 'baixo' ? challenge.xpReward < 100 : xpFilter === 'medio' ? challenge.xpReward >= 100 && challenge.xpReward < 300 : challenge.xpReward >= 300))
            .filter(challenge =>
              !search ||
              (challenge.title && challenge.title.toLowerCase().includes(search.toLowerCase())) ||
              (challenge.description && challenge.description.toLowerCase().includes(search.toLowerCase()))
            )
            .map((challenge) => (
              <div className="w-full">
                <ChallengeCard key={challenge.id} {...challenge} />
              </div>
            ))}
        </div>
        {challenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary-text">Nenhum desafio disponível no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}


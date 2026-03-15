'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import XPProgressBar from '@/components/XPProgressBar';
import DeveloperCard from '@/components/DeveloperCard';
import ProjectCard from '@/components/ProjectCard';
import ChallengeCard from '@/components/ChallengeCard';
import CharacterAvatar from '@/components/CharacterAvatar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import { getXPForNextLevel, getXPProgress, getLevelTitle } from '@/lib/xp';
import toast from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  techStack: string[];
  xp: number;
  level: number;
  completedChallenges?: number;
  rank?: number;
  guild?: string;
  streak?: number;
}

interface Character {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  equippedAccessories?: any[];
}

export default function DashboardPage() {
      // Mock de conquistas e badges
      const conquistas = [
        { id: 'badge1', name: 'Primeiro Projeto', icon: '🏅', desc: 'Você criou seu primeiro projeto!' },
        { id: 'badge2', name: 'Desafio Completo', icon: '🎯', desc: 'Você completou um desafio!' },
        { id: 'badge3', name: 'XP Master', icon: '💎', desc: 'Acumulou 500 XP.' },
      ];
    // Dicas motivacionais e posts recomendados
    const dicas = [
      'Compartilhe seu progresso e conquiste badges!',
      'Veja posts de outros devs para se inspirar.',
      'Indique amigos e ganhe XP extra.',
    ];
    const postsRecomendados = [
      { id: 'post1', title: 'Como criar um portfólio dev', link: '/feed/post1' },
      { id: 'post2', title: 'Dicas para entrevistas técnicas', link: '/feed/post2' },
      { id: 'post3', title: 'Projetos open source para iniciantes', link: '/feed/post3' },
    ];
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [trendingDevelopers, setTrendingDevelopers] = useState<any[]>([]);
  const [recommendedDevelopers, setRecommendedDevelopers] = useState<any[]>([]);
  const [trendingProjects, setTrendingProjects] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [userRes, trendingRes, recommendedRes, projectsRes, challengesRes] = await Promise.all([
        api.get('/auth/me'),
        api.get('/users/trending'),
        api.get('/users/recommended'),
        api.get('/projects'),
        api.get('/challenges'),
      ]);

      setUser(userRes.data);
      setTrendingDevelopers(trendingRes.data);
      setRecommendedDevelopers(recommendedRes.data);
      setTrendingProjects(projectsRes.data.slice(0, 6));
      setChallenges(challengesRes.data.slice(0, 3));

      // Buscar dados do personagem
      try {
        const charRes = await api.get(`/character/me`);
        setCharacter(charRes.data);
      } catch (charErr: any) {
        if (charErr?.response?.status !== 404) {
          toast.error('Erro ao carregar personagem');
        }
        setCharacter(null);
      }
    } catch (error) {
      toast.error('Erro ao carregar dados');
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#181c2c] via-[#23243a] to-[#181c2c]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Perfil e stats rápidas */}
        <div className="mb-8 bg-secondary-bg border border-border-color rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            {character && (
              <CharacterAvatar
                username={character.name}
                avatar={character.avatar}
                level={character.level}
                equippedAccessories={character.equippedAccessories || []}
                size="lg"
                showLevel={true}
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-primary-text mb-2 leading-tight">
                Bem-vindo(a), {user.username}! <span className="text-2xl text-neon-cyan">🚀</span>
              </h1>
              <p className="text-secondary-text text-base mb-1">
                <span className="font-semibold text-lg text-purple-400">{getLevelTitle(user.level)}</span> · Nível <span className="font-bold text-lg text-neon-cyan">{user.level}</span>
              </p>
              <div className="flex gap-4 mt-2">
                <div className="bg-secondary-bg rounded-lg px-4 py-2 text-center">
                  <span className="text-sm text-neon-cyan font-bold">{user.completedChallenges ?? 0}</span>
                  <div className="text-xs text-secondary-text">Desafios concluídos</div>
                </div>
                <div className="bg-secondary-bg rounded-lg px-4 py-2 text-center">
                  <span className="text-sm text-yellow-400 font-bold">{user.rank ?? 42}</span>
                  <div className="text-xs text-secondary-text">Ranking</div>
                </div>
                <div className="bg-secondary-bg rounded-lg px-4 py-2 text-center">
                  {user.guild ? (
                    <span className="text-sm text-purple-400 font-bold">{user.guild}</span>
                  ) : (
                    <button className="text-xs text-secondary-text border border-border-color rounded px-3 py-1 hover:bg-secondary-bg transition">Entrar em uma guilda →</button>
                  )}
                  <div className="text-xs text-secondary-text">Guilda</div>
                </div>
                <div className="bg-secondary-bg rounded-lg px-4 py-2 text-center">
                  <span className="text-sm text-pink-400 font-bold">{user.streak ?? 3}</span>
                  <div className="text-xs text-secondary-text">Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de XP (card separado, full width) */}
        <div className="mb-8">
          <div className="bg-secondary-bg border border-border-color rounded-lg p-6 flex flex-col items-center">
            <div className="w-full flex justify-between mb-2">
              <span className="text-sm text-secondary-text">Nível {user.level} · {user.xp} XP</span>
              <span className="text-sm text-secondary-text">{getXPForNextLevel(user.level)} XP para próximo nível</span>
            </div>
            <XPProgressBar
              currentXP={user.xp}
              level={user.level}
              xpForNextLevel={getXPForNextLevel(user.level)}
              xpProgress={getXPProgress(user.xp, user.level)}
              className="h-6 w-full"
            />
          </div>
        </div>

        {/* Inventário e Próximo nível (cards lado a lado) */}
        <div className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-secondary-bg border border-border-color rounded-lg p-6 flex flex-col justify-between mr-0 md:mr-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neon-cyan">Inventário</h2>
              <button
                className="flex items-center gap-2 bg-neon-cyan text-secondary-bg font-semibold px-4 py-2 rounded-lg shadow hover:bg-cyan-400 transition"
                onClick={() => router.push('/inventory')}
                title="Ir para Inventário"
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(186,20) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                      <rect x="2" y="0" width="22" height="4" fill="#533489" />
                      <rect x="0" y="4" width="26" height="2" fill="#26215C" />
                      <rect x="0" y="6" width="26" height="16" fill="#7F77DD" />
                      <rect x="4" y="1" width="18" height="2" fill="#AFA9EC" />
                      <rect x="0" y="13" width="26" height="2" fill="#533489" />
                      <rect x="10" y="10" width="6" height="6" fill="#BA7517" />
                      <rect x="11" y="7" width="4" height="5" fill="none" stroke="#854F0B" strokeWidth="2" />
                      <rect x="12" y="12" width="2" height="3" fill="#633806" />
                      <rect x="12" y="11" width="2" height="2" fill="#412402" />
                      <rect x="2" y="5" width="4" height="2" fill="#26215C" />
                      <rect x="20" y="5" width="4" height="2" fill="#26215C" />
                    </g>
                  </svg>
                </span>
                <span>Ir para Inventário</span>
              </button>
            </div>
            {character && character.equippedAccessories && character.equippedAccessories.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {character.equippedAccessories.map((item: any) => (
                  <li key={item.id} className="bg-primary-bg border border-border-color rounded-lg px-4 py-2 text-primary-text text-sm shadow">
                    <span className="font-bold text-neon-cyan mr-2">{item.name}</span>
                    <span className="text-xs text-secondary-text">{item.type}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-secondary-text text-sm">Nenhum item equipado.</div>
            )}
          </div>
          <div className="flex-1 bg-secondary-bg border border-border-color rounded-lg p-6 flex flex-col justify-between items-center">
            <h2 className="text-xl font-bold text-neon-cyan mb-4">Próximo nível</h2>
            <span className="text-base text-neon-cyan font-bold mb-2">Faltam {getXPForNextLevel(user.level) - user.xp} XP para Nível {user.level + 1}</span>
            <button className="bg-neon-cyan text-blue-900 font-bold px-4 py-2 rounded-full shadow hover:bg-blue-400 transition" onClick={() => router.push('/challenges')}>Ir para desafios</button>
          </div>
        </div>
        {/* Desafio do Dia em destaque */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neon-cyan mb-4">Desafio do Dia</h2>
          {challenges.length > 0 && (
            <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-[#223fee] rounded-xl p-8 shadow flex flex-col md:flex-row items-stretch gap-8">
              {/* Card visual à esquerda */}
              <div className="flex-1 min-w-[280px]">
                <ChallengeCard {...challenges[0]} hideTitle />
              </div>
              {/* Info do desafio à direita */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                <span className="text-2xl font-bold text-white mb-2">{challenges[0].title}</span>
                <span className="text-base text-secondary-text mb-2 line-clamp-3">{challenges[0].description}</span>
                <div className="flex items-center gap-2 mb-2">
                  {/* Dificuldade colorida */}
                  <span className={`px-2 py-1 rounded text-xs font-bold ${challenges[0].difficulty === 'easy' ? 'bg-blue-400 text-blue-900' : challenges[0].difficulty === 'medium' ? 'bg-purple-400 text-purple-900' : 'bg-pink-400 text-pink-900'}`}>{challenges[0].difficulty === 'easy' ? 'Fácil' : challenges[0].difficulty === 'medium' ? 'Médio' : 'Difícil'}</span>
                  {challenges[0].tags && challenges[0].tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 rounded bg-secondary-bg text-xs font-semibold text-neon-cyan">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xs text-white flex items-center gap-1"><span>⏱</span>{Math.ceil((new Date(challenges[0].endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias restantes</span>
                  <span className="text-xs text-white flex items-center gap-1"><span>👥</span>{challenges[0].participants ?? 0} participantes</span>
                </div>
                <button className="bg-neon-cyan text-blue-900 font-bold px-4 py-2 rounded-lg shadow hover:bg-blue-400 transition text-base mt-2 self-start" onClick={() => router.push(`/challenges/${challenges[0].id}`)}>Começar agora →</button>
              </div>
            </div>
          )}
        </div>
        {/* Atividade recente */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neon-cyan mb-4">Atividade Recente</h2>
          <ul className="space-y-3">
            <li className="bg-secondary-bg rounded-lg px-4 py-2 text-secondary-text">Seu amigo <span className="text-neon-cyan font-bold">dev_julia</span> concluiu o desafio <span className="text-blue-400 font-bold">API de Clima</span></li>
            <li className="bg-secondary-bg rounded-lg px-4 py-2 text-secondary-text">Guilda <span className="text-purple-400 font-bold">CodeMasters</span> atingiu streak de 10 dias!</li>
            <li className="bg-secondary-bg rounded-lg px-4 py-2 text-secondary-text">Você ganhou <span className="text-yellow-400 font-bold">+50 XP</span> por indicar um amigo</li>
          </ul>
        </div>
        {/* Posts recomendados visual moderno */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-tech-purple">Posts Recomendados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {postsRecomendados.map(post => (
              <div key={post.id} className="bg-primary-bg border border-border-color rounded-xl p-4 shadow flex flex-col items-start">
                <img src={`https://source.unsplash.com/400x200/?code,dev,${post.id}`} alt="Imagem do post" className="rounded-lg mb-3 w-full h-32 object-cover" />
                <span className="text-base font-bold text-blue-600 mb-1">{post.title}</span>
                <span className="text-xs text-secondary-text mb-2">por <span className="font-semibold text-purple-400">dev_julia</span></span>
                <a href={post.link} className="bg-neon-cyan text-blue-900 font-bold px-3 py-1 rounded-full shadow hover:bg-blue-400 transition text-xs">Ver post</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  
  );
}


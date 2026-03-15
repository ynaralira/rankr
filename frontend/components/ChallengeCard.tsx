'use client';

import Link from 'next/link';
import { Trophy, Clock } from 'lucide-react';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  endDate: string;
  participants?: number;
  highlight?: 'popular' | 'novo' | 'emAlta';
  completed?: boolean;
}

const difficultyColors = {
  easy: 'bg-blue-400 text-blue-900',
  medium: 'bg-purple-400 text-purple-900',
  hard: 'bg-pink-400 text-pink-900',
};

const difficultyLabels = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

export default function ChallengeCard({
  id,
  title,
  description,
  difficulty,
  xpReward,
  endDate,
  participants = 0,
  highlight,
  completed = false,
  tags = [],
}: ChallengeCardProps & { tags?: string[] }) {
  const endDateObj = new Date(endDate);
  const daysLeft = Math.ceil((endDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const status = daysLeft > 0 ? 'Ativo' : 'Finalizado';
  const gradiente = 'bg-gradient-to-r from-[#181c2c] via-[#23243a] to-[#181c2c] text-white shadow-xl border-none transition-transform hover:-translate-y-1 hover:scale-[1.03] duration-200';

  return (
    <Link href={`/challenges/${id}`}>
      <div className={`rounded-xl p-6 ${gradiente} group relative overflow-hidden ${completed ? 'opacity-60 pointer-events-none' : 'cursor-pointer'} border-[3px] border-transparent bg-gradient-to-r from-black via-purple-900 via-60% via-neon-cyan via-80% to-blue-700 bg-origin-border`} style={{ boxShadow: '0 0 0 3px transparent, 0 4px 24px 0 rgba(34,63,238,0.15)' }}>
        {completed && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-80 text-white font-bold px-6 py-2 rounded-full text-lg shadow-lg z-10">Concluído</span>}
        {/* Badge destaque */}
        {highlight === 'popular' && <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs shadow-md">Popular</span>}
        {highlight === 'novo' && <span className="absolute top-4 left-4 bg-blue-400 text-blue-900 font-bold px-3 py-1 rounded-full text-xs shadow-md">Novo</span>}
        {highlight === 'emAlta' && <span className="absolute top-4 left-4 bg-pink-400 text-pink-900 font-bold px-3 py-1 rounded-full text-xs shadow-md">Em alta</span>}
        {/* Título com troféu e XP */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {difficulty === 'easy' && <Trophy className="w-6 h-6 drop-shadow-lg" style={{ color: '#00bfff' }} />} {/* azul */}
            {difficulty === 'medium' && <Trophy className="w-6 h-6 drop-shadow-lg" style={{ color: '#a259ff' }} />} {/* roxo */}
            {difficulty === 'hard' && <Trophy className="w-6 h-6 drop-shadow-lg" style={{ color: '#ff4d4d' }} />} {/* vermelho */}
            {!difficulty && <Trophy className="w-6 h-6 text-neon-cyan drop-shadow-lg" />} {/* fallback troféu */}
            <h3 className="text-lg font-bold tracking-tight group-hover:text-neon-cyan transition-colors duration-200">{title}</h3>
          </div>
          <span className="font-bold px-3 py-1 rounded-full text-xs shadow-md animate-pulse bg-neon-cyan text-blue-900">+{xpReward} XP</span>
        </div>
        {/* Barra de dificuldade visual */}
        {/* Badge de dificuldade pill */}
        <div className="mb-2">
          {difficulty === 'easy' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-400 text-blue-900">Fácil</span>}
          {difficulty === 'medium' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-400 text-purple-900">Médio</span>}
          {difficulty === 'hard' && <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-400 text-pink-900">Difícil</span>}
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.length > 0 && tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-gray-300 border border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-base mb-4 line-clamp-3 font-medium text-white/90 group-hover:text-neon-cyan transition-colors duration-200">{description}</p>
        {/* Linha de status: dias + participantes + status */}
        <div className="flex items-center justify-between pt-4 border-t border-border-color">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-300" />
            <span className="text-xs font-semibold">{daysLeft} dias</span>
            <span className="flex items-center text-xs font-semibold"><svg className="w-5 h-5 mr-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>{participants}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${status === 'Ativo' ? 'bg-neon-cyan text-blue-900' : 'bg-gray-400 text-gray-900'}`}>{status}</span>
        </div>
      </div>
    </Link>
  );
}


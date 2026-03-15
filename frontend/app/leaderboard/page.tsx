'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Trophy, Medal, Award, Crown, Users, Star } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const router = useRouter();
  const [topRecruiters, setTopRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchLeaderboard();
  }, [router]);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/referrals/leaderboard');
      setTopRecruiters(response.data);
    } catch (error) {
      toast.error('Erro ao carregar ranking');
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-secondary-text">#{rank}</span>;
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
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-neon-cyan" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
            Top <span className="gradient-text">Recrutadores</span>
          </h1>
          <p className="text-xl text-secondary-text">
            Desenvolvedores que mais cresceram a comunidade
          </p>
        </div>

        <div className="bg-secondary-bg border border-border-color rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-bg border-b border-border-color">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-text">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-text">Desenvolvedor</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary-text">Recrutas</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary-text">XP de Convites</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary-text">Nível</th>
                </tr>
              </thead>
              <tbody>
                {topRecruiters.map((recruiter, index) => {
                  const rank = index + 1;
                  const isTopThree = rank <= 3;
                  
                  return (
                    <tr
                      key={recruiter.id}
                      className={`border-b border-border-color hover:bg-primary-bg/50 transition-colors ${
                        isTopThree ? 'bg-gradient-to-r from-neon-cyan/5 to-tech-purple/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          {getRankIcon(rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/profile/${recruiter.username}`}
                          className="flex items-center space-x-3 hover:text-neon-cyan transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                            {recruiter.avatar ? (
                              <img
                                src={recruiter.avatar}
                                alt={recruiter.username}
                                className="w-full h-full rounded-full"
                              />
                            ) : (
                              <span className="text-primary-bg font-bold">
                                {recruiter.username[0].toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-primary-text">{recruiter.username}</p>
                            <p className="text-sm text-secondary-text">
                              {recruiter.xp.toLocaleString()} XP total
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Users className="w-5 h-5 text-neon-cyan" />
                          <span className="font-bold text-primary-text">{recruiter.referralCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Star className="w-5 h-5 text-neon-cyan" />
                          <span className="font-bold text-neon-cyan">{recruiter.referralXP.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-deep-blue text-neon-cyan rounded-full text-sm font-semibold">
                          Lv.{recruiter.level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {topRecruiters.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-secondary-text mx-auto mb-4 opacity-50" />
              <p className="text-secondary-text">Nenhum recrutador ainda</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/referrals"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-primary-bg rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Ver Meus Convites</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


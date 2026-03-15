'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Copy, Users, Trophy, Star, Check, Link2 } from 'lucide-react';
import DeveloperCard from '@/components/DeveloperCard';

export default function ReferralsPage() {
  const router = useRouter();
  const [referralData, setReferralData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchReferralData();
  }, [router]);

  const fetchReferralData = async () => {
    try {
      const response = await api.get('/referrals/me');
      setReferralData(response.data);
    } catch (error) {
      toast.error('Erro ao carregar informações de referência');
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/register?ref=${referralData?.referralCode}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success('Link copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neon-cyan">Carregando...</div>
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary-text mb-8">Sistema de Convites</h1>

        {/* Invite Link Section */}
        <div className="bg-secondary-bg border border-neon-cyan rounded-xl p-8 mb-8 glow-effect">
          <div className="flex items-center space-x-3 mb-4">
            <Link2 className="w-6 h-6 text-neon-cyan" />
            <h2 className="text-2xl font-bold text-primary-text">Seu Link de Convite</h2>
          </div>
          
          <div className="bg-primary-bg border border-border-color rounded-lg p-4 mb-4 flex items-center justify-between">
            <code className="text-neon-cyan flex-1 break-all">
              {typeof window !== 'undefined' && `${window.location.origin}/register?ref=${referralData.referralCode}`}
            </code>
            <button
              onClick={copyInviteLink}
              className="ml-4 px-4 py-2 bg-gradient-primary text-primary-bg rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          <p className="text-secondary-text text-sm">
            Compartilhe este link com outros desenvolvedores. Você ganha 200 XP e eles ganham 100 XP ao se cadastrarem!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary-bg border border-border-color rounded-xl p-6 hover:border-neon-cyan transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-bg" />
              </div>
              <div>
                <p className="text-secondary-text text-sm">Desenvolvedores Convidados</p>
                <p className="text-3xl font-bold text-neon-cyan">{referralData.referralCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary-bg border border-border-color rounded-xl p-6 hover:border-neon-cyan transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-primary-bg" />
              </div>
              <div>
                <p className="text-secondary-text text-sm">XP Ganho com Convites</p>
                <p className="text-3xl font-bold text-neon-cyan">{referralData.referralXP.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary-bg border border-border-color rounded-xl p-6 hover:border-neon-cyan transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-bg" />
              </div>
              <div>
                <p className="text-secondary-text text-sm">Próxima Conquista</p>
                <p className="text-lg font-bold text-primary-text">
                  {referralData.referralCount >= 100
                    ? 'Lendário!'
                    : referralData.referralCount >= 20
                    ? 'Construtor (20)'
                    : referralData.referralCount >= 5
                    ? 'Caçador (5)'
                    : 'Primeiro Recruta (1)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Referred Users List */}
        <div className="bg-secondary-bg border border-border-color rounded-xl p-8">
          <h2 className="text-2xl font-bold text-primary-text mb-6">Seus Recrutas</h2>
          
          {referralData.referrals && referralData.referrals.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {referralData.referrals.map((referral: any) => (
                <DeveloperCard
                  key={referral.id}
                  id={referral.id}
                  username={referral.username}
                  avatar={referral.avatar}
                  bio={undefined}
                  techStack={[]}
                  xp={referral.xp}
                  level={referral.level}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-secondary-text mx-auto mb-4 opacity-50" />
              <p className="text-secondary-text">Você ainda não convidou nenhum desenvolvedor</p>
              <p className="text-sm text-secondary-text mt-2">
                Compartilhe seu link de convite para começar a ganhar XP!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


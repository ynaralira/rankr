'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import XPProgressBar from '@/components/XPProgressBar';
import ProjectCard from '@/components/ProjectCard';
import BadgeComponent from '@/components/BadgeComponent';
import DeveloperCard from '@/components/DeveloperCard';
import CharacterAvatar from '@/components/CharacterAvatar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';
import { UserPlus, UserMinus } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router, username]);

  // ...existing code...
  // Layout inspirado no exemplo fornecido
  return (
    <div className="min-h-screen bg-[#0a0a14] font-space-grotesk">
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar-wrap">
            <div className="avatar">🧑‍💻</div>
            <span className="lv-badge">⭐ Lv.8</span>
          </div>
          <div className="profile-info">
            <div className="profile-name">dev_julia</div>
            <div className="profile-handle">@dev_julia · membro desde jan 2025</div>
            <div className="profile-bio">Desenvolvedora frontend apaixonada por React e animações CSS. Conquistando desafios um por um 🚀</div>
            <div className="profile-tags">
              <span className="profile-tag">React</span>
              <span className="profile-tag">TypeScript</span>
              <span className="profile-tag">CSS</span>
              <span className="profile-tag">Node.js</span>
            </div>
            <div className="profile-actions">
              <button className="btn-follow">Seguir</button>
              <button className="btn-msg">Mensagem</button>
            </div>
          </div>
        </div>

        {/* FOLLOW ROW */}
        <div className="follow-row">
          <span><b>248</b> seguidores</span>
          <span><b>91</b> seguindo</span>
        </div>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value cyan">34</div>
            <div className="stat-label">Desafios concluídos</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">#12</div>
            <div className="stat-label">Ranking global</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple">4.200</div>
            <div className="stat-label">XP total</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{color:'#FFB830'}}>🔥 21</div>
            <div className="stat-label">Streak dias</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">8</div>
            <div className="stat-label">Badges</div>
          </div>
        </div>

        {/* XP BAR */}
        <div className="box mb-4">
          <div className="xp-bar-wrap" style={{marginBottom:0}}>
            <div className="xp-bar-labels">
              <span><b style={{color:'#00CFFF'}}>Nível 8</b> · 4.200 XP</span>
              <span>5.000 XP para Nível 9</span>
            </div>
            <div style={{marginTop:'8px'}}>
              <div className="xp-bar-track"><div className="xp-bar-fill" style={{width:'84%'}}></div></div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="content-grid">
          {/* Badges */}
          <div className="box">
            <div className="section-title">Badges</div>
            <div className="badges-grid">
              <div className="badge-item"><div className="badge-icon earned">🏆</div><div className="badge-name earned">1° Desafio</div></div>
              <div className="badge-item"><div className="badge-icon earned">🔥</div><div className="badge-name earned">Streak 7d</div></div>
              <div className="badge-item"><div className="badge-icon earned">⚡</div><div className="badge-name earned">Veloz</div></div>
              <div className="badge-item"><div className="badge-icon earned">🛡️</div><div className="badge-name earned">Guilda</div></div>
              <div className="badge-item"><div className="badge-icon earned">💎</div><div className="badge-name earned">Top 20</div></div>
              <div className="badge-item"><div className="badge-icon earned">🚀</div><div className="badge-name earned">10 Desafios</div></div>
              <div className="badge-item"><div className="badge-icon locked">👑</div><div className="badge-name">Top 10</div></div>
              <div className="badge-item"><div className="badge-icon locked">🌟</div><div className="badge-name">Lenda</div></div>
            </div>
          </div>

          {/* Atividade recente */}
          <div className="box">
            <div className="section-title">Atividade Recente</div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <div className="activity-text">Concluiu o desafio <a href="#">API de Clima</a> e ganhou <b>+200 XP</b></div>
                  <div className="activity-time">há 2 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot gold"></div>
                <div>
                  <div className="activity-text">Conquistou o badge <b>🔥 Streak 7 dias</b></div>
                  <div className="activity-time">há 1 dia</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot purple"></div>
                <div>
                  <div className="activity-text">Entrou na arena contra <a href="#">@marcos_dev</a> e venceu</div>
                  <div className="activity-time">há 2 dias</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div>
                  <div className="activity-text">Concluiu <a href="#">Chat em Tempo Real</a> e ganhou <b>+300 XP</b></div>
                  <div className="activity-time">há 3 dias</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot gold"></div>
                <div>
                  <div className="activity-text">Subiu para <b>Nível 8</b> 🎉</div>
                  <div className="activity-time">há 4 dias</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desafios concluídos */}
          <div className="box">
            <div className="section-title">Desafios Concluídos</div>
            <div className="challenge-list">
              <div className="challenge-item">
                <div className="challenge-left">
                  <span className="challenge-icon">🏆</span>
                  <span className="challenge-name">API de Clima</span>
                </div>
                <span className="challenge-xp">+200 XP</span>
              </div>
              <div className="challenge-item">
                <div className="challenge-left">
                  <span className="challenge-icon">🏆</span>
                  <span className="challenge-name">Chat em Tempo Real</span>
                </div>
                <span className="challenge-xp purple">+300 XP</span>
              </div>
              <div className="challenge-item">
                <div className="challenge-left">
                  <span className="challenge-icon">🏆</span>
                  <span className="challenge-name">Jogo da Memória</span>
                </div>
                <span className="challenge-xp">+200 XP</span>
              </div>
              <div className="challenge-item">
                <div className="challenge-left">
                  <span className="challenge-icon">🏆</span>
                  <span className="challenge-name">Blog Markdown</span>
                </div>
                <span className="challenge-xp purple">+300 XP</span>
              </div>
              <div className="challenge-item" style={{justifyContent:'center'}}>
                <span style={{fontSize:'12px',color:'#555',cursor:'pointer'}}>Ver todos os 34 desafios →</span>
              </div>
            </div>
          </div>

          {/* Guilda */}
          <div className="box">
            <div className="section-title">Guilda</div>
            <div className="guild-card">
              <div className="guild-icon">🛡️</div>
              <div>
                <div className="guild-name">Code Warriors</div>
                <div className="guild-meta">Membro há 3 meses · 42 membros · Rank #3</div>
              </div>
            </div>
            <div style={{marginTop:'14px'}}>
              <div className="section-title mb-2">Pessoas similares</div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#1a1a2e',border:'1.5px solid #2a2a40',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>👨‍💻</div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:'600'}}>@marcos_dev</div>
                      <div style={{fontSize:'11px',color:'#555'}}>Nível 9 · React, Node</div>
                    </div>
                  </div>
                  <button style={{background:'transparent',border:'1.5px solid #2a2a40',color:'#aaa',fontSize:'11px',fontWeight:'600',padding:'4px 12px',borderRadius:'6px',cursor:'pointer',fontFamily:'inherit'}} onClick={e => {e.target.textContent = e.target.textContent === 'Seguir' ? 'Seguindo' : 'Seguir';}}>Seguir</button>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#1a1a2e',border:'1.5px solid '#2a2a40',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>👩‍💻</div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:'600'}}>@ana_codes</div>
                      <div style={{fontSize:'11px',color:'#555'}}>Nível 7 · TypeScript, CSS</div>
                    </div>
                  </div>
                  <button style={{background:'transparent',border:'1.5px solid #2a2a40',color:'#aaa',fontSize:'11px',fontWeight:'600',padding:'4px 12px',borderRadius:'6px',cursor:'pointer',fontFamily:'inherit'}} onClick={e => {e.target.textContent = e.target.textContent === 'Seguir' ? 'Seguindo' : 'Seguir';}}>Seguir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
            {!isOwnProfile && (
              <button
                onClick={handleFollow}
                className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
                  profile.isFollowing
                    ? 'bg-secondary-bg border border-border-color text-secondary-text hover:border-red-400 hover:text-red-400'
                    : 'bg-gradient-primary text-primary-bg hover:opacity-90'
                }`}
              >
                {profile.isFollowing ? (
                  <>
                    <UserMinus className="w-4 h-4" />
                    <span>Seguindo</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Seguir</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* XP Progress */}
          <div className="mt-6">
            <XPProgressBar
              currentXP={profile.xp}
              level={profile.level}
              xpForNextLevel={profile.xpForNextLevel}
              xpProgress={profile.xpProgress}
            />
          </div>
        </div>

        {/* Badges */}
        {profile.badges && profile.badges.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary-text mb-4">Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {profile.badges.map((badge: any) => (
                <BadgeComponent key={badge.id} {...badge} earned={true} />
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold text-primary-text mb-4">Projetos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project: any) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


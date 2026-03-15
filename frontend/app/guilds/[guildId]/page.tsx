"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/swrFetcher';

export default function GuildProfilePage() {
  const { guildId } = useParams();
  const { API_URL } = require('../../lib/api');
  const { data, isLoading } = useSWR(guildId ? `${API_URL}/guilds/${guildId}` : null, fetcher);
  const guild = data || {};
  const [requestSent, setRequestSent] = React.useState(false);
  // Layout inspirado no exemplo fornecido
  return (
    <div className="min-h-screen bg-[#0a0a14] font-space-grotesk">
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Botão voltar para lista */}
        <div className="mb-6 flex items-center">
          <a href="/guilds" className="bg-tech-purple text-white px-4 py-2 rounded font-bold hover:opacity-90 transition-opacity">← Voltar para lista</a>
        </div>
        {/* HERO */}
        <div className="guild-hero">
          <div className="guild-avatar">🛡️</div>
          <div className="guild-info">
            <div className="guild-name">{guild.name || 'Guilda sem nome'}</div>
            <div className="guild-desc">{guild.description || 'Sem descrição.'}</div>
            <div className="guild-meta-row">
              <div className="guild-meta-item">👥 <b>{guild.members ? guild.members.length : 0} membros</b> · máx 50</div>
              <div className="guild-meta-item">🏆 <b>Rank #{guild.rank || '-'}</b> global</div>
              <div className="guild-meta-item">⭐ <b>Fundada</b> {guild.createdAt ? new Date(guild.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : '-'}</div>
              <div className="guild-meta-item">🔓 <b>{guild.open ? 'Aberta' : 'Fechada'}</b> — entrada por solicitação</div>
            </div>
            <div className="guild-tags">
              {(guild.tags || ['React','TypeScript','CSS','Frontend','UI/UX']).map((tag: string, idx: number) => (
                <span className="guild-tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="guild-actions">
            <span className="status-badge">🟢 Ativa</span>
            <button className="btn-join">Pedir para entrar</button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value cyan">{guild.members ? guild.members.length : 0}</div>
            <div className="stat-label">Membros</div>
          </div>
          <div className="stat-card">
            <div className="stat-value gold">#{guild.rank || '-'}</div>
            <div className="stat-label">Ranking global</div>
          </div>
          <div className="stat-card">
            <div className="stat-value purple">{guild.xp || '-'}</div>
            <div className="stat-label">XP total da guilda</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{guild.challengesCompleted || '-'}</div>
            <div className="stat-label">Desafios concluídos</div>
          </div>
        </div>

        {/* MEMBROS + REQUISITOS */}
        <div className="grid2 mb-4">
          <div className="box">
            <div className="section-title">Membros em destaque</div>
            <div className="member-list">
              {(guild.members || []).slice(0,4).map((member:any, idx:number) => (
                <div className="member-item" key={member.id || idx}>
                  <div className="member-left">
                    <div className="member-avatar">{member.avatar || '👤'}</div>
                    <div>
                      <div className="member-name">@{member.username} {member.role === 'leader' && <span className="role-badge role-leader">Líder</span>} {member.role === 'mod' && <span className="role-badge role-mod">Mod</span>}</div>
                      <div className="member-role">Nível {member.level || '-'} · {member.xp || 0} XP</div>
                    </div>
                  </div>
                  <span className={`member-lv${member.role === 'leader' ? ' gold' : member.role === 'mod' ? ' purple' : ''}`}>Lv.{member.level || '-'}</span>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center',marginTop:'12px',fontSize:'12px',color:'#555',cursor:'pointer'}}>Ver todos os {guild.members ? guild.members.length : 0} membros →</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {/* Requisitos */}
            <div className="box">
              <div className="section-title">Requisitos para entrar</div>
              <div className="req-item"><span className="req-icon">⭐</span> Nível mínimo: <b style={{color:'#aaa',marginLeft:'4px'}}>5</b> <span className="req-fail" style={{marginLeft:'auto'}}>✗ você é Lv.1</span></div>
              <div className="req-item"><span className="req-icon">🏆</span> Mínimo de desafios: <b style={{color:'#aaa',marginLeft:'4px'}}>5 concluídos</b> <span className="req-fail" style={{marginLeft:'auto'}}>✗ você tem 0</span></div>
              <div className="req-item"><span className="req-icon">🔓</span> Entrada: <b style={{color:'#aaa',marginLeft:'4px'}}>Solicitação → aprovação do líder</b></div>
              <div style={{marginTop:'10px',padding:'10px',background:'rgba(255,80,80,.06)',border:'1px solid rgba(255,80,80,.15)',borderRadius:'8px',fontSize:'11px',color:'#FF5050'}}>Você ainda não atende todos os requisitos, mas pode enviar uma solicitação mesmo assim.</div>
            </div>
            {/* Conquistas */}
            <div className="box">
              <div className="section-title">Conquistas da guilda</div>
              <div className="badges-grid">
                {(guild.badges || [
                  {icon:'🏆',name:'Top 5',earned:true},
                  {icon:'⚡',name:'100 Desafios',earned:true},
                  {icon:'🔥',name:'Streak 30d',earned:true},
                  {icon:'👑',name:'Top 1',earned:false}
                ]).map((badge:any, idx:number) => (
                  <div className="badge-item" key={idx}>
                    <div className={`badge-icon${badge.earned ? ' earned' : ' locked'}`}>{badge.icon}</div>
                    <div className={`badge-name${badge.earned ? ' earned' : ''}`}>{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DESAFIOS + RANKING + ATIVIDADE */}
        <div className="grid3">
          <div className="box">
            <div className="section-title">Desafios da guilda</div>
            {(guild.challenges || [
              {name:'Sistema de Votação',icon:'🏆',difficulty:'easy',xp:200},
              {name:'Chat Tempo Real',icon:'🏆',difficulty:'hard',xp:300}
            ]).slice(0,2).map((challenge:any, idx:number) => (
              <div className="challenge-item" key={idx}>
                <div className="challenge-left">{challenge.icon} {challenge.name}</div>
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  <span className={`diff ${challenge.difficulty}`}>{challenge.difficulty === 'easy' ? 'Fácil' : challenge.difficulty === 'hard' ? 'Difícil' : 'Médio'}</span>
                  <span className={`badge-xp${challenge.difficulty === 'hard' ? ' purple' : ''}`}>+{challenge.xp}</span>
                </div>
              </div>
            ))}
            <div style={{textAlign:'center',marginTop:'8px',fontSize:'12px',color:'#555',cursor:'pointer'}}>Ver todos →</div>
          </div>
          <div className="box">
            <div className="section-title">Ranking interno</div>
            {(guild.ranking || [
              {pos:1,icon:'🥇',username:'marcos_dev',xp:5100},
              {pos:2,icon:'🥈',username:'dev_julia',xp:4200},
              {pos:3,icon:'🥉',username:'ana_codes',xp:3400},
              {pos:4,icon:'4',username:'pedro_ui',xp:2800},
              {pos:5,icon:'5',username:'carol_dev',xp:2100}
            ]).slice(0,5).map((rank:any, idx:number) => (
              <div className="rank-item" key={idx}>
                <div className={`rank-pos${rank.pos === 1 ? ' gold' : rank.pos === 2 ? ' silver' : rank.pos === 3 ? ' bronze' : ''}`}>{rank.icon}</div>
                <div className="rank-name">@{rank.username}</div>
                <div className="rank-xp">{rank.xp} XP</div>
              </div>
            ))}
            <div style={{textAlign:'center',marginTop:'8px',fontSize:'12px',color:'#555',cursor:'pointer'}}>Ver ranking completo →</div>
          </div>
          <div className="box">
            <div className="section-title">Atividade recente</div>
            {(guild.activity || [
              {dot:'',text:'@dev_julia concluiu API de Clima',time:'há 2h'},
              {dot:'gold',text:'Code Warriors subiu para Rank #3 🎉',time:'há 5h'},
              {dot:'purple',text:'@marcos_dev venceu arena contra @pedro_ui',time:'há 1 dia'},
              {dot:'',text:'@ana_codes concluiu Chat Tempo Real',time:'há 2 dias'},
              {dot:'gold',text:'Guilda conquistou badge 🔥 Streak 30 dias',time:'há 3 dias'}
            ]).slice(0,5).map((act:any, idx:number) => (
              <div className="activity-item" key={idx}>
                <div className={`dot${act.dot ? ' ' + act.dot : ''}`}></div>
                <div>
                  <div className="activity-text">{act.text}</div>
                  <div className="activity-time">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

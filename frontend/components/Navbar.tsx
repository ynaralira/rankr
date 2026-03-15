'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sword, Home, User, Trophy, Briefcase, LogOut, Menu, Users, Package } from 'lucide-react';
import { useState } from 'react';
import { removeToken } from '@/lib/auth';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    router.push('/');
  };

  return (
    <nav className="bg-secondary-bg border-b border-border-color sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center items-center h-16">
            <span className="block w-32 h-10">
              <svg width="100%" viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bl1" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#7B2FBE" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#00CFFF" />
                  </linearGradient>
                  <linearGradient id="bl2" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#5A1FA0" />
                    <stop offset="50%" stopColor="#c8f0ff" />
                    <stop offset="100%" stopColor="#00CFFF" />
                  </linearGradient>
                  <linearGradient id="grd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00CFFF" />
                    <stop offset="50%" stopColor="#7B2FBE" />
                    <stop offset="100%" stopColor="#3a0a6e" />
                  </linearGradient>
                  <linearGradient id="grp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2a0a50" />
                    <stop offset="50%" stopColor="#7B2FBE" />
                    <stop offset="100%" stopColor="#2a0a50" />
                  </linearGradient>
                  <linearGradient id="textgrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00CFFF" />
                    <stop offset="100%" stopColor="#9B5FDE" />
                  </linearGradient>
                </defs>
                <ellipse cx="80" cy="90" rx="8" ry="90" fill="#00CFFF" opacity="0.08" />
                <polygon points="74,12 80,6 86,12" fill="#00CFFF" />
                <polygon points="74,12 77,14 77,118 74,120" fill="url(#bl2)" />
                <polygon points="86,12 83,14 83,118 86,120" fill="url(#bl1)" />
                <line x1="80" y1="6" x2="80" y2="118" stroke="#ffffff" strokeWidth="1.2" opacity="0.65" />
                <rect x="78" y="40" width="4" height="2" fill="#00CFFF" opacity="0.9" />
                <rect x="79" y="37" width="2" height="8" fill="#00CFFF" opacity="0.9" />
                <rect x="78" y="72" width="4" height="2" fill="#BF7FFF" opacity="0.9" />
                <rect x="79" y="69" width="2" height="8" fill="#BF7FFF" opacity="0.9" />
                <rect x="78" y="100" width="4" height="2" fill="#00CFFF" opacity="0.8" />
                <rect x="79" y="97" width="2" height="8" fill="#00CFFF" opacity="0.8" />
                <rect x="54" y="118" width="52" height="12" rx="4" fill="url(#grd)" />
                <rect x="56" y="119" width="48" height="4" rx="2" fill="#c8f0ff" opacity="0.25" />
                <rect x="57" y="121" width="8" height="7" rx="2" fill="#00CFFF" />
                <rect x="59" y="123" width="4" height="3" rx="1" fill="#ffffff" opacity="0.7" />
                <rect x="95" y="121" width="8" height="7" rx="2" fill="#00CFFF" />
                <rect x="97" y="123" width="4" height="3" rx="1" fill="#ffffff" opacity="0.7" />
                <rect x="76" y="120" width="8" height="9" rx="2" fill="#7B2FBE" />
                <rect x="78" y="122" width="4" height="5" rx="1" fill="#c8f0ff" opacity="0.6" />
                <rect x="76" y="130" width="8" height="6" rx="1" fill="url(#grp)" />
                <rect x="77" y="131" width="6" height="2" fill="#BF7FFF" opacity="0.25" />
                <rect x="76" y="136" width="8" height="6" rx="1" fill="url(#grp)" />
                <rect x="77" y="137" width="6" height="2" fill="#BF7FFF" opacity="0.25" />
                <rect x="76" y="142" width="8" height="6" rx="1" fill="url(#grp)" />
                <rect x="77" y="143" width="6" height="2" fill="#BF7FFF" opacity="0.25" />
                <rect x="76" y="148" width="8" height="6" rx="1" fill="url(#grp)" />
                <rect x="72" y="154" width="16" height="14" rx="7" fill="url(#grd)" />
                <rect x="74" y="156" width="12" height="5" rx="3" fill="#c8f0ff" opacity="0.25" />
                <rect x="77" y="157" width="6" height="8" rx="3" fill="#7B2FBE" />
                <rect x="79" y="159" width="2" height="4" rx="1" fill="#00CFFF" opacity="0.8" />
                <g transform="translate(80,4)">
                  <polygon points="0,-8 1.8,-1.8 0,8 -1.8,-1.8" fill="#00CFFF" />
                  <polygon points="-8,0 -1.8,1.8 8,0 -1.8,-1.8" fill="#00CFFF" />
                </g>
                <g transform="translate(60,35)">
                  <polygon points="0,-6 1.4,-1.4 0,6 -1.4,-1.4" fill="#00CFFF" opacity="0.9" />
                  <polygon points="-6,0 -1.4,1.4 6,0 -1.4,-1.4" fill="#00CFFF" opacity="0.9" />
                </g>
                <g transform="translate(101,62)">
                  <polygon points="0,-5 1.2,-1.2 0,5 -1.2,-1.2" fill="#BF7FFF" opacity="0.9" />
                  <polygon points="-5,0 -1.2,1.2 5,0 -1.2,-1.2" fill="#BF7FFF" opacity="0.9" />
                </g>
                <g transform="translate(57,92)">
                  <polygon points="0,-5 1.2,-1.2 0,5 -1.2,-1.2" fill="#00CFFF" opacity="0.8" />
                  <polygon points="-5,0 -1.2,1.2 5,0 -1.2,-1.2" fill="#00CFFF" opacity="0.8" />
                </g>
                <circle cx="104" cy="96" r="2" fill="#BF7FFF" opacity="0.7" />
                <circle cx="64" cy="108" r="1.5" fill="#00CFFF" opacity="0.7" />
                <circle cx="96" cy="22" r="1.5" fill="white" opacity="0.6" />
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00CFFF" />
                    <stop offset="100%" stopColor="#9B5FDE" />
                  </linearGradient>
                </defs>
                <text x="124" y="148" fontFamily="Georgia, serif" fontSize="110" fontWeight="700" letterSpacing="-3" fill="url(#tg)">Rankr</text>
              </svg>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
                <span className="flex items-center space-x-4 items-center">
                  <svg className="w-8 h-8" viewBox="0 0 680 560" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(256,16) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                      <rect x="1" y="0" width="1" height="6" fill="#AFA9EC" />
                      <rect x="2" y="0" width="5" height="4" fill="#E24B4A" />
                      <rect x="0" y="6" width="3" height="4" fill="#534AB7" />
                      <rect x="5" y="6" width="3" height="4" fill="#534AB7" />
                      <rect x="0" y="10" width="8" height="22" fill="#7F77DD" />
                      <rect x="2" y="13" width="4" height="5" fill="#26215C" />
                      <rect x="3" y="12" width="2" height="2" fill="#26215C" />
                      <rect x="2" y="21" width="4" height="4" fill="#26215C" />
                      <rect x="26" y="0" width="1" height="6" fill="#AFA9EC" />
                      <rect x="27" y="0" width="5" height="4" fill="#E24B4A" />
                      <rect x="24" y="6" width="3" height="4" fill="#534AB7" />
                      <rect x="29" y="6" width="3" height="4" fill="#534AB7" />
                      <rect x="24" y="10" width="8" height="22" fill="#7F77DD" />
                      <rect x="26" y="13" width="4" height="5" fill="#26215C" />
                      <rect x="27" y="12" width="2" height="2" fill="#26215C" />
                      <rect x="26" y="21" width="4" height="4" fill="#26215C" />
                      <rect x="15" y="2" width="1" height="6" fill="#AFA9EC" />
                      <rect x="16" y="2" width="5" height="4" fill="#E24B4A" />
                      <rect x="8" y="12" width="3" height="4" fill="#534AB7" />
                      <rect x="13" y="12" width="3" height="4" fill="#534AB7" />
                      <rect x="18" y="12" width="3" height="4" fill="#534AB7" />
                      <rect x="23" y="12" width="3" height="4" fill="#534AB7" />
                      <rect x="8" y="16" width="16" height="16" fill="#7F77DD" />
                      <rect x="8" y="16" width="2" height="16" fill="#534AB7" />
                      <rect x="22" y="16" width="2" height="16" fill="#534AB7" />
                      <rect x="10" y="19" width="4" height="5" fill="#26215C" />
                      <rect x="11" y="18" width="2" height="2" fill="#26215C" />
                      <rect x="18" y="19" width="4" height="5" fill="#26215C" />
                      <rect x="19" y="18" width="2" height="2" fill="#26215C" />
                      <rect x="13" y="25" width="6" height="7" fill="#26215C" />
                      <rect x="14" y="24" width="4" height="2" fill="#26215C" />
                      <rect x="15" y="27" width="2" height="3" fill="#3C3489" />
                      <rect x="0" y="32" width="32" height="3" fill="#3C3489" />
                      <rect x="0" y="35" width="32" height="2" fill="#26215C" />
                    </g>
                  </svg>
                </span>
                <span className="font-bold text-lg flex items-center" style={{ paddingLeft: '5px' }}>Dashboard</span>
              </Link>
              <Link href="/challenges" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
              <span className="flex items-center items-center">
                <svg className="w-10 h-10 align-middle" viewBox="0 0 680 440" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(216,20) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                    <rect x="8" y="0" width="8" height="2" fill="#BA7517" />
                    <rect x="6" y="2" width="12" height="2" fill="#EF9F27" />
                    <rect x="4" y="4" width="16" height="4" fill="#EF9F27" />
                    <rect x="6" y="8" width="12" height="4" fill="#BA7517" />
                    <rect x="8" y="12" width="8" height="2" fill="#854F0B" />
                    <rect x="4" y="14" width="16" height="2" fill="#BA7517" />
                    <rect x="10" y="5" width="4" height="2" fill="#FCDE5A" />
                    <rect x="11" y="4" width="2" height="4" fill="#FCDE5A" />
                    <rect x="9" y="16" width="6" height="4" fill="#854F0B" />
                    <rect x="6" y="20" width="12" height="2" fill="#633806" />
                  </g>
                </svg>
              </span>
              <span className="flex items-center">Desafios</span>
            </Link>
              <Link href="/arenas" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
              <span className="flex items-center items-center">
                <svg className="w-10 h-10 align-middle" viewBox="0 0 680 480" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(304,24) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                    <rect x="9" y="0" width="4" height="2" fill="#D3D1C7" />
                    <rect x="10" y="2" width="2" height="2" fill="#D3D1C7" />
                    <rect x="9" y="4" width="4" height="2" fill="#B4B2A9" />
                    <rect x="10" y="6" width="2" height="2" fill="#D3D1C7" />
                    <rect x="9" y="8" width="4" height="2" fill="#B4B2A9" />
                    <rect x="10" y="10" width="2" height="2" fill="#D3D1C7" />
                    <rect x="9" y="12" width="4" height="2" fill="#B4B2A9" />
                    <rect x="10" y="14" width="2" height="2" fill="#D3D1C7" />
                    <rect x="9" y="16" width="4" height="2" fill="#888780" />
                    <rect x="4" y="18" width="14" height="3" fill="#BA7517" />
                    <rect x="5" y="18" width="12" height="2" fill="#EF9F27" />
                    <rect x="4" y="19" width="2" height="2" fill="#854F0B" />
                    <rect x="16" y="19" width="2" height="2" fill="#854F0B" />
                    <rect x="9" y="21" width="4" height="2" fill="#633806" />
                    <rect x="10" y="23" width="2" height="2" fill="#854F0B" />
                    <rect x="9" y="25" width="4" height="2" fill="#633806" />
                    <rect x="10" y="27" width="2" height="2" fill="#854F0B" />
                    <rect x="8" y="29" width="6" height="3" fill="#BA7517" />
                    <rect x="9" y="30" width="4" height="2" fill="#EF9F27" />
                  </g>
                </svg>
              </span>
              <span className="flex items-center">Arenas</span>
            </Link>
              <Link href="/guilds" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
              <span className="flex items-center items-center">
                <svg className="w-10 h-10 align-middle" viewBox="0 0 680 450" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(296,24) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                    <rect x="4" y="0" width="20" height="2" fill="#185FA5" />
                    <rect x="2" y="2" width="24" height="2" fill="#378ADD" />
                    <rect x="0" y="4" width="28" height="2" fill="#378ADD" />
                    <rect x="0" y="6" width="28" height="12" fill="#378ADD" />
                    <rect x="2" y="18" width="24" height="2" fill="#378ADD" />
                    <rect x="4" y="20" width="20" height="2" fill="#185FA5" />
                    <rect x="6" y="22" width="16" height="2" fill="#185FA5" />
                    <rect x="8" y="24" width="12" height="2" fill="#378ADD" />
                    <rect x="10" y="26" width="8" height="2" fill="#185FA5" />
                    <rect x="12" y="28" width="4" height="2" fill="#378ADD" />
                    <rect x="4" y="0" width="20" height="1" fill="#85B7EB" />
                    <rect x="0" y="4" width="2" height="14" fill="#85B7EB" />
                    <rect x="26" y="4" width="2" height="14" fill="#0C447C" />
                    <rect x="13" y="5" width="2" height="12" fill="#E6F1FB" />
                    <rect x="8" y="10" width="12" height="2" fill="#E6F1FB" />
                    <rect x="8" y="6" width="2" height="2" fill="#B5D4F4" />
                    <rect x="18" y="6" width="2" height="2" fill="#B5D4F4" />
                    <rect x="8" y="14" width="2" height="2" fill="#B5D4F4" />
                    <rect x="18" y="14" width="2" height="2" fill="#B5D4F4" />
                  </g>
                </svg>
              </span>
              <span className="flex items-center">Guildas</span>
            </Link>
            <Link href="/leaderboard" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
              <span className="flex items-center items-center">
                {/* SVG do ranking pode ser mantido aqui */}
              </span>
              <span className="flex items-center">Ranking</span>
            </Link>
              <Link href="/jobs" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
              <span className="flex items-center items-center">
                <svg className="w-10 h-10 align-middle" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(188,20) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                    <rect x="8" y="0" width="10" height="2" fill="#085041" />
                    <rect x="6" y="2" width="14" height="2" fill="#0F6E56" />
                    <rect x="0" y="4" width="26" height="18" fill="#1D9E75" />
                    <rect x="0" y="4" width="26" height="3" fill="#085041" />
                    <rect x="0" y="19" width="26" height="3" fill="#085041" />
                    <rect x="11" y="7" width="4" height="12" fill="#085041" />
                    <rect x="0" y="12" width="26" height="2" fill="#085041" />
                    <rect x="12" y="5" width="2" height="2" fill="#5DCAA5" />
                  </g>
                </svg>
              </span>
              <span className="flex items-center">Vagas</span>
            </Link>
              <Link href="/feed" className="flex items-center space-x-0.5 text-secondary-text hover:text-neon-cyan transition-colors">
              <span className="flex items-center items-center">
                <svg className="w-10 h-10 align-middle" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(196,20) scale(14)" style={{ fill: 'rgb(0, 0, 0)', stroke: 'none', color: 'rgb(255, 255, 255)', strokeWidth: 1, strokeLinecap: 'butt', strokeLinejoin: 'miter', opacity: 1, fontFamily: 'Anthropic Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', fontSize: 16, fontWeight: 400, textAnchor: 'start', dominantBaseline: 'auto' }}>
                    <rect x="0" y="0" width="24" height="24" fill="#7F77DD" />
                    <rect x="0" y="0" width="24" height="3" fill="#533489" />
                    <rect x="0" y="21" width="24" height="3" fill="#533489" />
                    <rect x="2" y="5" width="10" height="7" fill="#533489" />
                    <rect x="3" y="6" width="8" height="5" fill="#3C3489" />
                    <rect x="4" y="9" width="2" height="2" fill="#AFA9EC" />
                    <rect x="6" y="8" width="2" height="3" fill="#AFA9EC" />
                    <rect x="8" y="9" width="2" height="2" fill="#AFA9EC" />
                    <rect x="14" y="5" width="8" height="2" fill="#AFA9EC" />
                    <rect x="14" y="9" width="8" height="2" fill="#AFA9EC" />
                    <rect x="2" y="14" width="20" height="2" fill="#AFA9EC" />
                    <rect x="2" y="18" width="14" height="2" fill="#AFA9EC" />
                  </g>
                </svg>
              </span>
              <span className="flex items-center">Feed</span>
            </Link>
            <Link href="/referrals" className="flex items-center space-x-1 text-secondary-text hover:text-neon-cyan transition-colors"><Users className="w-4 h-4" /><span>Convites</span></Link>
            <div className="flex items-center gap-4">
              {/* Lupa de busca global */}
              <button
                className="text-secondary-text hover:text-neon-cyan transition-colors"
                onClick={() => setSearchOpen(true)}
                title="Buscar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-secondary-text hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-secondary-text hover:text-neon-cyan"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
              {/* Modal de busca global */}
              {searchOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                  <div className="bg-secondary-bg rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                    <button className="absolute top-4 right-4 text-secondary-text hover:text-neon-cyan" onClick={() => setSearchOpen(false)} title="Fechar">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <div className="mb-4 flex items-center gap-2">
                      <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Buscar usuários, desafios..."
                        className="w-full bg-primary-bg border border-border-color rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-neon-cyan"
                      />
                    </div>
                    {/* Mock de resultados */}
                    <div className="mb-2 text-xs text-secondary-text font-bold">USUÁRIOS</div>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">👤</span>
                        <span className="font-semibold text-primary-text">@dev_julia</span>
                        <span className="text-xs text-neon-cyan">Nível 8</span>
                        <button className="ml-auto bg-neon-cyan text-blue-900 font-bold px-3 py-1 rounded-lg shadow hover:bg-blue-400 transition text-xs">Seguir</button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">👤</span>
                        <span className="font-semibold text-primary-text">@marcos_dev</span>
                        <span className="text-xs text-neon-cyan">Nível 9</span>
                        <button className="ml-auto bg-neon-cyan text-blue-900 font-bold px-3 py-1 rounded-lg shadow hover:bg-blue-400 transition text-xs">Seguir</button>
                      </div>
                    </div>
                    <div className="mb-2 text-xs text-secondary-text font-bold">DESAFIOS</div>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🏆</span>
                        <span className="font-semibold text-primary-text">Sistema de Votação</span>
                        <span className="text-xs text-yellow-400">+200 XP</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🏆</span>
                        <span className="font-semibold text-primary-text">API de Clima</span>
                        <span className="text-xs text-yellow-400">+200 XP</span>
                      </div>
                    </div>
                    <div className="mb-2 text-xs text-secondary-text font-bold">GUILDAS</div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🛡️</span>
                        <span className="font-semibold text-primary-text">Code Warriors</span>
                        <span className="text-xs text-purple-400">42 membros</span>
                        <button className="ml-auto bg-purple-400 text-white font-bold px-3 py-1 rounded-lg shadow hover:bg-purple-500 transition text-xs">Pedir para entrar</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
             <Link
               href="/arenas"
               className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
               onClick={() => setIsMenuOpen(false)}
             >
               Arenas
             </Link>
            <Link
              href="/feed"
              className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feed
            </Link>
            <Link
              href="/challenges"
              className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Desafios
            </Link>
            <Link
              href="/jobs"
              className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vagas
            </Link>
            <Link
              href="/referrals"
              className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Convites
            </Link>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 text-secondary-text hover:text-neon-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ranking
            </Link>
            {/* Inventário removido do menu mobile */}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-secondary-text hover:text-red-400 transition-colors"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}


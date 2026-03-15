'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Sword,
  Code,
  Trophy,
  Briefcase,
  ArrowRight,
  Star,
  Users,
  Zap,
  Github,
  Twitter,
  Linkedin,
  MessageSquare,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import DeveloperCard from '@/components/DeveloperCard';
import ProjectCard from '@/components/ProjectCard';
import ChallengeCard from '@/components/ChallengeCard';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  // Mock data for demonstration
  const trendingDevelopers = [
    {
      id: '1',
      username: 'alexdev',
      avatar: null,
      bio: 'Desenvolvedor full-stack apaixonado por React e Node.js',
      techStack: ['React', 'Node.js', 'TypeScript'],
      xp: 12500,
      level: 12,
    },
    {
      id: '2',
      username: 'sarahcodes',
      avatar: null,
      bio: 'Especialista em backend | Entusiasta de Python e Go',
      techStack: ['Python', 'Go', 'PostgreSQL'],
      xp: 9800,
      level: 10,
    },
    {
      id: '3',
      username: 'mikebuilds',
      avatar: null,
      bio: 'Arquiteto frontend construindo UIs modernas',
      techStack: ['Vue.js', 'TailwindCSS', 'GraphQL'],
      xp: 15200,
      level: 13,
    },
    {
      id: '4',
      username: 'devmaster',
      avatar: null,
      bio: 'Contribuidor open source e escritor técnico',
      techStack: ['JavaScript', 'Rust', 'Docker'],
      xp: 21000,
      level: 15,
    },
  ];

  const trendingProjects = [
    {
      id: '1',
      name: 'TaskFlow',
      description: 'Um aplicativo moderno de gerenciamento de tarefas construído com React e TypeScript',
      techStack: ['React', 'TypeScript', 'TailwindCSS'],
      githubLink: '#',
      demoLink: '#',
      user: { username: 'alexdev', avatar: null },
    },
    {
      id: '2',
      name: 'API Gateway',
      description: 'Gateway de API de alta performance com rate limiting e autenticação',
      techStack: ['Go', 'Redis', 'PostgreSQL'],
      githubLink: '#',
      demoLink: '#',
      user: { username: 'sarahcodes', avatar: null },
    },
    {
      id: '3',
      name: 'Design System',
      description: 'Sistema de design abrangente para aplicações web modernas',
      techStack: ['Vue.js', 'Storybook', 'SCSS'],
      githubLink: '#',
      demoLink: '#',
      user: { username: 'mikebuilds', avatar: null },
    },
  ];

  const challenges = [
    {
      id: '1',
      title: 'Construa um App Todo',
      description: 'Crie um aplicativo completo de lista de tarefas com React e TypeScript',
      difficulty: 'easy',
      xpReward: 100,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      title: 'API REST com Autenticação',
      description: 'Construa uma API REST completa com autenticação JWT',
      difficulty: 'medium',
      xpReward: 150,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      title: 'Otimize Algoritmo de Ordenação',
      description: 'Implemente e otimize um algoritmo de ordenação com complexidade O(n log n)',
      difficulty: 'hard',
      xpReward: 200,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const OnboardingGuide = typeof window !== 'undefined' ? require('../components/OnboardingGuide').default : null;
  return (
    <div className="min-h-screen">
      {OnboardingGuide && <div className="max-w-2xl mx-auto mt-8"><OnboardingGuide /></div>}
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/30 via-primary-bg to-primary-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary-bg border border-neon-cyan/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm text-neon-cyan">Junte-se a 10.000+ desenvolvedores</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Level up</span>
                <br />
                <span className="text-primary-text">your code</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-secondary-text mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Uma rede social gamificada onde desenvolvedores crescem suas habilidades, constroem reputação, mostram projetos e se conectam com a comunidade global de desenvolvedores.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="group px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-primary-bg hover:opacity-90 transition-all flex items-center justify-center space-x-2 glow-effect"
                >
                  <span>Comece Sua Jornada</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-lg font-semibold hover:bg-neon-cyan hover:text-primary-bg transition-all"
                >
                  Explorar Desenvolvedores
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Glowing Sword */}
                <div className="relative">
                  <Sword className="w-48 h-48 text-neon-cyan animate-pulse" />
                  <div className="absolute inset-0 bg-neon-cyan/20 blur-3xl rounded-full animate-pulse" />
                  
                  {/* Star Particles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-stars-color rounded-full animate-ping"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${2 + Math.random()}s`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Gradient Lights */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-tech-purple/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
              Tudo que você precisa para
              <span className="gradient-text"> crescer como desenvolvedor</span>
            </h2>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto">
              Recursos poderosos projetados para ajudá-lo a evoluir suas habilidades de programação e construir sua reputação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-primary-bg border border-border-color rounded-xl p-8 hover:border-neon-cyan transition-all group">
              <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-primary-bg" />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Perfis de Desenvolvedor</h3>
              <p className="text-secondary-text">
                Mostre sua stack tecnológica, projetos e conquistas em um perfil incrível.
              </p>
            </div>

            <div className="bg-primary-bg border border-border-color rounded-xl p-8 hover:border-neon-cyan transition-all group">
              <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-primary-bg" />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Sistema de XP e Níveis</h3>
              <p className="text-secondary-text">
                Ganhe pontos de experiência e evolua sua jornada como desenvolvedor com cada atividade.
              </p>
            </div>

            <div className="bg-primary-bg border border-border-color rounded-xl p-8 hover:border-neon-cyan transition-all group">
              <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-primary-bg" />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Desafios de Código</h3>
              <p className="text-secondary-text">
                Resolva desafios semanais de código e ganhe recompensas enquanto melhora suas habilidades.
              </p>
            </div>

            <div className="bg-primary-bg border border-border-color rounded-xl p-8 hover:border-neon-cyan transition-all group">
              <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 text-primary-bg" />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Feed da Comunidade</h3>
              <p className="text-secondary-text">
                Compartilhe conhecimento, projetos e dicas de código com desenvolvedores do mundo todo.
              </p>
            </div>

            <div className="bg-primary-bg border border-border-color rounded-xl p-8 hover:border-neon-cyan transition-all group">
              <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-primary-bg" />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Oportunidades de Trabalho</h3>
              <p className="text-secondary-text">
                Descubra vagas publicadas por empresas em busca de desenvolvedores talentosos.
              </p>
            </div>

            <div className="bg-primary-bg border border-border-color rounded-xl p-8 hover:border-neon-cyan transition-all group">
              <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-primary-bg" />
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Rede de Desenvolvedores</h3>
              <p className="text-secondary-text">
                Siga outros desenvolvedores e expanda sua rede profissional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* XP Gamification Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
              Evolua sua
              <span className="gradient-text"> jornada como desenvolvedor</span>
            </h2>
            <p className="text-xl text-secondary-text max-w-2xl mx-auto">
              Ganhe XP para cada atividade e desbloqueie novos níveis enquanto você cresce
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Level Progression */}
            <div className="space-y-6">
              <div className="bg-secondary-bg border border-border-color rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-bg">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-text">Iniciante</h4>
                      <p className="text-sm text-secondary-text">Começando sua jornada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-bg border border-neon-cyan rounded-xl p-6 glow-effect">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-bg">5</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-text">Desenvolvedor</h4>
                      <p className="text-sm text-secondary-text">Construindo suas habilidades</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-bg border border-border-color rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-bg">10</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-text">Desenvolvedor Sênior</h4>
                      <p className="text-sm text-secondary-text">Dominando sua arte</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-bg border border-tech-purple rounded-xl p-6 glow-purple">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-bg">20</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-text">Arquiteto</h4>
                      <p className="text-sm text-secondary-text">Liderando o caminho</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar Example */}
            <div className="bg-secondary-bg border border-border-color rounded-xl p-8">
              <h3 className="text-2xl font-bold text-primary-text mb-6">Seu Progresso</h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-neon-cyan">Nível 5</span>
                  <span className="text-xs text-secondary-text">2.500 / 2.500 XP</span>
                </div>
                <div className="w-full bg-primary-bg rounded-full h-4 overflow-hidden border border-border-color">
                  <div className="h-full bg-gradient-primary transition-all duration-500 glow-effect" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-neon-cyan">Nível 6</span>
                  <span className="text-xs text-secondary-text">3.200 / 3.600 XP</span>
                </div>
                <div className="w-full bg-primary-bg rounded-full h-4 overflow-hidden border border-border-color">
                  <div className="h-full bg-gradient-primary transition-all duration-500 glow-effect" style={{ width: '89%' }} />
                </div>
              </div>

              {/* Badges Display */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-primary-text mb-4">Badges Conquistados</h4>
                <div className="grid grid-cols-4 gap-3">
                  {['⚛️', '🔧', '🧮', '🌐'].map((icon, idx) => (
                    <div
                      key={idx}
                      className="bg-primary-bg border border-neon-cyan rounded-lg p-4 text-center glow-effect"
                    >
                      <div className="text-3xl mb-2">{icon}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Developers Section */}
      <section className="py-24 bg-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
                Desenvolvedores em <span className="gradient-text">Destaque</span>
              </h2>
              <p className="text-xl text-secondary-text">Top desenvolvedores da comunidade</p>
            </div>
            <Link
              href="/dashboard"
              className="hidden md:flex items-center space-x-2 text-neon-cyan hover:text-tech-purple transition-colors"
            >
              <span>Ver Todos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDevelopers.map((dev) => (
              <DeveloperCard key={dev.id} {...dev} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Projects Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
                Projetos em <span className="gradient-text">Destaque</span>
              </h2>
              <p className="text-xl text-secondary-text">Projetos incríveis da nossa comunidade</p>
            </div>
            <Link
              href="/dashboard"
              className="hidden md:flex items-center space-x-2 text-neon-cyan hover:text-tech-purple transition-colors"
            >
              <span>Ver Todos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Coding Challenges Section */}
      <section className="py-24 bg-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
                Desafios <span className="gradient-text">Semanais</span>
              </h2>
              <p className="text-xl text-secondary-text">Teste suas habilidades e ganhe XP</p>
            </div>
            <Link
              href="/challenges"
              className="hidden md:flex items-center space-x-2 text-neon-cyan hover:text-tech-purple transition-colors"
            >
              <span>Ver Todos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary-bg border border-neon-cyan/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan">Junte-se à comunidade</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6">
            Comece sua jornada de código hoje
          </h2>
          <p className="text-xl text-secondary-text mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de desenvolvedores que estão evoluindo suas habilidades, construindo projetos incríveis e crescendo em suas carreiras.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group px-8 py-4 bg-gradient-primary rounded-lg font-semibold text-primary-bg hover:opacity-90 transition-all flex items-center justify-center space-x-2 glow-effect"
            >
              <span>Criar Conta</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-lg font-semibold hover:bg-neon-cyan hover:text-primary-bg transition-all"
            >
              Explorar Comunidade
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-bg border-t border-border-color py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Sword className="w-8 h-8 text-neon-cyan" />
                <span className="text-2xl font-bold gradient-text">CodeQuest</span>
              </Link>
              <p className="text-secondary-text mb-4 max-w-md">
                Level up your code. Junte-se a uma rede social gamificada para desenvolvedores onde habilidades, projetos e conquistas importam.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-text hover:text-neon-cyan transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-secondary-text hover:text-neon-cyan transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-secondary-text hover:text-neon-cyan transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold text-primary-text mb-4">Plataforma</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/feed" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Feed
                  </Link>
                </li>
                <li>
                  <Link href="/challenges" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Desafios
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Vagas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h3 className="font-semibold text-primary-text mb-4">Comunidade</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Desenvolvedores
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Projetos
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Ranking
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-secondary-text hover:text-neon-cyan transition-colors">
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-text text-sm">
              © 2026 CodeQuest. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-secondary-text hover:text-neon-cyan transition-colors text-sm">
                Privacidade
              </Link>
              <Link href="#" className="text-secondary-text hover:text-neon-cyan transition-colors text-sm">
                Termos
              </Link>
              <Link href="#" className="text-secondary-text hover:text-neon-cyan transition-colors text-sm">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Trophy } from 'lucide-react';

export default function ChallengeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [challenge, setChallenge] = useState<any>(null);
  const [solution, setSolution] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchChallenge();
  }, [router, id]);

  const fetchChallenge = async () => {
    try {
      const response = await api.get(`/challenges/${id}`);
      setChallenge(response.data);
    } catch (error) {
      toast.error('Erro ao carregar desafio');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solution.trim() && !githubUrl && !file) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('solution', solution);
      if (githubUrl) formData.append('githubUrl', githubUrl);
      if (file) formData.append('file', file);

      await api.post(`/challenges/${id}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Solução submetida com sucesso!');
      setSolution('');
      setGithubUrl('');
      setFile(null);
      fetchChallenge();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao submeter solução');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neon-cyan">Carregando...</div>
      </div>
    );
  }

  if (!challenge) return null;

  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  };

  const difficultyLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-secondary-bg border border-border-color rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-neon-cyan" />
              <h1 className="text-3xl font-bold text-primary-text">{challenge.title}</h1>
            </div>
            <span
              className={`text-lg font-semibold ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}
            >
              {difficultyLabels[challenge.difficulty as keyof typeof difficultyLabels]}
            </span>
          </div>

          <p className="text-secondary-text mb-6 whitespace-pre-wrap">{challenge.description}</p>

          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="text-neon-cyan font-semibold">+{challenge.xpReward} XP</span>
            <span className="text-secondary-text">
              Até {new Date(challenge.endDate).toLocaleDateString('pt-BR')}
            </span>
            <button className="bg-secondary-bg border border-border-color rounded px-3 py-1 text-xs text-neon-cyan hover:bg-neon-cyan hover:text-blue-900 transition" onClick={() => setShowParticipants(true)}>
              {challenge.participantCount} participantes
            </button>
          </div>
          {/* Lista de participantes */}
          {showParticipants && (
            <div className="bg-primary-bg border border-border-color rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold text-neon-cyan mb-2">Participantes</h3>
              <ul className="space-y-2">
                {challenge.participants && challenge.participants.length > 0 ? (
                  challenge.participants.map((user: any) => (
                    <li key={user.id} className="flex items-center gap-2">
                      <img src={user.avatar || '/default-avatar.png'} alt={user.username} className="w-8 h-8 rounded-full border border-border-color" />
                      <span className="text-primary-text text-sm">{user.username}</span>
                      <button className="bg-neon-cyan text-blue-900 font-bold px-2 py-1 rounded-full shadow hover:bg-blue-400 transition text-xs">Seguir</button>
                    </li>
                  ))
                ) : (
                  <li className="text-secondary-text text-sm">Nenhum participante ainda.</li>
                )}
              </ul>
              <button className="mt-4 text-xs text-secondary-text underline" onClick={() => setShowParticipants(false)}>Fechar</button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-secondary-bg border border-border-color rounded-lg p-8">
          <h2 className="text-xl font-bold text-primary-text mb-4">Sua Solução</h2>
          <div className="mb-6">
            <div className="bg-primary-bg border border-border-color rounded p-4 mb-2">
              <h3 className="text-lg font-semibold text-neon-cyan mb-2">O que você precisa fazer?</h3>
              <ul className="list-disc pl-6 text-secondary-text text-sm">
                {(() => {
                  switch (challenge.title) {
                    case 'Sistema de Votação':
                      return <>
                        <li>Crie uma aplicação web onde usuários possam votar em opções pré-definidas.</li>
                        <li>Exiba os resultados da votação em tempo real (atualize sem recarregar a página).</li>
                        <li>Garanta que cada usuário só possa votar uma vez.</li>
                        <li>Utilize autenticação simples (login ou identificação mínima).</li>
                        <li>Mostre o total de votos por opção e destaque a opção mais votada.</li>
                        <li>Opcional: Permita adicionar novas opções à votação.</li>
                      </>;
                    case 'Landing Page Responsiva':
                      return <>
                        <li>Crie uma landing page moderna usando React e Tailwind.</li>
                        <li>Deve ser responsiva para desktop e mobile.</li>
                        <li>Inclua uma seção de destaque, benefícios e formulário de contato.</li>
                        <li>Utilize animações leves para melhorar a experiência.</li>
                      </>;
                    case 'API REST com Node':
                      return <>
                        <li>Implemente uma API RESTful com Node.js e Express.</li>
                        <li>Adicione autenticação JWT para proteger rotas.</li>
                        <li>Inclua endpoints CRUD para um recurso (ex: usuários).</li>
                        <li>Documente a API com Swagger ou similar.</li>
                      </>;
                    case 'CRUD Fullstack':
                      return <>
                        <li>Crie um sistema CRUD com frontend e backend integrados.</li>
                        <li>Implemente autenticação de usuários.</li>
                        <li>Permita criar, editar, remover e listar itens.</li>
                        <li>Utilize banco de dados relacional.</li>
                      </>;
                    case 'Portfólio Pessoal':
                      return <>
                        <li>Desenvolva um portfólio com animações e projetos destacados.</li>
                        <li>Inclua uma seção sobre você, projetos e contato.</li>
                        <li>Utilize animações para destacar projetos.</li>
                        <li>Permita fácil atualização dos dados.</li>
                      </>;
                    case 'Dashboard com Gráficos':
                      return <>
                        <li>Crie um dashboard interativo usando Chart.js ou Recharts.</li>
                        <li>Exiba dados em gráficos de barras, linhas e pizza.</li>
                        <li>Permita filtrar e atualizar os dados dinamicamente.</li>
                        <li>Adicione autenticação para acesso ao dashboard.</li>
                      </>;
                    case 'Bot Telegram':
                      return <>
                        <li>Implemente um bot para Telegram que responde comandos.</li>
                        <li>Adicione comandos para consultar informações e interagir.</li>
                        <li>Utilize a API oficial do Telegram.</li>
                        <li>Documente os comandos disponíveis.</li>
                      </>;
                    case 'Clone do Instagram':
                      return <>
                        <li>Faça um clone simples do Instagram com upload de imagens.</li>
                        <li>Permita criar conta, postar fotos e curtir posts.</li>
                        <li>Exiba feed de posts e perfil do usuário.</li>
                        <li>Utilize armazenamento de imagens na nuvem.</li>
                      </>;
                    case 'API GraphQL':
                      return <>
                        <li>Crie uma API GraphQL para consultas e mutações.</li>
                        <li>Implemente autenticação para proteger dados.</li>
                        <li>Inclua exemplos de queries e mutations.</li>
                        <li>Documente o esquema GraphQL.</li>
                      </>;
                    case 'Sistema de Login com OAuth':
                      return <>
                        <li>Implemente login social com Google ou GitHub.</li>
                        <li>Permita login e logout com provedores OAuth.</li>
                        <li>Exiba dados do usuário autenticado.</li>
                        <li>Proteja rotas privadas.</li>
                      </>;
                    case 'Landing Page Animada':
                      return <>
                        <li>Use GSAP ou Framer Motion para criar animações.</li>
                        <li>Crie uma landing page com seções animadas.</li>
                        <li>Garanta responsividade e performance.</li>
                        <li>Inclua call-to-action destacado.</li>
                      </>;
                    case 'Calculadora Web':
                      return <>
                        <li>Crie uma calculadora simples usando HTML, CSS e JavaScript.</li>
                        <li>Permita operações básicas: soma, subtração, multiplicação e divisão.</li>
                        <li>Garanta interface intuitiva e responsiva.</li>
                        <li>Opcional: adicione histórico de operações.</li>
                      </>;
                    case 'To-Do List com React':
                      return <>
                        <li>Implemente uma lista de tarefas com React.</li>
                        <li>Permita adicionar, editar e remover tarefas.</li>
                        <li>Inclua persistência dos dados (localStorage ou backend).</li>
                        <li>Adicione filtro por status (concluída/pendente).</li>
                      </>;
                    case 'API de Clima':
                      return <>
                        <li>Consuma uma API de clima e exiba a previsão para sua cidade.</li>
                        <li>Permita buscar por diferentes cidades.</li>
                        <li>Exiba dados como temperatura, umidade e condição.</li>
                        <li>Garanta interface responsiva.</li>
                      </>;
                    case 'Jogo da Memória':
                      return <>
                        <li>Crie um jogo da memória com cartas e pontuação.</li>
                        <li>Permita reiniciar o jogo e acompanhar o score.</li>
                        <li>Adicione animações para virar cartas.</li>
                        <li>Garanta interface responsiva.</li>
                      </>;
                    case 'Chat em Tempo Real':
                      return <>
                        <li>Implemente um chat usando WebSocket ou Firebase.</li>
                        <li>Permita enviar e receber mensagens instantaneamente.</li>
                        <li>Inclua autenticação de usuários.</li>
                        <li>Exiba lista de usuários online.</li>
                      </>;
                    case 'Sistema de Notas':
                      return <>
                        <li>Crie um sistema CRUD para notas pessoais com autenticação.</li>
                        <li>Permita criar, editar, remover e listar notas.</li>
                        <li>Inclua busca e filtro por título/conteúdo.</li>
                        <li>Garanta interface responsiva.</li>
                      </>;
                    case 'Blog Markdown':
                      return <>
                        <li>Desenvolva um blog onde os posts são escritos em Markdown.</li>
                        <li>Permita criar, editar e remover posts.</li>
                        <li>Renderize Markdown para HTML.</li>
                        <li>Inclua comentários nos posts.</li>
                      </>;
                    default:
                      return challenge.instructions && challenge.instructions.length > 0 ? (
                        challenge.instructions.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))
                      ) : (
                        <li>Leia o enunciado acima e resolva o desafio conforme solicitado.</li>
                      );
                  }
                })()}
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <MonacoEditor
              height="400px"
              defaultLanguage="javascript"
              value={solution}
              onChange={(value) => setSolution(value || '')}
              theme="vs-dark"
              defaultTheme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'Fira Mono, monospace',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary-text font-semibold mb-2">Anexar pasta do projeto (zip):</label>
            <input
              type="file"
              accept=".zip"
              className="w-full mb-2"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            <label className="block text-secondary-text font-semibold mb-2">Ou informe o link do repositório GitHub:</label>
            <input
              type="url"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              placeholder="https://github.com/seu-repo"
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-2 text-primary-text placeholder-secondary-text focus:outline-none focus:border-neon-cyan"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !solution.trim()}
            className="px-6 py-2 bg-gradient-primary text-primary-bg font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Submetendo...' : 'Submeter Solução'}
          </button>
        </form>
      </div>
    </div>
  );
}


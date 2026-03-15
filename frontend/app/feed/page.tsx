'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function FeedPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [postsRes, userRes, suggestedRes] = await Promise.all([
        api.get('/posts'),
        api.get('/auth/me'),
        api.get('/users/suggested'),
      ]);

      setPosts(postsRes.data);
      setCurrentUser(userRes.data);
      setSuggestedUsers(suggestedRes.data);
    } catch (error) {
      toast.error('Erro ao carregar feed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    try {
      const response = await api.post('/posts', {
        content: postContent,
        codeSnippet: codeSnippet || undefined,
      });
      setPosts([response.data, ...posts]);
      setPostContent('');
      setCodeSnippet('');
      toast.success('Post criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar post');
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Feed principal */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary-text mb-8">Feed</h1>
          {/* Create Post */}
          <form onSubmit={handleCreatePost} className="bg-secondary-bg border border-border-color rounded-lg p-2 mb-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="O que você está pensando?"
              className="w-full bg-primary-bg border border-border-color rounded px-2 py-1 text-primary-text placeholder-secondary-text focus:outline-none focus:border-neon-cyan mb-2 resize-none text-sm"
              rows={1}
            />
            <button
              type="submit"
              className="px-3 py-1 bg-gradient-primary text-primary-bg font-semibold rounded text-xs hover:opacity-90 transition-opacity"
            >
              Publicar
            </button>
          </form>
          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} currentUserId={currentUser?.id} />
            ))}
          </div>
        </div>
        {/* Sidebar sugestões de usuários */}
        <aside className="w-full md:w-80 bg-secondary-bg border border-border-color rounded-lg p-4 h-fit">
          <h2 className="text-lg font-bold text-neon-cyan mb-4">Pessoas que você pode seguir</h2>
          <div className="space-y-4">
            {suggestedUsers.length === 0 && (
              <div className="text-secondary-text text-sm">Nenhuma sugestão no momento.</div>
            )}
            {suggestedUsers.map((user: any) => (
              <div key={user.id} className="flex items-center gap-3">
                <img src={user.avatar || '/default-avatar.png'} alt={user.username} className="w-10 h-10 rounded-full border border-border-color" />
                <div className="flex-1">
                  <div className="font-semibold text-primary-text text-sm">{user.username}</div>
                  <div className="text-xs text-secondary-text">{user.guild ? user.guild : 'Sem guilda'} • {user.techStack?.join(', ')}</div>
                </div>
                <button className="bg-neon-cyan text-blue-900 font-bold px-3 py-1 rounded-full shadow hover:bg-blue-400 transition text-xs">Seguir</button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}


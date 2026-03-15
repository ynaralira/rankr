'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, User, Send } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface PostCardProps {
  id: string;
  content: string;
  codeSnippet?: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
    level: number;
  };
  likes: Array<{ userId: string }>;
  comments: Array<{
    id: string;
    content: string;
    user: {
      username: string;
      avatar?: string;
    };
  }>;
  currentUserId?: string;
}

export default function PostCard({
  id,
  content,
  codeSnippet,
  user,
  likes,
  comments,
  currentUserId,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like.userId === currentUserId)
  );
  const [likesCount, setLikesCount] = useState(likes.length);
  const [commentsList, setCommentsList] = useState(comments);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      const response = await api.post(`/posts/${id}/like`);
      setIsLiked(response.data.liked);
      setLikesCount((prev) => (response.data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      toast.error('Erro ao curtir post');
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await api.post(`/posts/${id}/comments`, {
        content: commentText,
      });
      setCommentsList([...commentsList, response.data]);
      setCommentText('');
      toast.success('Comentário adicionado!');
    } catch (error) {
      toast.error('Erro ao comentar');
    }
  };

  return (
    <div className="bg-secondary-bg border border-border-color rounded-lg p-3 w-full max-w-4xl mx-auto mb-8 min-h-[120px] flex flex-col justify-between">
      <div className="flex items-start space-x-3 mb-4">
        <Link href={`/profile/${user.username}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 cursor-pointer">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
            ) : (
              <User className="w-5 h-5 text-primary-bg" />
            )}
          </div>
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${user.username}`}>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-primary-text hover:text-neon-cyan transition-colors">
                {user.username}
              </span>
              <span className="text-xs px-2 py-0.5 bg-deep-blue text-neon-cyan rounded">
                Lv.{user.level}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <p className="text-primary-text mb-4 whitespace-pre-wrap">{content}</p>

      {codeSnippet && (
        <div className="bg-primary-bg border border-border-color rounded p-4 mb-4 overflow-x-auto">
          <pre className="text-sm text-primary-text">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}

      <div className="flex items-center space-x-4 pt-4 border-t border-border-color">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-colors ${
            isLiked ? 'text-red-400' : 'text-secondary-text hover:text-red-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-secondary-text hover:text-neon-cyan transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{commentsList.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-border-color">
          <div className="space-y-3 mb-4">
            {commentsList.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  {comment.user.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary-bg" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-sm text-primary-text">
                    {comment.user.username}
                  </span>
                  <p className="text-sm text-secondary-text">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              placeholder="Adicione um comentário..."
              className="flex-1 bg-primary-bg border border-border-color rounded px-3 py-2 text-sm text-primary-text placeholder-secondary-text focus:outline-none focus:border-neon-cyan"
            />
            <button
              onClick={handleComment}
              className="p-2 bg-gradient-primary rounded text-primary-bg hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


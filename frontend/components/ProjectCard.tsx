'use client';

import Link from 'next/link';
import { Github, ExternalLink, User } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  user: {
    username: string;
    avatar?: string;
  };
}

export default function ProjectCard({
  name,
  description,
  techStack,
  githubLink,
  demoLink,
  user,
}: ProjectCardProps) {
  return (
    <div className="bg-secondary-bg border border-border-color rounded-lg p-6 hover:border-neon-cyan transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-primary-text mb-2">{name}</h3>
          <p className="text-secondary-text text-sm line-clamp-3">{description}</p>
        </div>
      </div>

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-deep-blue text-neon-cyan rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${user.username}`}
          className="flex items-center space-x-2 text-sm text-secondary-text hover:text-neon-cyan transition-colors"
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} className="w-5 h-5 rounded-full" />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span>{user.username}</span>
        </Link>

        <div className="flex items-center space-x-3">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-text hover:text-neon-cyan transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-text hover:text-neon-cyan transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


'use client';

import Link from 'next/link';
import { User, Star } from 'lucide-react';
import CharacterAvatar from './CharacterAvatar';

interface DeveloperCardProps {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  techStack: string[];
  xp: number;
  level: number;
  equippedAccessories?: any[];
}

export default function DeveloperCard({
  username,
  avatar,
  bio,
  techStack,
  xp,
  level,
  equippedAccessories,
}: DeveloperCardProps) {
  return (
    <Link href={`/profile/${username}`}>
      <div className="bg-secondary-bg border border-border-color rounded-lg p-4 hover:border-neon-cyan transition-colors cursor-pointer">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CharacterAvatar
              username={username}
              avatar={avatar}
              level={level}
              equippedAccessories={equippedAccessories || []}
              size="sm"
              showLevel={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary-text truncate">{username}</h3>
              <div className="flex items-center space-x-1 text-neon-cyan">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Lv.{level}</span>
              </div>
            </div>
            {bio && (
              <p className="text-sm text-secondary-text mt-1 line-clamp-2">{bio}</p>
            )}
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {techStack.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-deep-blue text-neon-cyan rounded"
                  >
                    {tech}
                  </span>
                ))}
                {techStack.length > 3 && (
                  <span className="text-xs text-secondary-text">+{techStack.length - 3}</span>
                )}
              </div>
            )}
            <div className="mt-2 text-xs text-secondary-text">
              {xp.toLocaleString()} XP
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}


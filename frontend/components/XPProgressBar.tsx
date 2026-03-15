'use client';

interface XPProgressBarProps {
  currentXP: number;
  level: number;
  xpForNextLevel: number;
  xpProgress: number;
}

export default function XPProgressBar({
  currentXP,
  level,
  xpForNextLevel,
  xpProgress,
}: XPProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-neon-cyan">Nível {level}</span>
          <span className="text-xs text-secondary-text">{currentXP} XP</span>
        </div>
        <span className="text-xs text-secondary-text">
          {xpForNextLevel} XP para próximo nível
        </span>
      </div>
      <div className="w-full bg-secondary-bg rounded-full h-3 overflow-hidden border border-border-color">
        <div
          className="h-full bg-gradient-primary transition-all duration-500 glow-effect"
          style={{ width: `${xpProgress}%` }}
        />
      </div>
    </div>
  );
}


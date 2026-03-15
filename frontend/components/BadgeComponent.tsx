'use client';

interface BadgeComponentProps {
  name: string;
  description: string;
  icon: string;
  earned?: boolean;
}

export default function BadgeComponent({
  name,
  description,
  icon,
  earned = false,
}: BadgeComponentProps) {
  return (
    <div
      className={`bg-secondary-bg border rounded-lg p-4 text-center ${
        earned
          ? 'border-neon-cyan glow-effect'
          : 'border-border-color opacity-50'
      }`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h4 className="font-semibold text-primary-text mb-1">{name}</h4>
      <p className="text-xs text-secondary-text">{description}</p>
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { User, Star } from 'lucide-react';

interface Accessory {
  id: string;
  name: string;
  type: string;
  icon: string;
  rarity: string;
}

interface CharacterAvatarProps {
  username: string;
  avatar?: string;
  level: number;
  equippedAccessories?: Accessory[];
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
}

const rarityColors = {
  common: 'border-gray-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500',
  mythic: 'border-pink-500',
};

const rarityGlow = {
  common: '',
  rare: 'glow-effect',
  epic: 'glow-purple',
  legendary: 'glow-effect',
  mythic: 'glow-purple',
};

export default function CharacterAvatar({
  username,
  avatar,
  level,
  equippedAccessories = [],
  size = 'md',
  showLevel = true,
}: CharacterAvatarProps) {
  const [hasAura, setHasAura] = useState(false);
  const [weapon, setWeapon] = useState<Accessory | null>(null);
  const [armor, setArmor] = useState<Accessory | null>(null);
  const [cloak, setCloak] = useState<Accessory | null>(null);
  const [hat, setHat] = useState<Accessory | null>(null);
  const [background, setBackground] = useState<Accessory | null>(null);

  useEffect(() => {
    const aura = equippedAccessories.find((acc) => acc.type === 'aura');
    const weaponAcc = equippedAccessories.find((acc) => acc.type === 'weapon');
    const armorAcc = equippedAccessories.find((acc) => acc.type === 'armor');
    const cloakAcc = equippedAccessories.find((acc) => acc.type === 'cloak');
    const hatAcc = equippedAccessories.find((acc) => acc.type === 'hat');
    const bgAcc = equippedAccessories.find((acc) => acc.type === 'background');

    setHasAura(!!aura);
    setWeapon(weaponAcc || null);
    setArmor(armorAcc || null);
    setCloak(cloakAcc || null);
    setHat(hatAcc || null);
    setBackground(bgAcc || null);
  }, [equippedAccessories]);

  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-5xl',
  };

  const auraSize = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
  };

  const highestRarity = equippedAccessories.reduce((highest, acc) => {
    const rarityOrder = ['common', 'rare', 'epic', 'legendary', 'mythic'];
    const currentIndex = rarityOrder.indexOf(acc.rarity);
    const highestIndex = rarityOrder.indexOf(highest);
    return currentIndex > highestIndex ? acc.rarity : highest;
  }, 'common' as string);

  return (
    <div className="relative inline-block">
      {/* Aura Effect */}
      {hasAura && (
        <div
          className={`absolute inset-0 rounded-full ${auraSize[size]} -z-10 ${
            rarityGlow[highestRarity as keyof typeof rarityGlow]
          }`}
          style={{
            background: `radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}

      {/* Avatar Container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center border-2 ${
          rarityColors[highestRarity as keyof typeof rarityColors]
        } ${rarityGlow[highestRarity as keyof typeof rarityGlow]} overflow-hidden`}
        style={background ? { background: background.icon, borderRadius: '50%' } : { borderRadius: '50%' }}
      >
        {/* Cloak Background */}
        {cloak && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-tech-purple/20 to-neon-cyan/20" />
        )}

        {/* Avatar */}
        {avatar ? (
          avatar.startsWith('<svg') ? (
            <span className="rounded-full object-cover w-full h-full border-2 border-purple-500 block">
              <span dangerouslySetInnerHTML={{ __html: avatar }} />
            </span>
          ) : (
            <img
              src={avatar}
              alt={username}
              className="w-full h-full rounded-full object-cover border-2 border-purple-500"
            />
          )
        ) : (
          <span className="rounded-full object-cover w-full h-full" />
        )}

        {/* Hat Overlay */}
        {hat && (
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
            {hat.icon.startsWith('<svg') ? (
              <div dangerouslySetInnerHTML={{ __html: hat.icon }} />
            ) : (
              <span className="text-2xl">{hat.icon}</span>
            )}
          </div>
        )}

        {/* Armor Overlay */}
        {armor && (
          <div className="absolute inset-0 flex items-center justify-center">
            {armor.icon.startsWith('<svg') ? (
              <div dangerouslySetInnerHTML={{ __html: armor.icon }} />
            ) : (
              <span className="text-2xl">{armor.icon}</span>
            )}
          </div>
        )}

        {/* Weapon Icon */}
        {weapon && (
          <div className="absolute -right-2 -top-2 bg-secondary-bg border border-neon-cyan rounded-full p-1">
            {weapon.icon.startsWith('<svg') ? (
              <div dangerouslySetInnerHTML={{ __html: weapon.icon }} />
            ) : (
              <span className="text-lg">{weapon.icon}</span>
            )}
          </div>
        )}
      </div>

          {/* Level Badge */}
        {showLevel && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary px-2 py-0.5 rounded-full border border-neon-cyan">
            <span className="text-xs font-bold text-primary-bg flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>Lv.{level}</span>
            </span>
          </div>
        )}

      {/* Particle Effects for High Rarity */}
      {(highestRarity === 'legendary' || highestRarity === 'mythic') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-stars-color rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CharacterAvatar from '@/components/CharacterAvatar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Package, Check, X, Sword, Sparkles, Shield, User, Award } from 'lucide-react';

const typeIcons = {
  weapon: Sword,
  aura: Sparkles,
  armor: Shield,
  cloak: User,
  badge: Award,
};

const typeLabels = {
  weapon: 'Armas',
  aura: 'Auras',
  armor: 'Armaduras',
  cloak: 'Mantos',
  badge: 'Badges',
};

const rarityColors = {
  common: 'border-gray-500 bg-gray-500/10',
  rare: 'border-blue-500 bg-blue-500/10',
  epic: 'border-purple-500 bg-purple-500/10',
  legendary: 'border-yellow-500 bg-yellow-500/10',
  mythic: 'border-pink-500 bg-pink-500/10',
};

const rarityLabels = {
  common: 'Comum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
  mythic: 'Mítico',
};

export default function InventoryPage() {
  const router = useRouter();
  const [inventory, setInventory] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [inventoryRes, userRes, charRes] = await Promise.all([
        api.get('/character/inventory'),
        api.get('/auth/me'),
        api.get('/character/me'),
      ]);

      setInventory(inventoryRes.data);
      setUser(userRes.data);
      setCharacter(charRes.data);
    } catch (error) {
      toast.error('Erro ao carregar inventário');
    } finally {
      setLoading(false);
    }
  };

  const handleEquip = async (accessoryId: string, isEquipped: boolean) => {
    try {
      if (isEquipped) {
        await api.post('/character/unequip', { accessoryId });
        toast.success('Acessório desequipado');
      } else {
        await api.post('/character/equip', { accessoryId });
        toast.success('Acessório equipado');
      }
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao equipar acessório');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neon-cyan">Carregando...</div>
      </div>
    );
  }

  if (!inventory || !user) return null;

  const types = Object.keys(inventory.inventory || {});
  const displayTypes = selectedType ? [selectedType] : types;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Package className="w-8 h-8 text-neon-cyan" />
          <h1 className="text-3xl font-bold text-primary-text">Inventário</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Character Preview */}
          <div className="lg:col-span-1">
            <div className="bg-secondary-bg border border-border-color rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary-text mb-4">Seu Personagem</h2>
              <div className="flex justify-center mb-4">
                {character ? (
                  <CharacterAvatar
                    username={character.name}
                    avatar={character.avatar}
                    level={character.level}
                    equippedAccessories={character.equippedAccessories || []}
                    size="lg"
                  />
                ) : (
                  <div className="text-secondary-text">Personagem não encontrado</div>
                )}
              </div>
              {character && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-text">Nível</span>
                    <span className="text-neon-cyan font-semibold">{character.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-text">XP</span>
                    <span className="text-neon-cyan font-semibold">{character.xp?.toLocaleString() ?? '0'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inventory Items */}
          <div className="lg:col-span-3">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedType === null
                    ? 'bg-gradient-primary text-primary-bg border-neon-cyan'
                    : 'bg-secondary-bg border-border-color text-secondary-text hover:border-neon-cyan'
                }`}
              >
                Todos
              </button>
              {types.map((type) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg border transition-colors flex items-center space-x-2 ${
                      selectedType === type
                        ? 'bg-gradient-primary text-primary-bg border-neon-cyan'
                        : 'bg-secondary-bg border-border-color text-secondary-text hover:border-neon-cyan'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{typeLabels[type as keyof typeof typeLabels] || type}</span>
                  </button>
                );
              })}
            </div>

            {/* Items by Type */}
            {displayTypes.map((type) => {
              const items = inventory.inventory[type] || [];
              const Icon = typeIcons[type as keyof typeof typeIcons];

              if (items.length === 0) return null;

              return (
                <div key={type} className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    {Icon && <Icon className="w-5 h-5 text-neon-cyan" />}
                    <h2 className="text-2xl font-bold text-primary-text">
                      {typeLabels[type as keyof typeof typeLabels] || type}
                    </h2>
                    <span className="text-secondary-text">({items.length})</span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item: any) => {
                      const rarity = item.accessory.rarity;
                      const isEquipped = item.isEquipped;

                      return (
                        <div
                          key={item.id}
                          className={`bg-secondary-bg border-2 rounded-xl p-4 ${
                            rarityColors[rarity as keyof typeof rarityColors]
                          } ${isEquipped ? 'glow-effect' : ''}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="text-4xl">
                              {item.accessory.icon.startsWith('<svg') ? (
                                <div dangerouslySetInnerHTML={{ __html: item.accessory.icon }} />
                              ) : (
                                item.accessory.icon
                              )}
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  rarityColors[rarity as keyof typeof rarityColors]
                                }`}
                              >
                                {rarityLabels[rarity as keyof rarityLabels]}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-bold text-primary-text mb-1">
                            {item.accessory.name}
                          </h3>
                          <p className="text-sm text-secondary-text mb-3">
                            {item.accessory.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-secondary-text">
                              Nível {item.accessory.levelRequired}
                            </span>
                            <button
                              onClick={() => handleEquip(item.accessoryId, isEquipped)}
                              className={`px-3 py-1 rounded text-sm font-semibold transition-colors flex items-center space-x-1 ${
                                isEquipped
                                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                  : 'bg-gradient-primary text-primary-bg hover:opacity-90'
                              }`}
                            >
                              {isEquipped ? (
                                <>
                                  <X className="w-3 h-3" />
                                  <span>Desequipar</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Equipar</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {displayTypes.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-secondary-text mx-auto mb-4 opacity-50" />
                <p className="text-secondary-text">Nenhum acessório desbloqueado ainda</p>
                <p className="text-sm text-secondary-text mt-2">
                  Continue evoluindo para desbloquear novos itens!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


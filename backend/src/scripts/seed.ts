import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: 'React Master',
        description: 'Dominou React e seus conceitos avançados',
        icon: '⚛️',
        xpReward: 50,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Backend Specialist',
        description: 'Especialista em desenvolvimento backend',
        icon: '🔧',
        xpReward: 50,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Algorithm Solver',
        description: 'Resolveu 10 desafios de algoritmos',
        icon: '🧮',
        xpReward: 75,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Open Source Contributor',
        description: 'Contribuiu para projetos open source',
        icon: '🌐',
        xpReward: 100,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Full Stack Warrior',
        description: 'Domina tanto frontend quanto backend',
        icon: '⚔️',
        xpReward: 100,
      },
    }),
    // Referral badges
    prisma.badge.create({
      data: {
        name: 'First Recruit',
        description: 'Convidou 1 desenvolvedor para a plataforma',
        icon: '🎯',
        xpReward: 50,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Talent Scout',
        description: 'Convidou 5 desenvolvedores para a plataforma',
        icon: '🔍',
        xpReward: 100,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Community Builder',
        description: 'Convidou 20 desenvolvedores para a plataforma',
        icon: '🏗️',
        xpReward: 200,
      },
    }),
    prisma.badge.create({
      data: {
        name: 'Legendary Recruiter',
        description: 'Convidou 100 desenvolvedores para a plataforma',
        icon: '👑',
        xpReward: 500,
      },
    }),
  ]);

  // Create sample challenges
  const challenges = await Promise.all([
    prisma.challenge.create({
      data: {
        title: 'Implementar um Todo App',
        description: 'Crie um aplicativo de lista de tarefas usando React e TypeScript',
        difficulty: 'easy',
        xpReward: 100,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    }),
    prisma.challenge.create({
      data: {
        title: 'API REST com Node.js',
        description: 'Construa uma API REST completa com autenticação JWT',
        difficulty: 'medium',
        xpReward: 150,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.challenge.create({
      data: {
        title: 'Algoritmo de Ordenação',
        description: 'Implemente um algoritmo de ordenação eficiente',
        difficulty: 'hard',
        xpReward: 200,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  // Create accessories
  const accessories = await Promise.all([
    // Level 1 - Basic
    prisma.accessory.create({
      data: {
        name: 'Avatar Básico',
        description: 'Avatar inicial de todo desenvolvedor',
        type: 'armor',
        icon: '👤',
        levelRequired: 1,
        rarity: 'common',
      },
    }),
    // Level 5 - Aura
    prisma.accessory.create({
      data: {
        name: 'Aura de Estrelas',
        description: 'Pequena aura de estrelas brilhantes',
        type: 'aura',
        icon: '✨',
        levelRequired: 5,
        rarity: 'common',
      },
    }),
    // Level 10 - Weapon
    prisma.accessory.create({
      data: {
        name: 'Espada de Bronze',
        description: 'Espada de bronze representando suas primeiras conquistas',
        type: 'weapon',
        icon: '🗡️',
        levelRequired: 10,
        rarity: 'rare',
      },
    }),
    // Level 20 - Cloak
    prisma.accessory.create({
      data: {
        name: 'Manto do Desenvolvedor',
        description: 'Manto elegante para desenvolvedores experientes',
        type: 'cloak',
        icon: '🧙',
        levelRequired: 20,
        rarity: 'rare',
      },
    }),
    // Level 30 - Armor
    prisma.accessory.create({
      data: {
        name: 'Armadura Cyber',
        description: 'Armadura futurista com efeitos luminosos',
        type: 'armor',
        icon: '🤖',
        levelRequired: 30,
        rarity: 'epic',
      },
    }),
    // Level 50 - Weapon
    prisma.accessory.create({
      data: {
        name: 'Espada Lendária',
        description: 'Espada lendária de um mestre desenvolvedor',
        type: 'weapon',
        icon: '⚔️',
        levelRequired: 50,
        rarity: 'legendary',
      },
    }),
    // Level 70 - Aura
    prisma.accessory.create({
      data: {
        name: 'Aura Cósmica',
        description: 'Aura cósmica brilhante de poder',
        type: 'aura',
        icon: '🌌',
        levelRequired: 70,
        rarity: 'legendary',
      },
    }),
    // Level 100 - Armor
    prisma.accessory.create({
      data: {
        name: 'Traje Mítico',
        description: 'Traje mítico do desenvolvedor supremo',
        type: 'armor',
        icon: '👑',
        levelRequired: 100,
        rarity: 'mythic',
      },
    }),
  ]);

  console.log('✅ Seed data created successfully!');
  console.log(`   - ${badges.length} badges created`);
  console.log(`   - ${challenges.length} challenges created`);
  console.log(`   - ${accessories.length} accessories created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


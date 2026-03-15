import { prisma } from '../lib/prisma';

async function seedArenas() {
  await prisma.arena.create({
    data: {
      name: 'Arena Central',
      description: 'A arena principal para batalhas e competições.',
    },
  });
  await prisma.arena.create({
    data: {
      name: 'Arena Leste',
      description: 'Arena localizada na região leste.',
    },
  });
  await prisma.arena.create({
    data: {
      name: 'Arena Oeste',
      description: 'Arena localizada na região oeste.',
    },
  });
  console.log('Arenas de exemplo criadas!');
}

seedArenas().finally(() => prisma.$disconnect());

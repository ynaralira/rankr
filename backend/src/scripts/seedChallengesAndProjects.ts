import { prisma } from '../lib/prisma';

async function seedChallengesAndProjects() {
  // Desafios
  const desafios = [
    { title: 'Landing Page Responsiva', content: 'Crie uma landing page moderna usando React e Tailwind.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'API REST com Node', content: 'Implemente uma API RESTful com autenticação JWT.', xpReward: 300, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'CRUD Fullstack', content: 'Integre frontend e backend com autenticação e CRUD.', xpReward: 100, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Portfólio Pessoal', content: 'Desenvolva um portfólio com animações e projetos destacados.', xpReward: 100, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Dashboard com Gráficos', content: 'Crie um dashboard interativo usando Chart.js ou Recharts.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Bot Telegram', content: 'Implemente um bot para Telegram que responde comandos.', xpReward: 300, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Clone do Instagram', content: 'Faça um clone simples do Instagram com upload de imagens.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'API GraphQL', content: 'Crie uma API GraphQL para consultas e mutações.', xpReward: 300, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Sistema de Login com OAuth', content: 'Implemente login social com Google ou GitHub.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Landing Page Animada', content: 'Use GSAP ou Framer Motion para criar animações.', xpReward: 100, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Calculadora Web', content: 'Crie uma calculadora simples usando HTML, CSS e JavaScript.', xpReward: 100, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'To-Do List com React', content: 'Implemente uma lista de tarefas com React, incluindo edição e remoção.', xpReward: 100, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'API de Clima', content: 'Consuma uma API de clima e exiba a previsão para sua cidade.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Jogo da Memória', content: 'Crie um jogo da memória com cartas e pontuação.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Chat em Tempo Real', content: 'Implemente um chat usando WebSocket ou Firebase.', xpReward: 300, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Sistema de Notas', content: 'Crie um sistema CRUD para notas pessoais com autenticação.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Blog Markdown', content: 'Desenvolva um blog onde os posts são escritos em Markdown.', xpReward: 300, endDate: new Date('2026-12-31T23:59:59.000Z') },
    { title: 'Sistema de Votação', content: 'Implemente um sistema de votação online com resultados em tempo real.', xpReward: 200, endDate: new Date('2026-12-31T23:59:59.000Z') },
  ];
  for (const desafio of desafios) {
    await prisma.challenge.create({ data: desafio });
  }

  // Projetos
  await prisma.project.create({
    data: {
      name: 'Projeto Social Network',
      description: 'Rede social para desenvolvedores com feed, perfil e chat.',
      user: { connect: { id: 'cmmr04sz7000013lq3wbt4cx3' } },
    },
  });
  await prisma.project.create({
    data: {
      name: 'Projeto E-commerce',
      description: 'Loja virtual com carrinho, pagamentos e painel admin.',
      user: { connect: { id: 'cmmr04sz7000013lq3wbt4cx3' } },
    },
  });
  await prisma.project.create({
    data: {
      name: 'Projeto Blog Tech',
      description: 'Blog de tecnologia com comentários e ranking de posts.',
      user: { connect: { id: 'cmmr04sz7000013lq3wbt4cx3' } },
    },
  });

  console.log('Desafios e projetos prontos criados!');
}

seedChallengesAndProjects().finally(() => prisma.$disconnect());

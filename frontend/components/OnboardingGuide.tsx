import React, { useState } from 'react';

const steps = [
  {
    question: 'Qual seu objetivo principal na plataforma?',
    options: [
      { label: 'Aprender', next: 1 },
      { label: 'Colaborar', next: 2 },
      { label: 'Competir', next: 3 },
      { label: 'Liderar', next: 4 },
    ],
    motivational: 'Cada objetivo te leva a uma jornada única!'
  },
  {
    question: 'Prefere desafios práticos ou cursos?',
    options: [
      { label: 'Desafios', next: 5 },
      { label: 'Cursos', next: 6 },
    ],
    motivational: 'Desafios valem XP e badges!'
  },
  {
    question: 'Quer contribuir em projetos ou ajudar outros?',
    options: [
      { label: 'Projetos', next: 7 },
      { label: 'Ajudar', next: 8 },
    ],
    motivational: 'Colaborar aumenta seu ranking e visibilidade!'
  },
  {
    question: 'Prefere competir em arenas ou desafios?',
    options: [
      { label: 'Arenas', next: 9 },
      { label: 'Desafios', next: 5 },
    ],
    motivational: 'Competição saudável gera XP extra!'
  },
  {
    question: 'Quer liderar uma guilda ou mentorar?',
    options: [
      { label: 'Liderar Guilda', next: 10 },
      { label: 'Mentorar', next: 11 },
    ],
    motivational: 'Liderança e mentoria são reconhecidas com badges especiais!'
  },
  {
    question: 'Veja desafios recomendados:',
    options: [
      { label: 'Desafio Frontend React', link: '/challenges/1' },
      { label: 'Desafio Backend Node', link: '/challenges/2' },
    ],
    motivational: 'Cada desafio concluído aumenta seu XP!'
  },
  {
    question: 'Veja cursos recomendados:',
    options: [
      { label: 'Curso React Básico', link: '/posts/react-basico' },
      { label: 'Curso Node Avançado', link: '/posts/node-avancado' },
    ],
    motivational: 'Cursos ajudam a evoluir mais rápido!'
  },
  {
    question: 'Projetos prontos para contribuir:',
    options: [
      { label: 'Social Network', link: '/projects/1' },
      { label: 'E-commerce', link: '/projects/2' },
    ],
    motivational: 'Contribua e ganhe pontos de colaboração!'
  },
  {
    question: 'Veja posts para ajudar outros:',
    options: [
      { label: 'Como resolver bugs', link: '/posts/bugs' },
      { label: 'Dicas de carreira', link: '/posts/carreira' },
    ],
    motivational: 'Ajudar outros gera badges de mentor!'
  },
  {
    question: 'Arenas para competir:',
    options: [
      { label: 'Arena Central', link: '/arenas/cmmr4t3t30000nshjkf71s8vn' },
      { label: 'Arena Leste', link: '/arenas/cmmr4t3te0001nshjobzx8g1t' },
    ],
    motivational: 'Competir em arenas é divertido e motivador!'
  },
  {
    question: 'Como liderar uma guilda:',
    options: [
      { label: 'Ver dicas de liderança', link: '/posts/lideranca' },
      { label: 'Criar guilda', link: '/guilds' },
    ],
    motivational: 'Liderança é reconhecida com XP e badges!'
  },
  {
    question: 'Como mentorar outros:',
    options: [
      { label: 'Ver dicas de mentoria', link: '/posts/mentoria' },
      { label: 'Ajudar em desafios', link: '/challenges' },
    ],
    motivational: 'Mentoria gera badges e pontos extra!'
  }
];

export default function OnboardingGuide() {
  const [step, setStep] = useState(0);

  const handleOption = (option: any) => {
    if (option.next !== undefined) setStep(option.next);
    if (option.link) window.location.href = option.link;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-secondary-bg rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Guia Interativo</h2>
      <div className="mb-2 text-lg">{steps[step].question}</div>
      <div className="mb-4 text-sm text-tech-purple">{steps[step].motivational}</div>
      <div className="space-y-2">
        {steps[step].options.map((option, idx) => (
          <button
            key={idx}
            className="w-full bg-tech-purple text-white px-4 py-2 rounded hover:bg-neon-cyan transition"
            onClick={() => handleOption(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

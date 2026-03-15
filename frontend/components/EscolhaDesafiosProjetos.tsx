import React from 'react';
import { desafiosProntos, projetosProntos } from '../lib/desafiosProjetosProntos';

export default function EscolhaDesafiosProjetos() {
  return (
    <div className="mx-auto p-6 bg-secondary-bg rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Escolha seu desafio ou projeto</h2>
      {/* ...outros blocos ou conteúdos motivacionais aqui... */}
      {/* Blocos de projetos e desafios por último */}
      {projetosProntos.length > 0 && (
        <div className="mb-8 mt-12">
          <h3 className="text-xl font-semibold mb-3 text-tech-purple">Projetos em Destaque</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {projetosProntos.map(projeto => (
              <div key={projeto.id} className="bg-secondary-bg border-2 border-blue-500 rounded-xl p-6 flex flex-col max-w-2xl mx-auto transition-transform hover:-translate-y-2 hover:shadow-xl shadow-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xl text-blue-700">{projeto.name}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{projeto.status}</span>
                </div>
                <span className="text-base text-primary-text mb-4 font-medium">{projeto.description}</span>
                <a href={projeto.link} className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-tech-purple transition self-end">Ver projeto</a>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3 text-tech-purple">Desafios de Código</h3>
        {desafiosProntos.length === 0 ? (
          <div className="text-center text-secondary-text text-sm mb-4">Nenhum desafio disponível no momento.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {desafiosProntos.map(desafio => (
              <div key={desafio.id} className="bg-secondary-bg border-2 border-purple-500 rounded-xl p-6 flex flex-col max-w-2xl mx-auto transition-transform hover:-translate-y-2 hover:shadow-xl shadow-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xl text-tech-purple">{desafio.title}</span>
                  <span className="bg-purple-100 text-tech-purple px-3 py-1 rounded-full text-xs font-semibold">Nível: {desafio.level}</span>
                </div>
                <span className="text-base text-primary-text mb-4 font-medium">{desafio.description}</span>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">XP: {desafio.xp}</span>
                </div>
                <a href={desafio.link} className="mt-auto bg-tech-purple text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 transition self-end">Ver desafio</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

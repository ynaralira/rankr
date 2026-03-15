import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Competition {
  id: string;
  prize?: string;
  winnerId?: string;
  guildAId: string;
  guildBId: string;
}

export default function CompetitionDetailPage({ params }: { params: { id: string } }) {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/arenas/competition/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setCompetition(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div>Carregando competição...</div>;
  if (!competition) return <div>Competição não encontrada.</div>;

  return (
    <div className="p-6">
      <button className="mb-4 text-blue-600" onClick={() => router.back()}>&larr; Voltar</button>
      <h1 className="text-2xl font-bold mb-2">Competição</h1>
      <div className="mb-2">Guilda A: {competition.guildAId}</div>
      <div className="mb-2">Guilda B: {competition.guildBId}</div>
      <div className="mb-2">Prêmio: {competition.prize || 'Sem prêmio'}</div>
      <div className="mb-2">Vencedor: {competition.winnerId || 'Ainda não definido'}</div>
    </div>
  );
}

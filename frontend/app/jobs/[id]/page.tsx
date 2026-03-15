'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchJob();
  }, [router, id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      toast.error('Erro ao carregar vaga');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    setApplying(true);
    try {
      await api.post(`/jobs/${id}/apply`, { coverLetter });
      toast.success('Candidatura enviada com sucesso!');
      setCoverLetter('');
      fetchJob();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao se candidatar');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neon-cyan">Carregando...</div>
      </div>
    );
  }

  if (!job) return null;

  const hasApplied = job.applications?.some((app: any) => app.status === 'pending');

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-secondary-bg border border-border-color rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary-text mb-2">{job.jobTitle}</h1>
              <p className="text-xl text-neon-cyan font-semibold">{job.companyName}</p>
            </div>
            <Briefcase className="w-8 h-8 text-secondary-text" />
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-secondary-text">
            {job.isRemote && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Remoto</span>
              </span>
            )}
            {job.location && !job.isRemote && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </span>
            )}
            {(job.salaryMin || job.salaryMax) && (
              <span className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>
                  {job.salaryMin && job.salaryMax
                    ? `R$ ${job.salaryMin.toLocaleString()} - R$ ${job.salaryMax.toLocaleString()}`
                    : job.salaryMin
                    ? `A partir de R$ ${job.salaryMin.toLocaleString()}`
                    : `Até R$ ${job.salaryMax?.toLocaleString()}`}
                </span>
              </span>
            )}
          </div>

          {job.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {job.techStack.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 bg-deep-blue text-neon-cyan rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-secondary-text whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>

        {!hasApplied ? (
          <form onSubmit={handleApply} className="bg-secondary-bg border border-border-color rounded-lg p-8">
            <h2 className="text-xl font-bold text-primary-text mb-4">Candidatar-se</h2>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Carta de apresentação (opcional)"
              className="w-full bg-primary-bg border border-border-color rounded px-4 py-3 text-primary-text placeholder-secondary-text focus:outline-none focus:border-neon-cyan mb-4 resize-none"
              rows={6}
            />
            <button
              type="submit"
              disabled={applying}
              className="px-6 py-2 bg-gradient-primary text-primary-bg font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {applying ? 'Enviando...' : 'Enviar Candidatura'}
            </button>
          </form>
        ) : (
          <div className="bg-secondary-bg border border-neon-cyan rounded-lg p-8 text-center">
            <p className="text-neon-cyan font-semibold">Você já se candidatou para esta vaga!</p>
          </div>
        )}
      </div>
    </div>
  );
}


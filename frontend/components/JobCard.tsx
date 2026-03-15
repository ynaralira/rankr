'use client';

import Link from 'next/link';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

interface JobCardProps {
  id: string;
  companyName: string;
  jobTitle: string;
  description: string;
  techStack: string[];
  location?: string;
  isRemote: boolean;
  salaryMin?: number;
  salaryMax?: number;
}

export default function JobCard({
  id,
  companyName,
  jobTitle,
  description,
  techStack,
  location,
  isRemote,
  salaryMin,
  salaryMax,
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`}>
      <div className="bg-secondary-bg border border-border-color rounded-lg p-6 hover:border-neon-cyan transition-colors cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-primary-text mb-1">{jobTitle}</h3>
            <p className="text-neon-cyan font-semibold">{companyName}</p>
          </div>
          <Briefcase className="w-6 h-6 text-secondary-text" />
        </div>

        <p className="text-secondary-text text-sm mb-4 line-clamp-3">{description}</p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-deep-blue text-neon-cyan rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border-color">
          <div className="flex items-center space-x-4 text-sm text-secondary-text">
            {isRemote && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Remoto</span>
              </span>
            )}
            {location && !isRemote && (
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </span>
            )}
            {(salaryMin || salaryMax) && (
              <span className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>
                  {salaryMin && salaryMax
                    ? `R$ ${salaryMin.toLocaleString()} - R$ ${salaryMax.toLocaleString()}`
                    : salaryMin
                    ? `A partir de R$ ${salaryMin.toLocaleString()}`
                    : `Até R$ ${salaryMax?.toLocaleString()}`}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}


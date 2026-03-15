import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const {
      companyName,
      jobTitle,
      description,
      techStack,
      location,
      isRemote,
      salaryMin,
      salaryMax,
    } = req.body;

    if (!companyName || !jobTitle || !description) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const job = await prisma.job.create({
      data: {
        companyName,
        jobTitle,
        description,
        techStack: techStack || [],
        location,
        isRemote: isRemote || false,
        salaryMin,
        salaryMax,
      },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
};

export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { techStack, isRemote, location } = req.query;

    const where: any = {};

    if (techStack) {
      where.techStack = {
        hasSome: Array.isArray(techStack) ? techStack : [techStack],
      };
    }

    if (isRemote !== undefined) {
      where.isRemote = isRemote === 'true';
    }

    if (location) {
      where.location = { contains: location as string, mode: 'insensitive' };
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        applications: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
};

export const getJob = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
                bio: true,
                techStack: true,
                level: true,
              },
            },
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar vaga' });
  }
};

export const applyToJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const { coverLetter } = req.body;

    // Check if already applied
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        jobId_userId: {
          jobId: id,
          userId,
        },
      },
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Você já se candidatou para esta vaga' });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        userId,
        coverLetter,
        status: 'pending',
      },
      include: {
        job: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao se candidatar' });
  }
};


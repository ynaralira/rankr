import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { XP_REWARDS, calculateLevel } from '../utils/xp';
import { unlockAccessoriesForLevel } from '../utils/accessories';

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { name, description, techStack, githubLink, demoLink } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        techStack: techStack || [],
        githubLink,
        demoLink,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // Award XP
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const newXP = user.xp + XP_REWARDS.POST_PROJECT;
      const newLevel = calculateLevel(newXP);

      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel,
        },
      });
    }

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar projeto' });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.query;

    const where = userId ? { userId: userId as string } : {};

    const projects = await prisma.project.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
};

export const getProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            techStack: true,
            xp: true,
            level: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar projeto' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    if (project.userId !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este projeto' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar projeto' });
  }
};


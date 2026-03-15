import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { XP_REWARDS, calculateLevel } from '../utils/xp';
import { unlockAccessoriesForLevel } from '../utils/accessories';

export const getChallenges = async (req: AuthRequest, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        endDate: {
          gte: new Date(),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar desafios' });
  }
};

export const getChallenge = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        submissions: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!challenge) {
      return res.status(404).json({ error: 'Desafio não encontrado' });
    }

    res.json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar desafio' });
  }
};

export const submitChallenge = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const { solution } = req.body;

    if (!solution) {
      return res.status(400).json({ error: 'Solução é obrigatória' });
    }

    // Check if already submitted
    const existingSubmission = await prisma.challengeSubmission.findUnique({
      where: {
        challengeId_userId: {
          challengeId: id,
          userId,
        },
      },
    });

    if (existingSubmission) {
      return res.status(400).json({ error: 'Você já submeteu uma solução para este desafio' });
    }

    const submission = await prisma.challengeSubmission.create({
      data: {
        challengeId: id,
        userId,
        solution,
        status: 'pending',
      },
      include: {
        challenge: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // Award XP (assuming approval for now, in production you'd review first)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const newXP = user.xp + XP_REWARDS.COMPLETE_CHALLENGE;
      const newLevel = calculateLevel(newXP);

      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel,
        },
      });

      // Check for new accessories to unlock
      await unlockAccessoriesForLevel(userId, newLevel);

      // Update submission status
      await prisma.challengeSubmission.update({
        where: { id: submission.id },
        data: { status: 'approved' },
      });
    }

    res.status(201).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao submeter desafio' });
  }
};


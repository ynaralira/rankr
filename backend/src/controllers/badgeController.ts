import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const getBadges = async (req: AuthRequest, res: Response) => {
  try {
    const badges = await prisma.badge.findMany({
      orderBy: { name: 'asc' },
    });

    res.json(badges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar badges' });
  }
};

export const getUserBadges = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });

    res.json(userBadges.map((ub) => ub.badge));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar badges do usuário' });
  }
};


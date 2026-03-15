import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const getReferralInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        referralCode: true,
        referralCount: true,
        referralXP: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Get list of referred users
    const referrals = await prisma.user.findMany({
      where: { referredBy: userId },
      select: {
        id: true,
        username: true,
        avatar: true,
        level: true,
        xp: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      referralXP: user.referralXP,
      referrals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações de referência' });
  }
};

export const getTopRecruiters = async (req: AuthRequest, res: Response) => {
  try {
    const topRecruiters = await prisma.user.findMany({
      where: {
        referralCount: {
          gt: 0,
        },
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        referralCount: true,
        referralXP: true,
        level: true,
        xp: true,
      },
      orderBy: { referralCount: 'desc' },
      take: 50,
    });

    res.json(topRecruiters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar top recrutadores' });
  }
};


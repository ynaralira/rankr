import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { calculateLevel, getXPForNextLevel, getXPProgress, getLevelTitle } from '../utils/xp';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        techStack: true,
        xp: true,
        level: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });

    const followersCount = await prisma.follow.count({
      where: { followingId: user.id },
    });

    const followingCount = await prisma.follow.count({
      where: { followerId: user.id },
    });

    const isFollowing = req.userId
      ? !!(await prisma.follow.findUnique({
          where: {
            followerId_followingId: {
              followerId: req.userId,
              followingId: user.id,
            },
          },
        }))
      : false;

    const xpForNextLevel = getXPForNextLevel(user.level);
    const xpProgress = getXPProgress(user.xp, user.level);
    const levelTitle = getLevelTitle(user.level);

    // Get referral stats
    const referralCount = await prisma.user.count({
      where: { referredBy: user.id },
    });

    // Get equipped accessories
    const equippedAccessories = await prisma.userAccessory.findMany({
      where: {
        userId: user.id,
        isEquipped: true,
      },
      include: {
        accessory: true,
      },
    });

    res.json({
      ...user,
      projects,
      badges: badges.map((ub) => ub.badge),
      followersCount,
      followingCount,
      isFollowing,
      xpForNextLevel,
      xpProgress,
      levelTitle,
      referralCount,
      equippedAccessories: equippedAccessories.map((ua) => ua.accessory),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { bio, techStack, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(bio !== undefined && { bio }),
        ...(techStack !== undefined && { techStack }),
        ...(avatar !== undefined && { avatar }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        techStack: true,
        xp: true,
        level: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

export const getTrendingDevelopers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      take: 10,
      orderBy: { xp: 'desc' },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        techStack: true,
        xp: true,
        level: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar desenvolvedores' });
  }
};

export const getRecommendedDevelopers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { techStack: true },
    });

    if (!currentUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Get users with similar tech stack
    const users = await prisma.user.findMany({
      where: {
        id: { not: userId },
        techStack: {
          hasSome: currentUser.techStack,
        },
      },
      take: 10,
      orderBy: { xp: 'desc' },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        techStack: true,
        xp: true,
        level: true,
      },
    });

    // Get equipped accessories for each user
    const usersWithAccessories = await Promise.all(
      users.map(async (user) => {
        const equipped = await prisma.userAccessory.findMany({
          where: {
            userId: user.id,
            isEquipped: true,
          },
          include: {
            accessory: true,
          },
        });

        return {
          ...user,
          equippedAccessories: equipped.map((ua) => ua.accessory),
        };
      })
    );

    res.json(usersWithAccessories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar recomendações' });
  }
};


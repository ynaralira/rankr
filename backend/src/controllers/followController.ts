import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const followerId = req.userId!;
    const { followingId } = req.params;

    if (followerId === followingId) {
      return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
      return res.json({ following: false });
    }

    // Follow
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    res.json({ following: true, follow });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao seguir usuário' });
  }
};

export const getFollowers = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const follows = await prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
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
      orderBy: { createdAt: 'desc' },
    });

    res.json(follows.map((f) => f.follower));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar seguidores' });
  }
};

export const getFollowing = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
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
      orderBy: { createdAt: 'desc' },
    });

    res.json(follows.map((f) => f.following));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar seguindo' });
  }
};


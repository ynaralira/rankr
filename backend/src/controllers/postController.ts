import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { XP_REWARDS, calculateLevel } from '../utils/xp';
import { unlockAccessoriesForLevel } from '../utils/accessories';

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { content, codeSnippet } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const post = await prisma.post.create({
      data: {
        content,
        codeSnippet,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            level: true,
          },
        },
        likes: true,
        comments: {
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

    // Award XP
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const newXP = user.xp + XP_REWARDS.CREATE_POST;
      const newLevel = calculateLevel(newXP);

      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: newXP,
          level: newLevel,
        },
      });
    }

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.query;

    const where = userId ? { userId: userId as string } : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            level: true,
          },
        },
        likes: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { postId } = req.params;

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return res.json({ liked: false });
    }

    // Like
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    // Award XP to post author
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post && post.userId !== userId) {
      const postAuthor = await prisma.user.findUnique({ where: { id: post.userId } });
      if (postAuthor) {
        const newXP = postAuthor.xp + XP_REWARDS.RECEIVE_LIKE;
        const newLevel = calculateLevel(newXP);

        await prisma.user.update({
          where: { id: post.userId },
          data: {
            xp: newXP,
            level: newLevel,
          },
        });

        // Check for new accessories to unlock
        await unlockAccessoriesForLevel(post.userId, newLevel);
      }
    }

    res.json({ liked: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao curtir post' });
  }
};

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
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
      const newXP = user.xp + XP_REWARDS.ANSWER_QUESTION;
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
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar comentário' });
  }
};


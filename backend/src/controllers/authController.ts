import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { calculateLevel } from '../utils/xp';
import { unlockAccessoriesForLevel } from '../utils/accessories';

// Helper function to check and award referral achievements
async function checkReferralAchievements(userId: string, referralCount: number) {
  const achievementMap: { [key: number]: string } = {
    1: 'First Recruit',
    5: 'Talent Scout',
    20: 'Community Builder',
    100: 'Legendary Recruiter',
  };

  const achievementName = achievementMap[referralCount];
  if (achievementName) {
    const badge = await prisma.badge.findUnique({
      where: { name: achievementName },
    });

    if (badge) {
      // Check if user already has this badge
      const existingBadge = await prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId,
            badgeId: badge.id,
          },
        },
      });

      if (!existingBadge) {
        await prisma.userBadge.create({
          data: {
            userId,
            badgeId: badge.id,
          },
        });

        // Award XP for badge
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
          const newXP = user.xp + badge.xpReward;
          const newLevel = calculateLevel(newXP);

          await prisma.user.update({
            where: { id: userId },
            data: {
              xp: newXP,
              level: newLevel,
            },
          });
        }
      }
    }
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, referralCode } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email ou username já existe' });
    }

    // Find referrer if referral code provided
    let referrerId: string | undefined;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        xp: referrerId ? 100 : 0, // Welcome bonus if referred
        level: 1,
        referredBy: referrerId,
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
        referralCode: true,
        createdAt: true,
      },
    });

    // Award referral rewards to inviter
    if (referrerId) {
      const referrer = await prisma.user.findUnique({
        where: { id: referrerId },
      });

      if (referrer) {
        const newXP = referrer.xp + 200;
        const newLevel = calculateLevel(newXP);

        await prisma.user.update({
          where: { id: referrerId },
          data: {
            xp: newXP,
            level: newLevel,
            referralCount: { increment: 1 },
            referralXP: { increment: 200 },
          },
        });

        // Check for referral achievements
        await checkReferralAchievements(referrerId, referrer.referralCount + 1);
        
        // Check for new accessories to unlock
        await unlockAccessoriesForLevel(referrerId, newLevel);
      }
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Update level based on XP
    const currentLevel = calculateLevel(user.xp);
    if (currentLevel !== user.level) {
      await prisma.user.update({
        where: { id: user.id },
        data: { level: currentLevel },
      });
      user.level = currentLevel;
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};


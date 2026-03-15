export const getMyCharacter = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const character = await prisma.character.findFirst({
      where: { userId },
      include: {
        // Inclua acessórios equipados se desejar
      },
    });
    if (!character) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar personagem' });
  }
};
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const getInventory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { level: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Get all accessories unlocked by user
    const userAccessories = await prisma.userAccessory.findMany({
      where: { userId },
      include: {
        accessory: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get all available accessories that user can unlock
    const availableAccessories = await prisma.accessory.findMany({
      where: {
        levelRequired: { lte: user.level },
      },
      orderBy: { levelRequired: 'asc' },
    });

    // Check which accessories should be unlocked but aren't
    const unlockedIds = new Set(userAccessories.map((ua) => ua.accessoryId));
    const toUnlock = availableAccessories.filter((acc) => !unlockedIds.has(acc.id));

    // Auto-unlock accessories based on level
    if (toUnlock.length > 0) {
      await prisma.userAccessory.createMany({
        data: toUnlock.map((acc) => ({
          userId,
          accessoryId: acc.id,
          isEquipped: false,
        })),
        skipDuplicates: true,
      });
    }

    // Refresh user accessories
    const updatedAccessories = await prisma.userAccessory.findMany({
      where: { userId },
      include: {
        accessory: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Group by type
    const grouped = updatedAccessories.reduce((acc, ua) => {
      const type = ua.accessory.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(ua);
      return acc;
    }, {} as Record<string, typeof updatedAccessories>);

    res.json({
      inventory: grouped,
      equipped: updatedAccessories.filter((ua) => ua.isEquipped),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar inventário' });
  }
};

export const equipAccessory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { accessoryId } = req.body;

    if (!accessoryId) {
      return res.status(400).json({ error: 'ID do acessório é obrigatório' });
    }

    // Check if user has this accessory
    const userAccessory = await prisma.userAccessory.findUnique({
      where: {
        userId_accessoryId: {
          userId,
          accessoryId,
        },
      },
    });

    if (!userAccessory) {
      return res.status(404).json({ error: 'Acessório não encontrado no inventário' });
    }

    // Get accessory type to unequip others of same type
    const accessory = await prisma.accessory.findUnique({
      where: { id: accessoryId },
    });

    if (!accessory) {
      return res.status(404).json({ error: 'Acessório não encontrado' });
    }

    // Get all user accessories of the same type
    const sameTypeAccessories = await prisma.userAccessory.findMany({
      where: {
        userId,
        isEquipped: true,
      },
      include: {
        accessory: true,
      },
    });

    // Unequip other accessories of the same type
    for (const ua of sameTypeAccessories) {
      if (ua.accessory.type === accessory.type && ua.accessoryId !== accessoryId) {
        await prisma.userAccessory.update({
          where: { id: ua.id },
          data: { isEquipped: false },
        });
      }
    }

    // Equip the selected accessory
    await prisma.userAccessory.update({
      where: {
        userId_accessoryId: {
          userId,
          accessoryId,
        },
      },
      data: {
        isEquipped: true,
      },
    });

    res.json({ message: 'Acessório equipado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao equipar acessório' });
  }
};

export const unequipAccessory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { accessoryId } = req.body;

    if (!accessoryId) {
      return res.status(400).json({ error: 'ID do acessório é obrigatório' });
    }

    await prisma.userAccessory.update({
      where: {
        userId_accessoryId: {
          userId,
          accessoryId,
        },
      },
      data: {
        isEquipped: false,
      },
    });

    res.json({ message: 'Acessório desequipado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao desequipar acessório' });
  }
};

export const getCharacter = async (req: AuthRequest, res: Response) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        level: true,
        xp: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Get equipped accessories
    const equipped = await prisma.userAccessory.findMany({
      where: {
        userId: user.id,
        isEquipped: true,
      },
      include: {
        accessory: true,
      },
    });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        level: user.level,
        xp: user.xp,
      },
      equipped: equipped.map((ua) => ua.accessory),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar personagem' });
  }
};


import { prisma } from '../lib/prisma';

// Helper function to unlock accessories based on level
export async function unlockAccessoriesForLevel(userId: string, level: number) {
  const availableAccessories = await prisma.accessory.findMany({
    where: {
      levelRequired: { lte: level },
    },
  });

  const userAccessories = await prisma.userAccessory.findMany({
    where: { userId },
    select: { accessoryId: true },
  });

  const unlockedIds = new Set(userAccessories.map((ua) => ua.accessoryId));
  const toUnlock = availableAccessories.filter((acc) => !unlockedIds.has(acc.id));

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
}


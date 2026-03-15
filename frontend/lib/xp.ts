export const getXPForNextLevel = (currentLevel: number): number => {
  // XP needed for next level = (level^2) * 100
  return currentLevel * currentLevel * 100;
};

export const getXPProgress = (currentXP: number, currentLevel: number): number => {
  const xpForCurrentLevel = (currentLevel - 1) * (currentLevel - 1) * 100;
  const xpForNextLevel = currentLevel * currentLevel * 100;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = currentXP - xpForCurrentLevel;
  
  return Math.min(100, Math.max(0, (xpProgress / xpNeeded) * 100));
};

export const getLevelTitle = (level: number): string => {
  if (level >= 20) return 'Architect';
  if (level >= 10) return 'Senior Developer';
  if (level >= 5) return 'Developer';
  return 'Beginner';
};


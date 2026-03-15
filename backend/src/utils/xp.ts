export const XP_REWARDS = {
  POST_PROJECT: 50,
  RECEIVE_LIKE: 10,
  ANSWER_QUESTION: 40,
  COMPLETE_CHALLENGE: 100,
  EARN_BADGE: 25,
  CREATE_POST: 20,
  REFERRAL_INVITER: 200,
  REFERRAL_INVITED: 100,
};

export const calculateLevel = (xp: number): number => {
  // Level formula: level = floor(sqrt(xp / 100)) + 1
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

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


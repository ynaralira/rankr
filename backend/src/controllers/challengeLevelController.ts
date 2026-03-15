import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createChallenge = async (req: Request, res: Response) => {
  try {
    const { title, content, xpReward, endDate } = req.body;
    const challenge = await prisma.challenge.create({
      data: { title, content, xpReward, endDate },
    });
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar desafio', details: error });
  }
};

export const getChallenges = async (_req: Request, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany({
      include: { levels: true },
    });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar desafios', details: error });
  }
};

export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: { levels: true },
    });
    if (!challenge) return res.status(404).json({ error: 'Desafio não encontrado' });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar desafio', details: error });
  }
};

export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, xpReward, endDate } = req.body;
    const challenge = await prisma.challenge.update({
      where: { id },
      data: { title, content, xpReward, endDate },
    });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar desafio', details: error });
  }
};

export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.challenge.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar desafio', details: error });
  }
};

export const createChallengeLevel = async (req: Request, res: Response) => {
  try {
    const { challengeId, level, description, xpReward } = req.body;
    const challengeLevel = await prisma.challengeLevel.create({
      data: { challengeId, level, description, xpReward },
    });
    res.status(201).json(challengeLevel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar nível de desafio', details: error });
  }
};

export const getChallengeLevels = async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    const levels = await prisma.challengeLevel.findMany({
      where: { challengeId },
    });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar níveis', details: error });
  }
};

export const updateChallengeLevel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { level, description, xpReward } = req.body;
    const challengeLevel = await prisma.challengeLevel.update({
      where: { id },
      data: { level, description, xpReward },
    });
    res.json(challengeLevel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar nível', details: error });
  }
};

export const deleteChallengeLevel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.challengeLevel.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar nível', details: error });
  }
};

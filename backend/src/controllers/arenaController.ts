import { AuthRequest } from '../middleware/auth';
// Inscreve usuário/guilda na arena
export const enrollArena = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    await prisma.arena.update({
      where: { id },
      data: {
        participants: {
          connect: { id: userId },
        },
      },
    });
    res.json({ message: 'Inscrição realizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inscrever na arena' });
  }
};

// Lista desafios ativos da arena
export const getArenaChallenges = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const challenges = await prisma.challenge.findMany({
      where: { arenaId: id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar desafios da arena' });
  }
};

// Submete solução para desafio da arena
export const submitArenaChallenge = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { challengeId, solution, githubUrl, fileUrl } = req.body;
    const userId = req.userId;
    const submission = await prisma.challengeSubmission.create({
      data: {
        challengeId,
        userId,
        solution,
        githubUrl,
        fileUrl,
        status: 'pending',
      },
    });
    res.json({ message: 'Solução enviada!', submission });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao submeter solução' });
  }
};

// Ranking da arena
export const getArenaRanking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    // Ranking: soma de XP dos participantes da arena
    const arena = await prisma.arena.findUnique({
      where: { id },
      include: {
        participants: true,
      },
    });
    if (!arena) return res.status(404).json({ error: 'Arena não encontrada' });
    const ranking = arena.participants
      .map(u => ({ username: u.username, xp: u.xp, level: u.level }))
      .sort((a, b) => b.xp - a.xp);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ranking da arena' });
  }
};
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createArena = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const arena = await prisma.arena.create({
      data: { name, description },
    });
    res.status(201).json(arena);
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      res.status(400).json({ error: 'Já existe uma arena com esse nome.' });
    } else {
      res.status(500).json({ error: 'Erro ao criar arena', details: error });
    }
  }
};

export const getArenas = async (_req: Request, res: Response) => {
  try {
    const arenas = await prisma.arena.findMany({
      include: { competitions: true },
    });
    res.json(arenas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar arenas', details: error });
  }
};

export const getArenaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const arena = await prisma.arena.findUnique({
      where: { id },
      include: { competitions: true },
    });
    if (!arena) return res.status(404).json({ error: 'Arena não encontrada' });
    res.json(arena);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar arena', details: error });
  }
};

export const updateArena = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const arena = await prisma.arena.update({
      where: { id },
      data: { name, description },
    });
    res.json(arena);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar arena', details: error });
  }
};

export const deleteArena = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.arena.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar arena', details: error });
  }
};

export const createCompetition = async (req: Request, res: Response) => {
  try {
    const { arenaId, guildAId, guildBId, prize } = req.body;
    const competition = await prisma.competition.create({
      data: {
        arenaId,
        guildAId,
        guildBId,
        prize,
      },
    });
    res.status(201).json(competition);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar competição', details: error });
  }
};

export const getCompetitions = async (_req: Request, res: Response) => {
  try {
    const competitions = await prisma.competition.findMany();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar competições', details: error });
  }
};

export const getCompetitionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const competition = await prisma.competition.findUnique({ where: { id } });
    if (!competition) return res.status(404).json({ error: 'Competição não encontrada' });
    res.json(competition);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar competição', details: error });
  }
};

export const updateCompetition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { winnerId, prize } = req.body;
    const competition = await prisma.competition.update({
      where: { id },
      data: { winnerId, prize },
    });
    res.json(competition);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar competição', details: error });
  }
};

export const deleteCompetition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.competition.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar competição', details: error });
  }
};

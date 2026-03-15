import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createGuild = async (req: Request, res: Response) => {
  try {
    const { name, description, leaderId, viceLeaderId } = req.body;
    const guild = await prisma.guild.create({
      data: {
        name,
        description,
        leaderId,
        viceLeaderId,
      },
    });
    await prisma.guildMember.create({
      data: {
        userId: leaderId,
        guildId: guild.id,
        role: 'leader',
      },
    });
    if (viceLeaderId) {
      await prisma.guildMember.create({
        data: {
          userId: viceLeaderId,
          guildId: guild.id,
          role: 'vice-leader',
        },
      });
    }
    res.status(201).json(guild);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar guilda', details: error });
  }
};

export const getGuilds = async (_req: Request, res: Response) => {
  try {
    const guilds = await prisma.guild.findMany({
      include: {
        members: true,
        arenas: true,
      },
    });
    res.json(guilds);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guildas', details: error });
  }
};

export const getGuildById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const guild = await prisma.guild.findUnique({
      where: { id },
      include: {
        members: true,
        arenas: true,
      },
    });
    if (!guild) return res.status(404).json({ error: 'Guilda não encontrada' });
    res.json(guild);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar guilda', details: error });
  }
};

export const updateGuild = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, leaderId, viceLeaderId } = req.body;
    const guild = await prisma.guild.update({
      where: { id },
      data: { name, description, leaderId, viceLeaderId },
    });
    res.json(guild);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar guilda', details: error });
  }
};

export const deleteGuild = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.guild.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar guilda', details: error });
  }
};

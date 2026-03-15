import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';
import postRoutes from './routes/posts';
import challengeRoutes from './routes/challenges';
import badgeRoutes from './routes/badges';
import jobRoutes from './routes/jobs';
import followRoutes from './routes/follows';
import referralRoutes from './routes/referrals';
import characterRoutes from './routes/character';
import guildRoutes from './routes/guilds';
import challengeLevelRoutes from './routes/challengeLevels';
import arenaRoutes from './routes/arenas';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';
import postRoutes from './routes/posts';
import challengeRoutes from './routes/challenges';
import badgeRoutes from './routes/badges';
import jobRoutes from './routes/jobs';
import followRoutes from './routes/follows';
import referralRoutes from './routes/referrals';
import characterRoutes from './routes/character';
import guildRoutes from './routes/guilds';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/character', characterRoutes);
app.use('/api/guilds', guildRoutes);
app.use('/api/challenge-levels', challengeLevelRoutes);
app.use('/api/arenas', arenaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodeQuest API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 CodeQuest API running on port ${PORT}`);
});


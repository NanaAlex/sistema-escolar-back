import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import alunosRoutes from './routes/alunosRoutes';
import chamadasRoutes from './routes/chamadasRoutes';
import turmasRoutes from './routes/turmasRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use('/alunos', alunosRoutes);
app.use('/chamadas', chamadasRoutes);
app.use('/turmas', turmasRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
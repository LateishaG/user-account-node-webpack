import express from 'express';
const app = express();
import * as dotENV from 'dotenv';
dotENV.config();
import path from 'path';
import URL from 'url';
import authRouter from './api/auth.js';

const __dirname = URL.fileURLToPath(path.normalize(import.meta.url + '/..'));

app.use(express.json({ limit: '50mb' }));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

export default app;

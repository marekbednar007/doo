import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.get('/api', (_req, res) => {
  res.status(200).send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Listening to the port: ${PORT}`);
});

import path from 'path';
import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/api';
import OpenAI from 'openai';
// import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// OpenAI auth: https://github.com/openai/openai-node
const client = new OpenAI({ apiKey: process.env['OPENAI_KEY'] });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/api', router(client));

app.get('/', (_req, res) => {
  res.send('hello, this is doo.');
});

// Global Error Handler
// https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to the port: ${PORT}`);
});

/* 
1/ User is going to type into a typing bar [DONE]
2/ Upon submit we're going to call a function [DONE]
that's going to make an (POST method) API call
to something like: '/api/getResponse' [DONE]
3/ The body of the request is going to be the PROMPT [DONE]
4/ We then have to be ready to receive the answer
5/

STRETCH FEATURES:
1/ Store data in the database
2/ Authentication

*/

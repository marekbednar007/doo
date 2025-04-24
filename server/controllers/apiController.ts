import { Request, Response, NextFunction } from 'express';
import type OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
// import models from '../src/apiModels';

const promptOpenAI = async (
  systemPrompt: string,
  prompt: string,
  client: OpenAI
) => {
  // // STREAMING: https://platform.openai.com/docs/guides/streaming-responses?api-mode=responses&lang=javascript
  // // REAL LIVE STREAMING EVENTS:
  // const stream = client.responses.create({
  //   model: 'gpt-4.1',
  //   input: [
  //     {
  //       role: 'system',
  //       content: systemPrompt,
  //     },
  //     { role: 'user', content: prompt },
  //   ],
  //   stream: true,
  // });

  // CHAT COMPLETION
  const completion = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      { role: 'user', content: prompt },
    ],
    store: true,
    stream: true,
  });

  // https://www.youtube.com/watch?v=3ECwPC464cs
  let fullContent = '';
  for await (const part of completion) {
    let content = part.choices[0].delta.content ?? '';
    fullContent += content;
  }

  // const content = completion.choices[0]?.message.content;
  return fullContent;
};

const apiController = {
  postMessage: async (
    req: Request,
    res: Response,
    next: NextFunction,
    client: OpenAI
  ): Promise<void> => {
    const { prompt } = req.body;
    if (!prompt) {
      return next({
        log: `apiController.postMessage error`,
        status: 400,
        message: 'An error ocurred when invoking apiController.postMessage',
      });
    }

    const systemPrompt = fs.readFileSync(
      path.join(__dirname, './systemPrompt.txt'),
      'utf8'
    );

    let result;
    try {
      result = await promptOpenAI(systemPrompt, prompt, client);
      res.locals.newMessage = result;
      console.log(`res.locals.newMessage: ${res.locals.newMessage}`);
      return next();
    } catch (err: unknown) {
      return next({
        log: `Error in apiController.postMessage: ${err}`,
        status: 500,
        message: 'An error occurred processing your request',
      });
    }
  },

  getResponse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.aiResponse = { message: 'AI message' };
      return next();
    } catch (err) {
      next(err);
    }
  },
};

export default apiController;

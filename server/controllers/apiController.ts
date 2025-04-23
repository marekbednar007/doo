import { Request, Response, NextFunction } from 'express';
import type OpenAI from 'openai';
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
  });

  const content = completion.choices[0]?.message.content;
  return content;
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

    const systemPrompt = `You are a coding mentor to the student. 
    You guide the student to the answer she is looking for but you never give away a full answer.`;

    let result;
    try {
      result = await promptOpenAI(
        systemPrompt,
        prompt,
        client
        // res.locals.openaiClient
      );
      // if (result) {
      //   const parsedresults = JSON.parse(result);
      // }
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

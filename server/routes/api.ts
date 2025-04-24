import { Router, Request, Response, NextFunction } from 'express';
import type OpenAI from 'openai';

// Had to change rootDir inside tsconfig.json from './src' to '.'
import apiController from '../controllers/apiController';

export default function (client: OpenAI) {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    res.status(200).send('API is working.');
  });

  // // Move the logic into our controller
  // // https://www.youtube.com/watch?v=FPkgrLr0KBU
  router.post(
    '/postMessage',
    (req: Request, res: Response, next: NextFunction) =>
      apiController.postMessage(req, res, next, client),
    (req, res) => {
      res.status(200).json(res.locals.newMessage);
    }
  );

  router.post(
    '/getResponse',
    apiController.getResponse,
    (req: Request, res: Response) => {
      res.status(200).json(res.locals.aiResponse);
    }
  );

  return router;
}

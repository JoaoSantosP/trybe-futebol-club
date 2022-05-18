import * as express from 'express';
import { Request, Response } from 'express';
import Match from '../database/models/Match';
import MatchsController from '../controllers/matchsController';
import validateToken from '../controllers/middlewares/validateToken';
import IcreateMatch from '../interfaces/interfaceMatch';
import Iscoreboard from '../interfaces/interfaceScoreBoard';

const matchsR = express.Router();

matchsR.get('/matchs', async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
    const mt = await MatchsController.getMatchsController();
    return res.status(200).json(mt);
  }
  const progress = inProgress === 'true';
  const matches: Match[] = progress ? await MatchsController.getInProgress(progress)
    : await MatchsController.getInProgress(progress);

  return res.status(200).json(matches);
});

matchsR.post('/matchs', validateToken, async (req: Request, res: Response) => {
  try {
    const objMatch: IcreateMatch = req.body;
    const createMatch = await MatchsController.createMatch(objMatch);
    res.status(201).json(createMatch);
  } catch ({ message }) {
    console.log(message);
    res.status(401).json({ message });
  }
});

matchsR.patch('/matchs/:id/finish', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const endMatch = await MatchsController.finishedMatch(Number(id));
    res.status(200).json(endMatch);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

matchsR.patch('/matchs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const scoreboard: Iscoreboard = req.body;
  if (!scoreboard.homeTeamGoals) {
    const finishMatch = await MatchsController.finishedMatch(id);
    return res.status(200).json(finishMatch);
  }
  const updateScore = await MatchsController.updateScoreboard(id, scoreboard);
  return res.status(200).json(updateScore);
});

export default matchsR;

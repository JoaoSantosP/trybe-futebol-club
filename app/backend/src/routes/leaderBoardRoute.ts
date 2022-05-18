import * as express from 'express';
import { Request, Response } from 'express';
import LeaderBoard from '../controllers/leaderBoaderController';

const leaderBoarderR = express.Router();

leaderBoarderR.get('/leaderboard/home', async (req: Request, res: Response) => {
  const find = await LeaderBoard.getLeaderBoardHome();
  return res.status(200).json(find);
});

leaderBoarderR.get('/leaderboard/away', async (req: Request, res: Response) => {
  const find = await LeaderBoard.getLeaderBoardAway();
  return res.status(200).json(find);
});

leaderBoarderR.get('/leaderboard', async (req: Request, res: Response) => {
  const find = await LeaderBoard.getLeaderBoard();
  return res.status(200).json(find);
});
export default leaderBoarderR;

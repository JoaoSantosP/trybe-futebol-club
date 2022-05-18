import * as express from 'express';
import { Request, Response } from 'express';
import ClubsController from '../controllers/clubsController';

const clubsR = express.Router();

clubsR.get('/clubs', async (req: Request, res: Response) => {
  const c = await ClubsController.getAllClubs();
  res.status(200).json(c);
});

clubsR.get('/clubs/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const cId = await ClubsController.getClubId(id);
  res.status(200).json(cId);
});

export default clubsR;

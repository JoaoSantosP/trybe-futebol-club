import * as express from 'express';
import { Request, Response } from 'express';
import LoginValidateController from '../controllers/loginValidateController';
import validateToken from '../controllers/middlewares/validateToken';

const loginValidate = express.Router();

loginValidate.get('/login/validate', validateToken, async (req: Request, res: Response) => {
  const { id } = req.body;
  const loginC = await LoginValidateController.validateController(id);
  res.status(200).json(loginC);
});

export default loginValidate;

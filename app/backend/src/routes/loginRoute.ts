import * as express from 'express';
import { Request, Response } from 'express';
// import * as rescue from 'express-rescue'
import Login from '../controllers/loginController';
import validateLogin from '../controllers/middlewares/validateLogin';

const loginR = express.Router();

loginR.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await Login.login(email, password);
    // console.log(token);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
});

export default loginR;

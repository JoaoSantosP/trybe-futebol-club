import { Request, Response, NextFunction } from 'express';

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const validateLogin = [validateEmail, validatePassword];

export default validateLogin;

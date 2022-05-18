import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const secret: jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');
    const decode = jwt.verify(token, secret) as jwt.JwtPayload;
    const { id } = decode;
    req.body.id = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

export default validateToken;

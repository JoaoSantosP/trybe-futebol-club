import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import User from '../database/models/User';

export default class ServiceLogin {
  public static async getUser(email: string, password: string) {
    const u = await User.findOne({ where: { email } });
    if (!u) {
      const error = new Error();
      error.message = 'Incorrect email or password';
      throw error;
    }
    const b = await bcrypt.compare(password, u.password);
    if (!b) {
      const error = new Error();
      error.message = 'Incorrect email or password';
      throw error;
    }
    const { id, username, role } = u;
    const SECRET: jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');
    const token = jwt.sign({ id }, SECRET);
    return { user: { id, username, role, email }, token };
  }
}

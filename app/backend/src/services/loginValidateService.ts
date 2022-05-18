import User from '../database/models/User';

export default class LoginValidateService {
  public static async validateService(id: string | number) {
    const u = await User.findByPk(id);
    const { role } = u as User;
    return role;
  }
}

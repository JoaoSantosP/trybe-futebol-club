import ServiceLogin from '../services/loginService';

export default class Login {
  public static login(email: string, password: string) {
    return ServiceLogin.getUser(email, password);
  }
}

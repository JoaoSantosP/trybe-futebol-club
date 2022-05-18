import LoginValidateService from '../services/loginValidateService';

export default class LoginValidateController {
  public static validateController(id: string | number) {
    return LoginValidateService.validateService(id);
  }
}

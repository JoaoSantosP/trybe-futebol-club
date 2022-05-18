import ServiceMatchs from '../services/matchsService';
import IcreateMatch from '../interfaces/interfaceMatch';
import Iscoreboard from '../interfaces/interfaceScoreBoard';

export default class MatchsController {
  public static getMatchsController() {
    return ServiceMatchs.getMatchs();
  }

  public static getInProgress(progress: boolean) {
    return ServiceMatchs.getMatchsInProgress(progress);
  }

  public static async createMatch(objMatch: IcreateMatch) {
    const created = await ServiceMatchs.create(objMatch);
    return created;
  }

  public static async finishedMatch(id: number | string) {
    return ServiceMatchs.finishedMatch(id);
  }

  public static async updateScoreboard(id: number | string, scoreboard: Iscoreboard) {
    return ServiceMatchs.updateScoreboard(id, scoreboard);
  }
}

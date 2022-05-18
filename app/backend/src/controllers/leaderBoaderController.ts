import LeaderBoardAwayService from '../services/leaderBoardAwayService';
import LeaderBoardService from '../services/leaderBoardService';
import LeaderBoardHomeService from '../services/leaderBoardHomeService';

export default class LeaderBoard {
  public static getLeaderBoardHome() {
    return LeaderBoardHomeService.sortLeaderBoardHome();
  }

  public static getLeaderBoardAway() {
    return LeaderBoardAwayService.sortLeaderBoardAway();
  }

  public static getLeaderBoard() {
    return LeaderBoardService.sortLeaderBoard();
  }
}

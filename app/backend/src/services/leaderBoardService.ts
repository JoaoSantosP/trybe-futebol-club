import Match from '../database/models/Match';
import Club from '../database/models/Club';
import { IMatchClub } from '../interfaces/interfaceMatch';
import LeaderBoardAwayService from './leaderBoardAwayService';
import LeaderBoardHomeService from './leaderBoardHomeService';

export default class LeaderBoardService {
  public static async orgMatchsWithClubs() {
    const f = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    }) as unknown as IMatchClub[];
    return f;
  }

  public static totalPoints(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalPoints(clubArr);
    const away = LeaderBoardAwayService.totalPoints(clubArr2);
    const soma = away + home;
    return soma;
  }

  public static totalGames(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalGames(clubArr);
    const away = LeaderBoardAwayService.totalGames(clubArr2);
    const totalGames = away + home;
    return totalGames;
  }

  public static totalVictories(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalVictories(clubArr);
    const away = LeaderBoardAwayService.totalVictories(clubArr2);
    const totalVictories = away + home;
    return totalVictories;
  }

  public static totalDraws(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalDraws(clubArr);
    const away = LeaderBoardAwayService.totalDraws(clubArr2);
    const totalDraws = away + home;
    return totalDraws;
  }

  public static totalLosses(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalLosses(clubArr);
    const away = LeaderBoardAwayService.totalLosses(clubArr2);
    const totalLosses = away + home;
    return totalLosses;
  }

  public static totalGoalsFavor(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalGoalsFavor(clubArr);
    const away = LeaderBoardAwayService.totalGoalsFavor(clubArr2);
    const totalGoalsFavor = away + home;
    return totalGoalsFavor;
  }

  public static totalGoalsOwn(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.totalGoalsOwn(clubArr);
    const away = LeaderBoardAwayService.totalGoalsOwn(clubArr2);
    const totalGoalsOwn = away + home;
    return totalGoalsOwn;
  }

  public static goalsBalance(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    const home = LeaderBoardHomeService.goalsBalance(clubArr);
    const away = LeaderBoardAwayService.goalsBalance(clubArr2);
    const goalsBalance = away + home;
    return goalsBalance;
  }

  public static totalEfficiency(clubArr: IMatchClub[], clubArr2: IMatchClub[]) {
    // const home = LeaderBoardHomeService.totalEfficiency(clubArr);
    // const away = LeaderBoardAwayService.totalEfficiency(clubArr2);
    const totalPoints = this.totalPoints(clubArr, clubArr2);
    const totalGames = this.totalGames(clubArr, clubArr2);
    const totalEfficiency = parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    return totalEfficiency;
  }

  public static async getLeaderBoard() {
    const clubsArr = await Club.findAll();
    const clubsMatch = await this.orgMatchsWithClubs();
    return clubsArr.map((c) => {
      const filter = clubsMatch.filter((m: IMatchClub) => m.homeClub.clubName === c.clubName);
      const filter2 = clubsMatch.filter((m: IMatchClub) => m.awayClub.clubName === c.clubName);
      const objClassificacao = {
        name: c.clubName,
        totalPoints: this.totalPoints(filter, filter2),
        totalGames: this.totalGames(filter, filter2),
        totalVictories: this.totalVictories(filter, filter2),
        totalDraws: this.totalDraws(filter, filter2),
        totalLosses: this.totalLosses(filter, filter2),
        goalsFavor: this.totalGoalsFavor(filter, filter2),
        goalsOwn: this.totalGoalsOwn(filter, filter2),
        goalsBalance: this.goalsBalance(filter, filter2),
        efficiency: this.totalEfficiency(filter, filter2),
      }; return objClassificacao;
    });
  }

  public static async sortLeaderBoard() {
    const leaderBoard = await this.getLeaderBoard();
    return leaderBoard.sort((a, b) => {
      if (a.goalsOwn === b.goalsOwn) return 0;
      return a.goalsOwn < b.goalsOwn ? -1 : 1;
    }).sort((a, b) => {
      if (a.goalsFavor === b.goalsFavor) return 0;
      return a.goalsFavor > b.goalsFavor ? -1 : 1;
    }).sort((a, b) => {
      if (a.goalsBalance === b.goalsBalance) return 0;
      return a.goalsBalance > b.goalsBalance ? -1 : 1;
    }).sort((a, b) => {
      if (a.totalVictories === b.totalVictories) return 0;
      return a.totalVictories > b.totalVictories ? -1 : 1;
    })
      .sort((a, b) => {
        if (a.totalPoints === b.totalPoints) return 0;
        return a.totalPoints > b.totalPoints ? -1 : 1;
      });
  }
}

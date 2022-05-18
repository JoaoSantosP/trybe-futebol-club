import Match from '../database/models/Match';
import Club from '../database/models/Club';
import { IMatchClub } from '../interfaces/interfaceMatch';

export default class LeaderBoardHomeService {
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

  public static totalPoints(clubArr: IMatchClub[]) {
    let totalPoints = 0;
    let point = 0;
    clubArr.map((c: IMatchClub) => {
      if (c.homeTeamGoals > c.awayTeamGoals) {
        point = 3;
      }
      if (c.homeTeamGoals === c.awayTeamGoals) {
        point = 1;
      }
      if (c.homeTeamGoals < c.awayTeamGoals) {
        point = 0;
      }
      return point;
    }).forEach((p) => { totalPoints += p; });
    return totalPoints;
  }

  public static totalGoalsOwn(clubArr: IMatchClub[]) {
    let totalGoalsOwn = 0;
    clubArr.map((c: IMatchClub) => c)
      .forEach((team: IMatchClub) => { totalGoalsOwn += team.awayTeamGoals; });
    return totalGoalsOwn;
  }

  public static goalsBalance(clubArr: IMatchClub[]) {
    let goalsBalance = 0;
    clubArr.map((c: IMatchClub) => c).forEach((team) => {
      goalsBalance += team.homeTeamGoals - team.awayTeamGoals;
    });
    return goalsBalance;
  }

  public static totalGoalsFavor(clubArr: IMatchClub[]) {
    let totalGoals = 0;
    clubArr.map((c: IMatchClub) => c).forEach((team: IMatchClub) => {
      totalGoals += team.homeTeamGoals;
    });
    return totalGoals;
  }

  public static totalVictories(clubArr: IMatchClub[]) {
    let victoriesCount = 0;
    clubArr.map((c: IMatchClub) => c).forEach((team: IMatchClub) => {
      if (team.homeTeamGoals > team.awayTeamGoals) {
        victoriesCount += 1;
      }
    });
    return victoriesCount;
  }

  public static totalDraws(clubArr: IMatchClub[]) {
    let drawsCount = 0;
    clubArr.map((c: IMatchClub) => c).forEach((team: IMatchClub) => {
      if (team.homeTeamGoals === team.awayTeamGoals) {
        drawsCount += 1;
      }
    });
    return drawsCount;
  }

  public static totalLosses(clubArr: IMatchClub[]) {
    let lossesCount = 0;
    clubArr.map((c) => c).forEach((team) => {
      if (team.homeTeamGoals < team.awayTeamGoals) {
        lossesCount += 1;
      }
    });
    return lossesCount;
  }

  public static totalGames(clubArr: IMatchClub[]) {
    let totalGames = 0;
    clubArr.map((c: IMatchClub) => {
      if (c.homeTeam) {
        return 1;
      }
      return 0;
    }).forEach((g) => { totalGames += g; });
    return totalGames;
  }

  public static totalEfficiency(clubArr: IMatchClub[]) {
    const totalPoints = this.totalPoints(clubArr);
    const totalGames = this.totalGames(clubArr);
    let totalEfficiency = 0;
    clubArr.map((c: IMatchClub) => c).forEach(() => {
      totalEfficiency = parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    });
    return totalEfficiency;
  }

  public static async getLeaderBoardHome() {
    const clubsArr = await Club.findAll();
    const clubsMatch = await this.orgMatchsWithClubs();
    return clubsArr.map((c) => {
      const filter = clubsMatch.filter((m: IMatchClub) => m.homeClub.clubName === c.clubName);
      const objClassificacao = {
        name: c.clubName,
        totalPoints: this.totalPoints(filter),
        totalGames: this.totalGames(filter),
        totalVictories: this.totalVictories(filter),
        totalDraws: this.totalDraws(filter),
        totalLosses: this.totalLosses(filter),
        goalsFavor: this.totalGoalsFavor(filter),
        goalsOwn: this.totalGoalsOwn(filter),
        goalsBalance: this.goalsBalance(filter),
        efficiency: this.totalEfficiency(filter),
      };
      return objClassificacao;
    });
  }

  public static async sortLeaderBoardHome() {
    const leaderBoard = await this.getLeaderBoardHome();
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

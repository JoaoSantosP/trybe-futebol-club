import Iscoreboard from '../interfaces/interfaceScoreBoard';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import IcreateMatch from '../interfaces/interfaceMatch';

export default class ServiceMatchs {
  public static async getMatchs() {
    const matchs = await Match.findAll({ include: [{
      model: Club, as: 'homeClub', attributes: ['clubName'] }, {
      model: Club, as: 'awayClub', attributes: ['clubName'] }] });
    return matchs;
  }

  public static async getMatchsInProgress(progress: boolean) {
    const matchsInProgress = await Match.findAll({ where: { inProgress: progress },
      include: [{
        model: Club, as: 'homeClub', attributes: ['clubName'] }, {
        model: Club, as: 'awayClub', attributes: ['clubName'] }] });

    return matchsInProgress;
  }

  public static async create(objMatch: IcreateMatch) {
    const homeT = await Club.findByPk(objMatch.homeTeam);
    const awayT = await Club.findByPk(objMatch.awayTeam);
    if (!homeT || !awayT) {
      throw new Error('There is no team with such id!');
    }
    if (homeT.id === awayT.id) {
      throw new Error('It is not possible to create a match with two equal teams');
    }
    const newMatch = { homeTeam: objMatch.homeTeam,
      awayTeam: objMatch.awayTeam,
      homeTeamGoals: objMatch.homeTeamGoals,
      awayTeamGoals: objMatch.awayTeamGoals,
      inProgress: objMatch.inProgress,
    };
    const matchCreated = await Match.create(newMatch);
    console.log(newMatch, 'Newmatch', matchCreated, 'created');
    return matchCreated;
  }

  public static async finishedMatch(idMatch: string | number) {
    const find = await Match.findByPk(idMatch);
    if (!find) {
      const error = new Error();
      error.message = 'Cannot find one match with the id provided';
      throw error;
    }
    const update = await Match.update({ inProgress: false }, { where: { id: idMatch } });
    // console.log(update);
    return update;
  }

  public static async updateScoreboard(idMatch: string | number, scoreboard: Iscoreboard) {
    const h = scoreboard.homeTeamGoals;
    const a = scoreboard.awayTeamGoals;
    await Match.update({ homeTeamGoals: h, awayTeamGoals: a }, { where: { id: idMatch } });

    const find = await Match.findByPk(idMatch);
    return find;
  }
}

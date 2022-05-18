import ServiceClubs from '../services/clubsService';

export default class ClubsController {
  public static getAllClubs() {
    return ServiceClubs.getAll();
  }

  public static getClubId(id: string | number) {
    return ServiceClubs.getId(id);
  }
}

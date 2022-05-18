import Club from '../database/models/Club';

export default class ServiceClubs {
  public static async getAll() {
    const clubs = await Club.findAll();
    return clubs;
  }

  public static async getId(id: string | number) {
    const club = await Club.findOne({ where: { id } });
    return club;
  }
}

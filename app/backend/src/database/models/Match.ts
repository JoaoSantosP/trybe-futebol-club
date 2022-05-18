import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  // public <campo>!: <tipo>;
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Match.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});
// um club possui muitos jogos
Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });
// um jogo pertece a um club

export default Match;

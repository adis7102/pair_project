'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGame = sequelize.define('UserGame', {
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER
  }, {});
  UserGame.associate = function (models) {
    // associations can be defined here
    UserGame.belongsTo(models.Game, {
      foreignKey: 'GameId'
    })
    UserGame.belongsTo(models.User, {
      foreignKey: 'UserId'
    })
  };
  return UserGame;
};
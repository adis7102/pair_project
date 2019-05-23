'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    image_location: DataTypes.STRING
  }, {});
  Game.associate = function (models) {
    // associations can be defined here
    Game.hasMany(models.UserGame, {
      foreignKey: 'GameId'
    })
  };
  return Game;
};
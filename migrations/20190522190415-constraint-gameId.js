'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserGames', ['GameId'], {
      type: 'foreign key',
      name: 'constraintGamerId',
      references: { //Required field
        table: 'Games',
        field: 'id'
      },
      onDelete: 'set null',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.removeConstraint('UserGames', 'constraintGamerId', {});
  }
};
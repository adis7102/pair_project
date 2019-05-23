'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserGames', ['UserId'], {
      type: 'foreign key',
      name: 'constraintUserId',
      references: { //Required field
        table: 'Users',
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
    return queryInterface.removeConstraint('UserGames', 'constraintUserId', {});
  }
};
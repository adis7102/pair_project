'use strict';

var fs = require('fs')

let games = fs.readFileSync('./games.csv', 'utf8').split('\n')

let result = [];
for (let game of games) {

    game = game.split(',')
    result.push({
        name: game[0],
        price: Number(game[1]),
        rating: Number(game[2]),
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

console.log(result)

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Games', result, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Games', null, {});
    }
};
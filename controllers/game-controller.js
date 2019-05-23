const Model = require('../models/index.js')
const Game = Model.Game
const User = Model.User
const UserGame = Model.UserGame

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ControllerGame {

    static add(req, res) {
        let newGame = {
            name: req.body.name,
            price: Number(req.body.price),
            rating: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            image_location: req.body.image_location
        }
        Game.create(newGame)
            .then(() => {
                res.redirect('/games')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static search(req,res) {
        Game.findAll({
          where : {
              name : {
                  [Op.iLike]: '%' + req.body.search + '%'
              }
          }
        })
        .then(data => {
            res.render('search.ejs', {
                games : data
            })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getFive(req, res) {
        Game.findAll({
                order: [
                    ['rating', 'DESC']
                ],
                limit: 5
            })
            .then(allGames => {
                // console.log(allGames)
                res.render('home.ejs', {
                    allGames: allGames
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAll(req, res) {
        Game.findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(allGames => {
                // console.log(allGames)
                if (req.session.currentUser) {
                    res.render('games.ejs', {
                        user: req.session.currentUser,
                        allGames: allGames
                    })
                } else {
                    res.render('games.ejs', {
                        allGames: allGames
                    })
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static checkout(req, res) {
        Game.findOne({
                where: {
                    id: req.params.gamesId
                }
            })
            .then(game => {
                console.log(game)
                res.render('checkout.ejs', {
                    game: game.dataValues
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buy(req, res) {


        if (req.session.currentUser.id != undefined) {
            User.findOne({
                    where: {
                        id: req.session.currentUser.id
                    }
                })
                .then(user => {
                    // res.send(user)
                    return user.balance
                })

                .then(userBalance => {
                    let data = {
                        UserId: req.session.currentUser.id,
                        GameId: req.params.gamesId
                    }
                    Game.findByPk(req.params.gamesId)
                        .then(game => {
                            if (userBalance >= game.dataValues.price) {
                                UserGame.create(data)
                                    .then(() => {
                                        let change = userBalance - game.dataValues.price
                                        let update = {
                                            balance: change
                                        }
                                        console.log(change)
                                        User.update(update, {
                                                where: {
                                                    id: req.session.currentUser.id
                                                }
                                            })
                                            .then(() => {
                                                res.send(`SUCCESS!!`)
                                            })
                                    })
                            } else {
                                res.send(`Not enough money`)
                            }
                        })
                })
        } else {
            res.render('loginfirst.ejs')
        }
    }

    static displayList(req, res) {
        if (req.session.currentUser != undefined) {
            if (req.session.currentUser.name == 'admin') {
                Game.findAll()
                    .then(games => {
                        res.render('edit.ejs', {
                            games: games
                        })
                    })

                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.send(`You're not an Admin`)
            }
        } else {
            res.render(`loginfirst.ejs`)
        }
    }

    static displayEdit(req, res) {
        Game.findByPk(req.params.id)
            .then(game => {
                res.render('edit.ejs', {
                    game: game.dataValues
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req, res) {
        let updated = {
            name: req.body.name,
            price: Number(req.body.price),
            image_location: req.body.image_location
        }
        Game.update(updated, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/games')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        Game.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/games')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerGame;
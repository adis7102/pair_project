const Model = require('../models/index.js')
const User = Model.User
const Game = Model.Game
const UserGame = Model.UserGame

let bcrypt = require('bcryptjs')

class ControllerUser {

    static register(req, res) {
        let data = {
            username: req.body.username,
            email: req.body.email,
            password: Number(req.body.password),
            balance: 0
        }

        User.create(data)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (user) {
                    // console.log(user);
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        req.session.currentUser = {
                            id: user.dataValues.id,
                            name: user.dataValues.username,
                            email: user.dataValues.email,
                            balance: user.dataValues.balance
                        }
                        res.redirect('/users/' + req.session.currentUser.name)
                        // res.send(`Success Login`)
                    } else {
                        res.send(`Wrong Password`)
                    }
                } else {
                    res.send(`Wrong username`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userPage(req, res) {
        console.log(req.session.currentUser)
        User.findOne({
                where: {
                    id: req.session.currentUser.id
                },
                include: {
                    model: UserGame,
                    include: {
                        model: Game
                    }
                }
            })
            .then(user => {
                console.log(JSON.stringify(user, null, 2))
                if (user) {
                    res.render('user-page.ejs', {
                        games: user.dataValues.UserGames,
                        balance: user.balance,
                        user: req.session.currentUser || null
                    })
                } else {
                    res.redirect('/login')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static topUp(req, res) {
        User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                res.render('topup.ejs', {
                    user: user.dataValues
                })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static pay(req, res) {
        let currentBalance = 0;

        User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                // console.log(user.dataValues)
                currentBalance = user.dataValues.balance
                // console.log(req.body.money)
                // res.send(user.dataValues.balance)
                let money = currentBalance + Number(req.body.money)
                console.log(money)
                return money
            })

            .then(money => {
                let update = {
                    balance: money
                }
                User.update(update, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => {
                        res.redirect(`/`)
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })

            .catch(err => {
                res.send(err)
            })

    }
}

module.exports = ControllerUser;
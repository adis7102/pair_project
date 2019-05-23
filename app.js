const express = require('express')
const session = require('express-session')
const app = express()
const port = 3002

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

const routerHome = require('./routes/home-routes.js')
const routerUser = require('./routes/user-route.js')
const routerLogin = require('./routes/login-route.js')
const routerGame = require('./routes/game-route.js')
const routerTopUp = require('./routes/topup-router.js')

app.use((req, res, next) => {
    res.locals.user = req.session.currentUser || {
        name: ""
    }
    next()
})

app.use('/', routerHome)
app.use('/users', routerUser)
app.use('/register', routerUser)
app.use('/login', routerLogin)
app.use('/games', routerGame)
app.use('/logout', (req, res) => {
    req.session.currentUser = {}
    res.redirect('/')
})
app.use('/topup', routerTopUp)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/user-controller')
const ControllerGame = require('../controllers/game-controller')

router.get('/', ControllerGame.getAll)
router.get('/add', (req,res) => {
    res.render('addGame.ejs')
})
router.post('/add', ControllerGame.add)
router.get('/edit/:id', ControllerGame.displayEdit)
router.post('/edit/:id', ControllerGame.update)
router.get('/buy/:gamesId', ControllerGame.checkout)
router.post('/buy/:gamesId', ControllerGame.buy)
router.get('/delete/:gamesId', ControllerGame.delete)


module.exports = router;
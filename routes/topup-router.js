const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/user-controller')
const ControllerGame = require('../controllers/game-controller')
const ControllerUserGame = require('../controllers/usergame-controller')

router.get('/:id', ControllerUser.topUp)
router.post('/:id', ControllerUser.pay)

module.exports = router;
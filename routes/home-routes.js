const express = require('express')
const router = express.Router()

const ControllerGame = require('../controllers/game-controller.js')

router.get('/', ControllerGame.getFive)

router.post('/search', ControllerGame.search)

module.exports = router;
const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/user-controller')

router.get('/', (req, res) => {
    res.render('login.ejs', {
        user: req.session.currentUser || {
            name: ""
        }
    })
})

router.post('/', ControllerUser.login)


module.exports = router;
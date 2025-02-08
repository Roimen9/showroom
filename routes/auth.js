const express = require('express')
const router = express()
const APIhandler = require('../AUTH/auth')

router.post('/register', APIhandler.register)
router.post('/login', APIhandler.login)
router.get('/logout', APIhandler.logout)

module.exports = router
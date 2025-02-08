const express = require('express')
const router = express()
const APIhandler = require('../API/handler')


router.get('/vehicles', APIhandler.displayUserCars)
router.get('/vehicle/:id', APIhandler.displayUserCar)
router.post('/enquiry', APIhandler.enquiry)
router.get('/FAQs', (req, res) =>{res.render('user/FAQ')})

module.exports = router
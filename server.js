const express = require('express')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const authRouter = require('./routes/auth')
const APIhandler = require('./API/handler')
const dotenv = require('dotenv')
const app = express()
const port = 5000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended  : true}))
app.use(cookieParser())

app.get('/', APIhandler.newArrivals)
app.get('/login', (req, res) => {res.render('user/login')})
dotenv.config()

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/Images', express.static('Images'));

app.listen(port, (error) => {
    if (error) return console.log('There was a problem running the server', error)
        console.log(`The server is running on http://127.0.0.1:${port}`)
})
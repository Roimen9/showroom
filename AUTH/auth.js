const sqlite = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handler = {
    register : async (req, res) => {
        const body = req.body
        
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })
        const password = body.password
        const salt = await bcrypt.genSalt(12)
        const hashed = await bcrypt.hash(password, salt)

        const query = 'INSERT INTO users(name, email, password) VALUES (?, ?, ?)'
        db.run(query, [body.name, body.email, hashed], (error) => {
            if (error) return console.log('There was a problem inserting the data in the database', error)
                console.log('Data inserted successfully')
                const token = jwt.sign({name : body.name, email : body.email}, process.env.SECRET)
                res.cookie('jwt', token, {HttpOnly : true}).json('Registered successfully')
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the database connection', error)
                console.log('Database connection closed successfully')
        })
    },

    login : async (req, res) => {
        const body = req.body
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM users WHERE email = ?'
        db.get(query, [body.email], async (error, row) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('Data retrieved successfully')
                if (!row) return res.json('User does not exist.Invalid email or password')
                    const same = await bcrypt.compare(body.password, row.password)
                    if (!same) return res.json('Invalid username or password')
                        const token = jwt.sign({name : row.name, email : row.email}, process.env.SECRET)
                        res.cookie('token', token, {httpOnly : true}).json('Logged in successfully')
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the databse connection')
                console.log('Database connection closed successfully')
        })
    },

    verify : (req, res, next) => {
        const token = req.cookies.token
        if (!token) return res.render('user/access')
            jwt.verify(token, process.env.SECRET, (error, decoded) => {
              if (error) return res.render('user/access')
                req.user = decoded
                next()
            })
    },

    logout : (req, res) => {
        res.cookie('token', '', {maxAge : 1})
        res.redirect('/')
    }
}

module.exports = handler
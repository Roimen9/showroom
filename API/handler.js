const sqlite = require('sqlite3')
const handler = {
    newCar : async (req, res) => {
        const car = await req.body
        const images = req.images
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the databse successfully')
        })
        const query = 'INSERT INTO cars (make, model, price, mileage, condition, engine, transmission, category, YOM, description, exterior, interior, stock, image1, image2, image3, image4, image5) VALUES (?, ?, ? ,? , ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,?, ?, ?, ?)'

        db.run(query, [car.make, car.model, car.price, car.mileage, car.condition, car.engine, car.transmission, car.category, car.YOM, car.description, car.exterior, car.interior, car.stock, images[0], images[1], images[2], images[3], images[4]], (error) => {
            if (error) return console.log('There was a problem inserting the data in the database', error)
                console.log('The data was inserted successfully')
                res.json('Car details entered successfully')
        })

        db.close((error) => {
            if (error) return console.log('THere was a problem closing the databse connection', error)
                console.log('The connection was closed successfully')
        })
    },
    displayUserCars : (req, res) => {
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM cars ORDER BY Id DESC'
        db.all(query, (error, rows) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('Data retrieved successfully')
                const inStock = []
                rows.forEach(row => {
                    if (row.stock !== 'sold') {
                        inStock.push(row)
                    }
                })
                res.render('user/vehicles', {rows : inStock})
        })

        db.close((error) => {
            if (error) return console.log('There was problem closing the database connection', error)
                console.log('Database connection closed successfully')
        })

    },
    displayUserCar : (req, res) => {
        const id = req.params.id
        console.log(id)
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM cars WHERE id = ?'
        db.get(query, [id], (error, row) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('The data was retrieved successfully')
                res.render('user/vehicle', {row})
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the databse connection', error)
                console.log('Database connection was closed successfully')
        })
    },
    enquiry : (req, res) => {
        const body = req.body
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'INSERT INTO queries(name, email, phone, reason, message, date, car) VALUES (?, ?, ?, ?, ?, ?, ?)'
        db.run(query, [body.name, body.email, body.phone, body.reason, body.message, body.date, body.car], (error) => {
            if (error) return console.log('There was a problem inserting the data inthe database', error)
                console.log('Data inserted successfully')
                res.json('Enquiry submitted successfully')
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the database connection', error)
                console.log('Connection closed successfully')
        })
    },
    displayAdminCars : async (req, res) => {
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM cars ORDER BY Id DESC'
        db.all(query, (error, rows) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('Data retrieved successfully')
                res.render('admin/vehicles', {rows})
        })

        db.close((error) => {
            if (error) return console.log('There was problem closing the database connection', error)
                console.log('Database connection closed successfully')
        })
    },
    displayAdminCar : async (req, res) => {
        const id = await req.params.id
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM cars WHERE id = ?'
        db.get(query, [id], (error, row) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('The data was retrieved successfully')
                res.render('admin/vehicle', {row})
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the databse connection', error)
                console.log('Database connection was closed successfully')
        })
    },
    displayAdminCarForEdit : async (req, res) => {
        const id = req.params.id
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM cars WHERE id = ?'
        db.get(query, [id], (error, row) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('The data was retrieved successfully')
                res.render('admin/edit', {row})
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the database connection', error)
                console.log('The database connection was closed successfully')
        })
    },
    editCar : async (req, res) => {
        const car = await req.body
        const id = req.params.id
        const images = req.images
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the databse successfully')
        })

        const query = 'UPDATE cars SET make = ?, model = ?, price = ?, mileage = ?, condition = ?, engine = ?, transmission = ?, category = ?, YOM = ?, description = ?, exterior = ?, interior = ?, stock = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, WHERE id = ?'

        db.run(query, [car.make, car.model, car.price, car.mileage, car.condition, car.engine, car.transmission, car.category, car.YOM, car.description, car.exterior, car.interior, car.stock, images[0], images[1], images[2], images[3], images[4],  id], (error) => { 
            if (error) return console.log('There was a problem inserting the data in the database', error)
                console.log('The data was inserted successfully')
                res.json('Car details updated successfully')
        })

        db.close((error) => {
            if (error) return console.log('THere was a problem closing the databse connection', error)
                console.log('The connection was closed successfully')
        })
    },
    sold : (req, res) => {
        const id = req.params.id
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })
        const query = 'UPDATE cars set stock = ? WHERE id = ?'
        db.run(query, ['sold', id], (error) => {
            if (error) return console.log('There was a problem updating the data in the database', error)
                console.log('Data updated sucessfully')
                res.json("Car sold")
        })

        db.close((error) => {
            if (error) return console.log('Ther was a problem closing the database connection', error)
                console.log('Connection closed successfully')
        })
    },
    deleteCar : async (req, res) => {
        const id = req.params.id
        console.log(id)
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'DELETE FROM cars WHERE id = ?'
        db.run(query, [id], (error) => {
            if (error) return console('There was a problem deleting the data from the database', error)
                console.log('The data was deleted successfully')
                res.json('Car deleted successfully')
        })

        db.close((error) => {
            if(error) return console.log('There was a problem closing the database connection', error)
                console.log('The database connection was closed successfully')
        })
    },
    displayEnquieries : (req, res) => {
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log("There was a problem connecting to the database", error)
                console.log('Connected to the databse successfully')
        })
        
        const query = 'SELECT * FROM queries ORDER BY id DESC'
        db.all(query, (error, rows) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('Data retrieved successfully', rows)
                res.render('admin/queries', {rows})
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the database connection', error)
                console.log('Connection closed successfully')
        })
    },
    deleteQuery : (req, res) => {
        const id = req.params.id
        console.log(id)
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'DELETE FROM queries WHERE id = ?'
        db.run(query, [id], (error) => {
            if (error) return console.log('There was a problem deleting the query', error)
                console.log('Query deleted successsfully')
                res.json('Enquiry deleted successfully')
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the database connection', error)
                console.log('The connection was closed successfully')
        })
    },
    displayQuery : (req, res) => {
        const id = req.params.id
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the database successfully')
        })

        const query = 'SELECT * FROM queries WHERE id = ?'
        db.get(query, [id], (error, row) => {
            if (error) return console.log('There was a problem retrieving the data', error)
                console.log('Data retrieved successfully')
                res.render('admin/query', {row})
        })

        db.close((error) => {
            if (error) return console.log('There was problem closing the databse connection', error)
                console.log('Database connection closed successfully')
        })
    },
    dashboard : (req, res) => {
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected tot he database successfully')
        })

        const query = 'SELECT * FROM cars'
        db.all(query, (error, rows) => {
            if (error) return console.log('There was a problem retrieving the data from the database', error)
                console.log('Data retrieved successfully')

                const sold = []
                const inStock = []
                let sales = 0
                rows.forEach(row => {
                    if (row.stock !== 'sold') {
                        inStock.push(row)
                    } else {
                        sold.push(row)
                    }
                })
                sold.forEach(car => {
                    const price = car.price.split(",").join("")
                    const number = parseInt(price)
                    sales += number
                })
                const formattedNumber = sales.toLocaleString()
                res.render('admin/dashboard', {sold : sold, inStock : inStock, sales : formattedNumber})
                console.log(sold.length, inStock.length, sales)
        })
    },
    newArrivals : (req, res) => {
        const db = new sqlite.Database('test.db', sqlite.OPEN_READWRITE, (error) => {
            if (error) return console.log('There was a problem connecting to the database', error)
                console.log('Connected to the databse successfully')
        })

        const query = 'SELECT * FROM cars ORDER BY Id DESC'
        db.all(query, (error, rows) => {
            if (error) return console.log('Failed to retrieve the data from the database', error)
                console.log('Data retrieved successfully')
                const latest = rows.slice(0,8)
                const inStock = []
                latest.forEach(car => {
                    if (car.stock !== 'sold') {
                        inStock.push(car)
                    }
                })
                res.render('user/home', {rows : inStock})
                // console.log(latest)
        })

        db.close((error) => {
            if (error) return console.log('There was a problem closing the databse connection')
                console.log('Connection closed successfully')
        })
    }
}

module.exports = handler
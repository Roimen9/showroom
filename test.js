const sqlite = require('sqlite3')
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE, (error) => {
    if (error) return console.log('There was a problem connecting to the database')
        console.log('Connected to the database successfully')
})

// const query = 'CREATE TABLE users(ID, name, username, email)'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem creating the table', error)
//         console.log('The table was created successfully')
// })

// const query = 'INSERT INTO users (name, username, email) VALUES (?, ?, ?)'
// db.run(query, ['Ryan', 'nyar', 'roimenrayn@gamil.com'], (error) => {
//     if (error) return console.log('There was a problem inserting the data into the database', error)
//         console.log('Data inserted successfully')
// })

// const query = 'SELECT * FROM users'
// db.all(query, (error, rows) => {
//     if (error) return console.log('There was a problem retrieving the data', error)
//         console.log('Data retrieved successfuly')
//         rows.forEach(row => {
//             console.log(row)
//         })
// })

// const query = 'DELETE FROM users'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem deleting the data', error)
//         console.log('Data deleted successfully')
// })

// const query = 'CREATE TABLE IF NOT EXISTS images (Id INTEGER PRIMARY KEY, name, image BLOB)'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem entering the data into the database', error)
//         console.log('The data was inserted successfully')
// })

// const query = 'SELECT * FROM images'
// db.all(query, (error, rows) => {
//     if (error) return console.log('There was a problem retrieving the data', error)
//         console.log('Data retrieved successfully', rows)
// })

// const query = 'DELETE FROM images'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem deleting the data from the database', error)
//         console.log('The data was deleted successfully')
// })

// const query = 'CREATE TABLE cars (Id INTEGER PRIMARY KEY, make, model, price, mileage, stock, condition, description, engine, exterior, interior, transmission, YOM, category, image1, image2, image3, image4, image5)'
// db.run(query, (error) => {
//     if (error) return console.log('There wsa a problem', error)
//         console.log('Created')
// })

// const query = 'DROP TABLE cars'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem deletuing the table', error)
//         console.log('Table deleted successfully')
// })

// const query = 'SELECT * FROM cars'
// db.all(query, (error, rows) => {
//     if (error) return console.log('There was a problem selecting the data from the database', error)
//         console.log('Data selected successfully', rows)
// })

// const query = 'DELETE FROM cars'
// db.run(query, (error) => {
//     if(error) return console.log('There was a problem deleting the dat from the databse', error)
//         console.log('Data deleted successsfully')
// })

// const query = 'CREATE TABLE queries(id INTEGER PRIMARY KEY, name, email, phone, reason, message, date, car)'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem creating the table', error)
//         console.log('Table created successfully')
// })

// const query = 'SELECT * FROM queries'
// db.all(query, (error, rows) => {
//     if (error) return console.log('There was a problem retrieving the data', error)
//         console.log('Data retrieved successfully', rows)
// })

// const query = 'DELETE FROM queries'
// db.run(query, (error) => {
//     if (error) return console.log('Failed to delete the data', error)
//         console.log('data deleted successfully')
// })

// const query = 'DROP TABLE queries'
// db.run(query, (error) => {
//     if (error) return console.log('There was a problem deleting the table', error)
//         console.log('Table deleted successfully')
// })

// JavaScript for filtering the table
// function filterTable() {
//     const input = document.getElementById('searchInput').value.toLowerCase();
//     const rows = document.querySelectorAll('#enquiriesTable tr');
//     rows.forEach(row => {
//         const cells = Array.from(row.getElementsByTagName('td'));
//         const match = cells.some(cell => cell.textContent.toLowerCase().includes(input));
//         row.style.display = match ? '' : 'none';
//     });
// }

// const query = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name, email, password)'
// db.run(query, (error) => {
//     if (error) return console.log('There was a  problem creating the Table', error)
//         console.log('Table created successfully')
// })


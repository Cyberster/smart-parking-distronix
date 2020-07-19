const dotenv = require('dotenv');
const express = require('express')
const mysql = require('mysql')

// Initialize environment variables
dotenv.config({ path: './config.env' });

// Import routes
const routes = require('./routes/testRoutes')
const sensorRouter = require('./routes/sensorRoutes')
const statusRouter = require('./routes/statusRoutes')
const lotRouter = require('./routes/lotRoutes')
const bayRouter = require('./routes/bayRoutes')

const app = express()

app.listen(process.env.PORT, () => {
	console.log('Server is running on port: ' + process.env.PORT)
})

//app.use(express.static('public')) // server static files
app.use(express.urlencoded({ extended: true })) // for accepting form data


app.use('/sensor', sensorRouter)
app.use('/data', statusRouter)
app.use('/lot', lotRouter)
app.use('/bay', bayRouter)

//app.use('/test', routes)


// Handling 404 page
app.use((req, res) => {
    //res.status(404).sendFile('./404.html', { root: __dirname })
    res.status(404).render('404')
})



// // Create database connection
// const connection = mysql.createConnection({
// 	host: process.env.MYSQL_HOST,
// 	user: process.env.MYSQL_USER,
// 	password: process.env.MYSQL_PASS,
// 	database: process.env.MYSQL_DB,
// 	port: process.env.MYSQL_PORT
// })

// connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
// 	if (err) {
// 		console.log(err)
// 		throw err
// 	}

// 	console.log('The solution is: ', rows[0].solution)

// 	//console.log(process.env)
// })

// connection.end()


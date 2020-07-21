// Import required libraries
const dotenv = require('dotenv');
const express = require('express')
const mysql = require('mysql')

// Initialize environment variables
dotenv.config({ path: './config.env' });

// Import routes
const sensorRouter 	= require('./routes/sensorRoutes')
const statusRouter 	= require('./routes/statusRoutes')
const lotRouter 	= require('./routes/lotRoutes')
const bayRouter 	= require('./routes/bayRoutes')

// Initialize app variable
const app = express()

// Configuring the listening port
app.listen(process.env.PORT, () => {
	console.log('Server is running on port: ' + process.env.PORT)
})


// Processing middlewares
app.use(express.urlencoded({ extended: true })) // Required for accepting form data

app.use('/sensor', sensorRouter)
app.use('/data', statusRouter)
app.use('/lot', lotRouter)
app.use('/bay', bayRouter)


// Handling 404 page
app.use((req, res) => {
	let message = {
		statu: 'error',
		message: '404 - Not found'
	}
    res.status(404).json(message)
})

// Import required libraries
const express = require('express')
const db = require('../db')

// Get route instance
const sensorRouter = express.Router()


// Add new sensor
sensorRouter.post('/add', async (req, res, next) => {
    console.log(req.body)

    let uuid = req.param('uuid');
    let is_occupied = req.param('is_occupied');

    try {
        let result = await db.addSensor(uuid, is_occupied)
		res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// Update existing sensor
sensorRouter.put('/update', async (req, res, next) => {
    console.log(req.body)

    let id = req.param('id');
    let is_occupied = req.param('is_occupied');

    try {
        let result = await db.updateSensor(id, is_occupied)
		res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// Get existing sensor value by ID
sensorRouter.get('/get/:id', async (req, res, next) => {
    console.log(req.body)

    let id = req.params.id

    try {
        let result = await db.getSensor(id)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


// Export the route
module.exports = sensorRouter
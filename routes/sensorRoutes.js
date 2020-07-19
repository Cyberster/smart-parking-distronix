const express = require('express')
const db = require('../db')

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

    let uuid = req.param('uuid');
    let is_occupied = req.param('is_occupied');

    try {
        let result = await db.updateSensor(uuid, is_occupied)
		res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// Get existing sensor value
sensorRouter.get('/get/:uuid', async (req, res, next) => {
    console.log(req.body)

    let uuid = req.params.uuid

    try {
        let result = await db.getSensor(uuid)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


module.exports = sensorRouter
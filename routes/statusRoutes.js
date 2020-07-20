// Import required libraries
const express = require('express')
const db = require('../db')

// Get route instance
const statusRouter = express.Router()


// Insert a new data point corresponding to a sensor
statusRouter.post('/', async (req, res, next) => {
    console.log(req.body)

    let sensor_id = req.param('sensor_id');
    let timestamp = req.param('timestamp');
    let is_occupied = req.param('is_occupied');

    try {
        let result = await db.addStatus(sensor_id, timestamp, is_occupied)
		res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// // Update existing status
// statusRouter.put('/update', async (req, res, next) => {
//     console.log(req.body)

//     let uuid = req.param('uuid');
//     let is_occupied = req.param('is_occupied');

//     try {
//         let result = await db.updateSensor(uuid, is_occupied)
// 		res.json(result)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })

// Get existing status
// statusRouter.get('/get/:uuid', async (req, res, next) => {
//     console.log(req.body)

//     let uuid = req.params.uuid

//     try {
//         let result = await db.getSensor(uuid)
//         res.json(result)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })


// Export the route
module.exports = statusRouter
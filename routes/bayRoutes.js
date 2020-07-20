// Import required libraries
const express = require('express')
const db = require('../db')

// Get route instance
const bayRouter = express.Router()


// Add new bay
bayRouter.post('/add', async (req, res, next) => {
    console.log(req.body)

    let name = req.param('name');
    let x_coordinate = req.param('x_coordinate');
    let y_coordinate = req.param('y_coordinate');
    let lot_id = req.param('lot_id');
    let sensor_id = req.param('sensor_id');

    try {
        let result = await db.addBay(name, x_coordinate, y_coordinate, lot_id, sensor_id)
		res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// // Update existing bay
// bayRouter.put('/update', async (req, res, next) => {
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

// // Get all existing bays ( GET /bay)
// bayRouter.get('/', async (req, res, next) => {
//     console.log(req.body)

//     try {
//         let result = await db.getBays()
//         res.json(result)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })

// Get existing bay name ( GET /lot/:lot_name )
bayRouter.get('/:name', async (req, res, next) => {
    console.log(req.body)

    let name = req.params.name

    try {
        let result = await db.getBay(name)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// Fetch bay details by global name: GET /bay/:lot_name/:bay_name
bayRouter.get('/:lot_name/:bay_name', async (req, res, next) => {
    console.log(req.body)

    let lot_name = req.params.lot_name
    let bay_name = req.params.bay_name

    try {
        let result = await db.getBayByGlobalName(lot_name, bay_name)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


// Export the route
module.exports = bayRouter
const express = require('express')
const db = require('../db')

const lotRouter = express.Router()


// Add new lot
lotRouter.post('/add', async (req, res, next) => {
    console.log(req.body)

    let name = req.param('name');
    let latitude = req.param('latitude');
    let longitude = req.param('longitude');
    let gateway_id = req.param('gateway_id');

    try {
        let result = await db.addLot(name, latitude, longitude, gateway_id)
		res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// // Update existing lot
// lotRouter.put('/update', async (req, res, next) => {
//     console.log(req.body)

//     let uuid = req.param('uuid');
//     let is_occupied = req.param('is_occupied');

//     try {
//         let result = await db.updateLot(uuid, is_occupied)
// 		res.json(result)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })

// Fetch list of all parking lots: GET /lot
lotRouter.get('/', async (req, res, next) => {
    console.log(req.body)

    try {
        let result = await db.getLots()
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// Fetch lot details along with list of all bays within that lot:  GET /lot/:lot_name
lotRouter.get('/:name', async (req, res, next) => {
    console.log(req.body)

    let name = req.params.name

    try {
        let result = await db.getLot(name)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


module.exports = lotRouter
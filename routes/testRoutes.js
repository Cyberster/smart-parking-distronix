const express = require('express')
const db = require('../db')

const router = express.Router()

// handling get requests
// router.get('/', (req, res) => {
//     console.log('get request made')
//     res.send('hello from server!!')    
// }) 

// https://www.youtube.com/watch?v=LVfH5FDOa3o
router.get('/', async (req, res, next) => {
    try {
        let results = await db.all()
        res.json(results)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}) 
router.get('/:id', async (req, res, next) => {
    const id = req.params.id  

    try {
        let results = await db.one(id)
        res.json(results)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}) 

// // handling post requests
// // Add sensor
// router.post('/', async (req, res, next) => {
//     console.log(req.body)

//     let uuid = req.param('uuid');
//     let is_occupied = req.param('is_occupied');

//     try {
//         let results = await db.addSensor(uuid, is_occupied)
//         res.json(results)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })

// // Update sensor
// router.put('/', async (req, res, next) => {
//     console.log(req.body)

//     let uuid = req.param('uuid');
//     let is_occupied = req.param('is_occupied');

//     try {
//         let results = await db.updateSensor(uuid, is_occupied)
//         res.json(results)
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })


// get parameter from GET requests
router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.send('get: ' + id)
}) 

// handling post requests
router.post('/', (req, res) => {
    console.log(req.body)
    res.send('OK')
})

// handling delete requests
router.delete('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.send('delete: ' + id)
})


module.exports = router

const router = require('express').Router()
const fs = require('fs')

//reading json file
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (error, data) => {
    if (error) {
        res.status(500).json('Internal server error')
    }
    res.json(JSON.parse(data))
  })
})

module.exports = router